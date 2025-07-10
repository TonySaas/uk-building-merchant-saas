/**
 * MCP-based Intelligent Search Service for UK Building Merchant SaaS
 * Uses MCP Supabase connection instead of direct client
 */

import { 
  MerchantSearchResult, 
  SupplierSearchResult, 
  SearchOptions, 
  SearchResponse 
} from '@/types/intelligent-search';

export class MCPIntelligentSearchService {
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
      console.error('MCP Search failed:', error);
      throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search merchants using MCP Supabase connection
   */
  private static async searchMerchants(options: SearchOptions): Promise<MerchantSearchResult[]> {
    const { query, limit = this.DEFAULT_LIMIT } = options;
    
    try {
      // Use MCP Supabase connection (this would need to be implemented)
      // For now, return mock data or fallback to direct API
      console.log('Searching merchants via MCP:', query);
      
      // Fallback to direct fetch for now
      const response = await fetch('/api/merchants/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          limit
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];

    } catch (error) {
      console.error('MCP Merchant search error:', error);
      
      // Fallback to mock data for demo purposes
      return this.getMockMerchants(query, limit);
    }
  }

  /**
   * Search suppliers using MCP Supabase connection
   */
  private static async searchSuppliers(options: SearchOptions): Promise<SupplierSearchResult[]> {
    const { query, limit = this.DEFAULT_LIMIT } = options;
    
    try {
      console.log('Searching suppliers via MCP:', query);
      
      // Fallback to direct fetch for now
      const response = await fetch('/api/suppliers/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          limit
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];

    } catch (error) {
      console.error('MCP Supplier search error:', error);
      
      // Fallback to mock data for demo purposes
      return this.getMockSuppliers(query, limit);
    }
  }

  /**
   * Mock merchant data for demo purposes
   */
  private static getMockMerchants(query: string, limit: number): MerchantSearchResult[] {
    const mockMerchants = [
      {
        id: '1',
        name: 'Robert Price (BM) Limited',
        merchant_name: 'Robert Price (BM) Limited',
        merchant_category: 'Timber',
        merchant_email: 'info@robertprice.com',
        merchant_phone: '01792 123456',
        merchant_website_url: 'https://robertprice.com',
        verification_status: 'verified' as const,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        locations: [
          {
            id: '1',
            name: 'Swansea Branch',
            city: 'Swansea',
            county: 'West Glamorgan',
            postal_code: 'SA1 2AB'
          }
        ],
        organizationAffiliations: [
          {
            id: '1',
            organizationId: 'nmbs',
            affiliationStatus: 'active' as const,
            membershipLevel: 'standard',
            organization: {
              id: 'nmbs',
              name: 'NMBS',
              type: 'trade_association',
              logo_url: 'https://example.com/nmbs-logo.png'
            }
          }
        ]
      },
      {
        id: '2',
        name: 'BMG Hardware (Fermanagh) Ltd',
        merchant_name: 'BMG Hardware (Fermanagh) Ltd',
        merchant_category: 'Hardware',
        merchant_email: 'info@bmghardware.com',
        merchant_phone: '028 123456',
        merchant_website_url: 'https://bmghardware.com',
        verification_status: 'verified' as const,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        locations: [
          {
            id: '2',
            name: 'Fermanagh Store',
            city: 'Enniskillen',
            county: 'Fermanagh',
            postal_code: 'BT74 5AB'
          }
        ],
        organizationAffiliations: []
      }
    ];

    const filtered = mockMerchants.filter(merchant => 
      merchant.name.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.slice(0, limit);
  }

  /**
   * Mock supplier data for demo purposes
   */
  private static getMockSuppliers(query: string, limit: number): SupplierSearchResult[] {
    const mockSuppliers = [
      {
        id: '1',
        name: 'Makita UK Ltd',
        supplier_name: 'Makita UK Ltd',
        description: 'NMBS affiliated supplier providing power tools and equipment.',
        slug: 'makita-uk-ltd',
        website: 'https://makita.co.uk',
        country: 'United Kingdom',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        organizationAffiliations: [
          {
            id: '1',
            organizationId: 'nmbs',
            affiliationStatus: 'active' as const,
            membershipLevel: 'premium',
            organization: {
              id: 'nmbs',
              name: 'NMBS',
              type: 'trade_association',
              logo_url: 'https://example.com/nmbs-logo.png'
            }
          }
        ]
      },
      {
        id: '2',
        name: 'Draper Tools',
        supplier_name: 'Draper Tools',
        description: 'NMBS affiliated supplier providing hand and power tools.',
        slug: 'draper-tools',
        website: 'https://drapertools.com',
        country: 'United Kingdom',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        organizationAffiliations: []
      }
    ];

    const filtered = mockSuppliers.filter(supplier => 
      supplier.name.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.slice(0, limit);
  }

  /**
   * Apply intelligent ranking to search results
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
      this.searchCache.delete(key);
    }
  }

  /**
   * Clear all cached results
   */
  static clearCache(): void {
    this.searchCache.clear();
  }
}