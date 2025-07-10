/**
 * Intelligent Search Service for UK Building Merchant SaaS
 * Provides optimized search functionality with intelligent matching
 */

import { supabase } from '@/lib/supabase';
import { 
  MerchantSearchResult, 
  SupplierSearchResult, 
  SearchOptions, 
  SearchResponse 
} from '@/types/intelligent-search';

export class IntelligentSearchService {
  private static readonly DEFAULT_LIMIT = 10;
  private static readonly CACHE_DURATION = 300000; // 5 minutes
  private static searchCache = new Map<string, { data: any; timestamp: number }>();

  /**
   * Main search method that routes to appropriate search function
   */
  static async search(options: SearchOptions): Promise<SearchResponse<MerchantSearchResult | SupplierSearchResult>> {
    const startTime = Date.now();
    
    try {
      // Check cache first
      const cacheKey = this.getCacheKey(options);
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          ...cached,
          searchTime: Date.now() - startTime
        };
      }

      let results: (MerchantSearchResult | SupplierSearchResult)[];
      
      if (options.type === 'merchant') {
        results = await this.searchMerchants(options);
      } else {
        results = await this.searchSuppliers(options);
      }

      // Apply intelligent ranking
      const rankedResults = this.applyIntelligentRanking(results, options.query);
      
      const response: SearchResponse<MerchantSearchResult | SupplierSearchResult> = {
        results: rankedResults,
        totalCount: rankedResults.length,
        hasMore: rankedResults.length === (options.limit || this.DEFAULT_LIMIT),
        searchTime: Date.now() - startTime
      };

      // Cache the results
      this.setCache(cacheKey, response);
      
