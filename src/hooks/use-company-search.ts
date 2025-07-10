import { useState, useEffect, useCallback, useRef } from 'react';
import { CompanySearchService } from '@/services/company-search-service';
import {
  CompanySearchState,
  CompanySearchResult,
  CompanySearchFilters,
  CompanySearchHookProps,
  AutocompleteResult,
  SearchAnalytics
} from '@/types/company-search';

const DEBOUNCE_DELAY = 300;
const RECENT_SEARCHES_KEY = 'company-search-recent';
const MAX_RECENT_SEARCHES = 5;

export function useCompanySearch({
  userType,
  initialFilters = {},
  onCompanySelect,
  onError
}: CompanySearchHookProps) {
  const [state, setState] = useState<CompanySearchState>({
    searchTerm: '',
    filters: initialFilters,
    results: [],
    loading: false,
    error: null,
    selectedCompany: null,
    hasSearched: false,
    totalResults: 0,
    recentSearches: [],
    suggestions: []
  });

  const debounceRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  // Load recent searches on mount
  useEffect(() => {
    const recent = getRecentSearches();
    setState(prev => ({ ...prev, recentSearches: recent }));
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (state.searchTerm.trim()) {
        performSearch(state.searchTerm, state.filters);
      } else {
        setState(prev => ({
          ...prev,
          results: [],
          hasSearched: false,
          totalResults: 0,
          error: null
        }));
      }
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [state.searchTerm, state.filters]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const performSearch = useCallback(async (query: string, filters: CompanySearchFilters) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await CompanySearchService.searchCompanies({
        query,
        type: userType,
        filters,
        page: 1,
        limit: 10
      });

      setState(prev => ({
        ...prev,
        results: response.results,
        totalResults: response.total,
        hasSearched: true,
        loading: false
      }));

      // Save to recent searches
      saveToRecentSearches(query);

      // Log analytics
      await CompanySearchService.logSearchAnalytics({
        searchTerm: query,
        userType,
        resultsCount: response.results.length,
        timestamp: new Date(),
        filters
      });

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return; // Request was aborted, don't update state
      }

      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        results: [],
        hasSearched: true,
        totalResults: 0
      }));

      onError?.(errorMessage);
    }
  }, [userType, onError]);

  const setSearchTerm = useCallback((term: string) => {
    setState(prev => ({ ...prev, searchTerm: term }));
  }, []);

  const setFilters = useCallback((filters: CompanySearchFilters) => {
    setState(prev => ({ ...prev, filters }));
  }, []);

  const selectCompany = useCallback((company: CompanySearchResult) => {
    setState(prev => ({ ...prev, selectedCompany: company }));
    onCompanySelect?.(company);

    // Log selection analytics
    CompanySearchService.logSearchAnalytics({
      searchTerm: state.searchTerm,
      userType,
      resultsCount: state.results.length,
      selectedResult: company.id,
      timestamp: new Date(),
      filters: state.filters
    });
  }, [state.searchTerm, state.results.length, state.filters, userType, onCompanySelect]);

  const clearSelection = useCallback(() => {
    setState(prev => ({ ...prev, selectedCompany: null }));
  }, []);

  const retry = useCallback(() => {
    if (state.searchTerm.trim()) {
      performSearch(state.searchTerm, state.filters);
    }
  }, [state.searchTerm, state.filters, performSearch]);

  const reset = useCallback(() => {
    setState(prev => ({
      ...prev,
      searchTerm: '',
      results: [],
      selectedCompany: null,
      hasSearched: false,
      totalResults: 0,
      error: null,
      loading: false
    }));
  }, []);

  const getAutocompleteSuggestions = useCallback(async (query: string): Promise<AutocompleteResult[]> => {
    if (!query.trim()) {
      return [];
    }

    try {
      const suggestions = await CompanySearchService.getAutocompleteSuggestions({
        query,
        type: userType,
        limit: 5
      });

      setState(prev => ({ ...prev, suggestions: suggestions.map(s => s.text) }));
      return suggestions;
    } catch (error) {
      console.error('Autocomplete error:', error);
      return [];
    }
  }, [userType]);

  const searchByLocation = useCallback(async (
    latitude: number,
    longitude: number,
    radius: number = 50
  ) => {
    if (userType !== 'merchant') {
      throw new Error('Location search is only available for merchants');
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const results = await CompanySearchService.searchMerchantsByLocation({
        latitude,
        longitude,
        radius,
        limit: 10
      });

      setState(prev => ({
        ...prev,
        results,
        totalResults: results.length,
        hasSearched: true,
        loading: false
      }));

      // Log location search analytics
      await CompanySearchService.logSearchAnalytics({
        searchTerm: `location:${latitude},${longitude}`,
        userType,
        resultsCount: results.length,
        timestamp: new Date(),
        filters: { location: { latitude, longitude, radius } }
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Location search failed';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        results: [],
        hasSearched: true,
        totalResults: 0
      }));

      onError?.(errorMessage);
    }
  }, [userType, onError]);

  const loadMore = useCallback(async () => {
    if (state.loading || !state.hasSearched) {
      return;
    }

    setState(prev => ({ ...prev, loading: true }));

    try {
      const currentPage = Math.floor(state.results.length / 10) + 1;
      const response = await CompanySearchService.searchCompanies({
        query: state.searchTerm,
        type: userType,
        filters: state.filters,
        page: currentPage,
        limit: 10
      });

      setState(prev => ({
        ...prev,
        results: [...prev.results, ...response.results],
        loading: false
      }));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Load more failed';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
    }
  }, [state.loading, state.hasSearched, state.results.length, state.searchTerm, state.filters, userType]);

  // Helper functions for recent searches
  const getRecentSearches = (): string[] => {
    try {
      const recent = localStorage.getItem(RECENT_SEARCHES_KEY);
      return recent ? JSON.parse(recent) : [];
    } catch {
      return [];
    }
  };

  const saveToRecentSearches = (query: string) => {
    try {
      const recent = getRecentSearches();
      const updated = [query, ...recent.filter(q => q !== query)].slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      setState(prev => ({ ...prev, recentSearches: updated }));
    } catch {
      // Ignore localStorage errors
    }
  };

  const clearRecentSearches = useCallback(() => {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      setState(prev => ({ ...prev, recentSearches: [] }));
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  return {
    // State
    searchTerm: state.searchTerm,
    filters: state.filters,
    results: state.results,
    loading: state.loading,
    error: state.error,
    selectedCompany: state.selectedCompany,
    hasSearched: state.hasSearched,
    totalResults: state.totalResults,
    recentSearches: state.recentSearches,
    suggestions: state.suggestions,

    // Actions
    setSearchTerm,
    setFilters,
    selectCompany,
    clearSelection,
    retry,
    reset,
    getAutocompleteSuggestions,
    searchByLocation,
    loadMore,
    clearRecentSearches,

    // Computed values
    hasResults: state.results.length > 0,
    hasMore: state.results.length < state.totalResults,
    isEmpty: state.hasSearched && state.results.length === 0,
    isInitial: !state.hasSearched && !state.loading
  };
}