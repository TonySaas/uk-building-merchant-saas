/**
 * Intelligent Search Component for UK Building Merchant SaaS
 * Provides autocomplete/typeahead functionality with intelligent matching
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Building2, Store, MapPin, Globe, Check, X, ChevronDown, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { IntelligentSearchService } from '@/services/intelligent-search-service';
import { 
  IntelligentSearchProps, 
  MerchantSearchResult, 
  SupplierSearchResult, 
  SearchState 
} from '@/types/intelligent-search';

export default function IntelligentSearch({
  searchType,
  placeholder = `Search for ${searchType}...`,
  onSelect,
  selectedValue,
  organizationFilter,
  className,
  disabled = false,
  minSearchLength = 2,
  maxResults = 10,
  debounceMs = 300,
  showOrganizations = true,
  showLocations = true
}: IntelligentSearchProps) {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    loading: false,
    error: null,
    isOpen: false,
    selectedIndex: -1,
    hasSearched: false
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (state.query.length >= minSearchLength) {
      debounceRef.current = setTimeout(() => {
        performSearch(state.query);
      }, debounceMs);
    } else {
      setState(prev => ({ 
        ...prev, 
        results: [], 
        isOpen: false, 
        hasSearched: false,
        error: null
      }));
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [state.query, minSearchLength, debounceMs]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setState(prev => ({ ...prev, isOpen: false, selectedIndex: -1 }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const performSearch = useCallback(async (query: string) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await IntelligentSearchService.search({
        query,
        type: searchType,
        organizationFilter,
        limit: maxResults
      });

      setState(prev => ({
        ...prev,
        results: response.results,
        loading: false,
        isOpen: true,
        hasSearched: true,
        selectedIndex: -1
      }));
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setState(prev => ({
          ...prev,
          error: error.message,
          loading: false,
          isOpen: true,
          hasSearched: true
        }));
      }
    }
  }, [searchType, organizationFilter, maxResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState(prev => ({ ...prev, query: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!state.isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setState(prev => ({
          ...prev,
          selectedIndex: prev.selectedIndex < prev.results.length - 1 
            ? prev.selectedIndex + 1 
            : 0
        }));
        break;

      case 'ArrowUp':
        e.preventDefault();
        setState(prev => ({
          ...prev,
          selectedIndex: prev.selectedIndex > 0 
            ? prev.selectedIndex - 1 
            : prev.results.length - 1
        }));
        break;

      case 'Enter':
        e.preventDefault();
        if (state.selectedIndex >= 0 && state.results[state.selectedIndex]) {
          handleSelect(state.results[state.selectedIndex]);
        }
        break;

      case 'Escape':
        setState(prev => ({ ...prev, isOpen: false, selectedIndex: -1 }));
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (item: MerchantSearchResult | SupplierSearchResult) => {
    setState(prev => ({ 
      ...prev, 
      query: item.name, 
      isOpen: false, 
      selectedIndex: -1 
    }));
    onSelect(item);
  };

  const handleClear = () => {
    setState(prev => ({ 
      ...prev, 
      query: '', 
      results: [], 
      isOpen: false, 
      selectedIndex: -1,
      hasSearched: false,
      error: null
    }));
    onSelect(null);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    if (state.results.length > 0) {
      setState(prev => ({ ...prev, isOpen: true }));
    }
  };

  const renderHighlightedText = (text: string, query: string) => {
    const highlighted = IntelligentSearchService.highlightText(text, query);
    return (
      <span>
        {highlighted.segments.map((segment, index) => (
          <span
            key={index}
            className={segment.isHighlighted ? 'bg-yellow-200 font-semibold' : ''}
          >
            {segment.text}
          </span>
        ))}
      </span>
    );
  };

  const renderResult = (result: MerchantSearchResult | SupplierSearchResult, index: number) => {
    const isSelected = index === state.selectedIndex;
    const Icon = searchType === 'merchant' ? Store : Building2;
    const isMerchant = 'merchant_name' in result;

    return (
      <div
        key={result.id}
        className={cn(
          'p-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0',
          isSelected ? 'bg-primary/5 border-primary/20' : 'hover:bg-gray-50'
        )}
        onClick={() => handleSelect(result)}
        role="option"
        aria-selected={isSelected}
      >
        <div className="flex items-start gap-3">
          <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-sm truncate">
                {renderHighlightedText(result.name, state.query)}
              </h3>
              {selectedValue?.id === result.id && (
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
              )}
            </div>

            {result.description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {renderHighlightedText(result.description, state.query)}
              </p>
            )}

            {/* Show locations for merchants */}
            {showLocations && isMerchant && (result as MerchantSearchResult).locations && (result as MerchantSearchResult).locations!.length > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {(result as MerchantSearchResult).locations![0].city}
                  {(result as MerchantSearchResult).locations![0].county && `, ${(result as MerchantSearchResult).locations![0].county}`}
                </span>
              </div>
            )}

            {/* Show website for suppliers */}
            {!isMerchant && (result as SupplierSearchResult).website && (
              <div className="flex items-center gap-1 mt-1">
                <Globe className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground truncate">
                  {(result as SupplierSearchResult).website}
                </span>
              </div>
            )}

            {/* Show organization affiliations */}
            {showOrganizations && result.organizationAffiliations && result.organizationAffiliations.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {result.organizationAffiliations.slice(0, 3).map((affiliation) => (
                  <Badge 
                    key={affiliation.id} 
                    variant="secondary" 
                    className="text-xs px-1.5 py-0.5"
                  >
                    {affiliation.organization.name}
                  </Badge>
                ))}
                {result.organizationAffiliations.length > 3 && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    +{result.organizationAffiliations.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const displayValue = selectedValue ? selectedValue.name : state.query;

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          disabled={disabled}
          className="pl-10 pr-20"
          role="combobox"
          aria-expanded={state.isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-describedby={state.error ? 'search-error' : undefined}
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {state.loading && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
          {(state.query || selectedValue) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          <ChevronDown className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            state.isOpen && 'rotate-180'
          )} />
        </div>
      </div>

      {/* Dropdown */}
      {state.isOpen && (
        <Card
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 shadow-lg border-0 shadow-md"
        >
          <CardContent className="p-0">
            <div
              ref={resultsRef}
              className="max-h-80 overflow-y-auto"
              role="listbox"
            >
              {state.loading && (
                <div className="p-4 text-center">
                  <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Searching {searchType}s...
                  </p>
                </div>
              )}

              {state.error && (
                <div className="p-4 text-center" id="search-error">
                  <p className="text-sm text-destructive">{state.error}</p>
                </div>
              )}

              {!state.loading && !state.error && state.results.length === 0 && state.hasSearched && (
                <div className="p-4 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No {searchType}s found matching "{state.query}"
                  </p>
                </div>
              )}

              {state.results.length > 0 && (
                <>
                  {state.results.map((result, index) => renderResult(result, index))}
                  {state.results.length === maxResults && (
                    <div className="p-2 text-center border-t">
                      <p className="text-xs text-muted-foreground">
                        Showing top {maxResults} results
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}