      return response;
    } catch (error) {
      console.error('Search failed:', error);
      throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search merchants with intelligent matching
   */
  private static async searchMerchants(options: SearchOptions): Promise<MerchantSearchResult[]> {
    const { query, organizationFilter, limit = this.DEFAULT_LIMIT } = options;
    
    let queryBuilder = supabase
      .from('merchants')
      .select(`
        id,
        merchant_name,
        merchant_email,
        merchant_phone,
        merchant_category,
        merchant_website_url,
        verification_status,
        is_active,
        created_at,
        updated_at,
        merchant_locations (
          id,
          name,
          city,
          county,
          postal_code,
          latitude,
          longitude
        ),
        merchant_organization_affiliations (
          id,
          affiliation_status,
          membership_level,
          organization:organizations (
            id,
            name,
            type,
            logo_url
          )
        )
      `)
      .eq('is_active', true);

    // Apply search filters
    if (query.trim()) {
      queryBuilder = queryBuilder.or(
        `merchant_name.ilike.%${query}%,merchant_category.ilike.%${query}%`
      );
    }

    // Apply organization filter
    if (organizationFilter && organizationFilter.length > 0) {
      queryBuilder = queryBuilder.in('merchant_organization_affiliations.organization.id', organizationFilter);
    }

    queryBuilder = queryBuilder.limit(limit);

    const { data, error } = await queryBuilder;

    if (error) {
      console.error('Merchant search error:', error);
      throw new Error(`Merchant search failed: ${error.message}`);
    }

    return (data || []).map(merchant => ({
      id: merchant.id,
      name: merchant.merchant_name,
      merchant_name: merchant.merchant_name,
      merchant_email: merchant.merchant_email,
      merchant_phone: merchant.merchant_phone,
      description: merchant.merchant_category,
      merchant_category: merchant.merchant_category,
      merchant_website_url: merchant.merchant_website_url,
      verification_status: merchant.verification_status,
      isActive: merchant.is_active,
      createdAt: merchant.created_at,
      updatedAt: merchant.updated_at,
      locations: merchant.merchant_locations || [],
      organizationAffiliations: (merchant.merchant_organization_affiliations || []).map((affiliation: any) => ({
        id: affiliation.id,
        organizationId: affiliation.organization.id,
        affiliationStatus: affiliation.affiliation_status,
        membershipLevel: affiliation.membership_level,
        organization: affiliation.organization
      }))
    }));
  }

  /**
   * Search suppliers with intelligent matching
   */
  private static async searchSuppliers(options: SearchOptions): Promise<SupplierSearchResult[]> {
    const { query, organizationFilter, limit = this.DEFAULT_LIMIT } = options;
    
    let queryBuilder = supabase
      .from('suppliers')
      .select(`
        id,
        supplier_name,
        supplier_description,
        slug,
        supplier_website,
        country,
        supplier_email,
        supplier_phone,
        contact_person,
        is_active,
        created_at,
        updated_at
      `)
      .eq('is_active', true);

    // Apply search filters
    if (query.trim()) {
      queryBuilder = queryBuilder.or(
        `supplier_name.ilike.%${query}%,supplier_description.ilike.%${query}%,contact_person.ilike.%${query}%`
      );
    }

    queryBuilder = queryBuilder.limit(limit);

    const { data, error } = await queryBuilder;

    if (error) {
      console.error('Supplier search error:', error);
      throw new Error(`Supplier search failed: ${error.message}`);
    }

    return (data || []).map(supplier => ({
      id: supplier.id,
      name: supplier.supplier_name,
      supplier_name: supplier.supplier_name,
      description: supplier.supplier_description,
      slug: supplier.slug,
      website: supplier.supplier_website,
      country: supplier.country,
      isActive: supplier.is_active,
      createdAt: supplier.created_at,
      updatedAt: supplier.updated_at,
      organizationAffiliations: []
    }));
  }

  /**
   * Apply intelligent ranking to search results
   * Prioritizes results that start with the search term
   */
  private static applyIntelligentRanking(
    results: (MerchantSearchResult | SupplierSearchResult)[],
    query: string
  ): (MerchantSearchResult | SupplierSearchResult)[] {
    const lowerQuery = query.toLowerCase().trim();
    
    if (!lowerQuery) return results;

    return results.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      // Priority 1: Exact match
      if (aName === lowerQuery && bName !== lowerQuery) return -1;
      if (bName === lowerQuery && aName !== lowerQuery) return 1;
      
      // Priority 2: Starts with query
      const aStartsWith = aName.startsWith(lowerQuery);
      const bStartsWith = bName.startsWith(lowerQuery);
      
      if (aStartsWith && !bStartsWith) return -1;
      if (bStartsWith && !aStartsWith) return 1;
      
      // Priority 3: Word boundary match
      const aWordBoundary = aName.includes(` ${lowerQuery}`);
      const bWordBoundary = bName.includes(` ${lowerQuery}`);
      
      if (aWordBoundary && !bWordBoundary) return -1;
      if (bWordBoundary && !aWordBoundary) return 1;
      
      // Priority 4: Length (shorter names first for same relevance)
      if (aName.length !== bName.length) {
        return aName.length - bName.length;
      }
      
      // Priority 5: Alphabetical
      return aName.localeCompare(bName);
    });
  }

  /**
   * Highlight matching text in search results
   */
  static highlightText(text: string, query: string): { segments: { text: string; isHighlighted: boolean }[]; originalText: string } {
    if (!query.trim()) {
      return {
        segments: [{ text, isHighlighted: false }],
        originalText: text
      };
    }

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    const segments = parts.map(part => ({
      text: part,
      isHighlighted: regex.test(part)
    }));

    return {
      segments,
      originalText: text
    };
  }

  /**
   * Cache management
   */
  private static getCacheKey(options: SearchOptions): string {
    return `${options.type}-${options.query}-${JSON.stringify(options.organizationFilter || [])}-${options.limit || this.DEFAULT_LIMIT}`;
  }

  private static getFromCache(key: string): SearchResponse<any> | null {
    const cached = this.searchCache.get(key);
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.searchCache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  private static setCache(key: string, data: SearchResponse<any>): void {
    this.searchCache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    // Clean up old cache entries
    if (this.searchCache.size > 100) {
      const oldestKey = this.searchCache.keys().next().value;
      this.searchCache.delete(oldestKey);
    }
  }

  /**
   * Clear all cached results
   */
  static clearCache(): void {
    this.searchCache.clear();
  }
}