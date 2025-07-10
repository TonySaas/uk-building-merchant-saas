import { supabase } from '@/lib/supabase';
import {
  CompanySearchResult,
  CompanySearchResponse,
  CompanySearchServiceOptions,
  CompanyDetails,
  OrganizationSuggestion,
  SupplierSearchResult,
  MerchantSearchResult,
  GeographicSearchOptions,
  AutocompleteOptions,
  AutocompleteResult,
  SearchAnalytics,
  CompanySearchFilters
} from '@/types/company-search';

export class CompanySearchService {
  private static readonly SEARCH_DEBOUNCE_MS = 300;
  private static readonly DEFAULT_LIMIT = 10;
  private static readonly MAX_AUTOCOMPLETE_RESULTS = 5;

  /**
   * Search for companies (suppliers or merchants) with advanced filtering
   */
  static async searchCompanies(options: CompanySearchServiceOptions): Promise<CompanySearchResponse> {
    const { query, type, filters = {}, page = 1, limit = this.DEFAULT_LIMIT } = options;
    
    try {
      if (type === 'supplier') {
        return await this.searchSuppliers(query, filters, page, limit);
      } else if (type === 'merchant') {
        return await this.searchMerchants(query, filters, page, limit);
      } else {
        throw new Error(`Invalid company type: ${type}`);
      }
    } catch (error) {
      console.error('Company search error:', error);
      throw new Error('Failed to search companies');
    }
  }

  /**
   * Search suppliers with organization affiliations
   */
  private static async searchSuppliers(
    query: string,
    filters: CompanySearchFilters,
    page: number,
    limit: number
  ): Promise<CompanySearchResponse> {
    let queryBuilder = supabase
      .from('suppliers')
      .select(`
        id,
        name,
        description,
        location,
        employee_count,
        website,
        is_active,
        organization_memberships (
          organization:organizations (
            id,
            name,
            type
          )
        )
      `)
      .eq('is_active', true);

    // Apply search query
    if (query.trim()) {
      queryBuilder = queryBuilder.or(
        `name.ilike.%${query}%,description.ilike.%${query}%`
      );
    }

    // Apply filters
    if (filters.organizationId) {
      queryBuilder = queryBuilder.eq('organization_memberships.organization_id', filters.organizationId);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    queryBuilder = queryBuilder.range(from, to);

    const { data, error, count } = await queryBuilder.limit(limit);

    if (error) {
      console.error('Supplier search error:', error);
      throw error;
    }

    // Transform data to match our interface
    const results: SupplierSearchResult[] = (data || []).map(supplier => ({
      id: supplier.id,
      supplier_name: supplier.name,
      supplier_description: supplier.description,
      supplier_website: supplier.website,
      country: supplier.location || 'United Kingdom',
      is_active: supplier.is_active,
      organization_affiliations: supplier.organization_memberships?.map((membership: any) => ({
        id: membership.organization.id,
        organization: {
          id: membership.organization.id,
          name: membership.organization.name,
          type: membership.organization.type,
          logo_url: null
        },
        affiliation_type: 'member',
        status: 'active'
      })) || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    return {
      results,
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > page * limit
    };
  }

  /**
   * Search merchants with geographic and business data
   */
  private static async searchMerchants(
    query: string,
    filters: CompanySearchFilters,
    page: number,
    limit: number
  ): Promise<CompanySearchResponse> {
    let queryBuilder = supabase
      .from('merchants')
      .select(`
        id,
        name,
        description,
        website,
        is_active,
        merchant_locations (
          id,
          name,
          city,
          county,
          postal_code
        ),
        organization_memberships (
          organization:organizations (
            id,
            name,
            type
          )
        )
      `)
      .eq('is_active', true);

    // Apply search query
    if (query.trim()) {
      queryBuilder = queryBuilder.or(
        `name.ilike.%${query}%,description.ilike.%${query}%`
      );
    }

    // Apply filters
    if (filters.organizationId) {
      queryBuilder = queryBuilder.eq('organization_memberships.organization_id', filters.organizationId);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    queryBuilder = queryBuilder.range(from, to);

    const { data, error, count } = await queryBuilder.limit(limit);

    if (error) {
      console.error('Merchant search error:', error);
      throw error;
    }

    // Transform data and calculate distance if location filter is provided
    let results: MerchantSearchResult[] = (data || []).map(merchant => ({
      id: merchant.id,
      merchant_name: merchant.name,
      description: merchant.description,
      merchant_website_url: merchant.website,
      merchant_email: null,
      merchant_phone: null,
      logo_url: null,
      business_registration_number: null,
      vat_number: null,
      trading_since: null,
      annual_turnover_band: null,
      employee_count_band: null,
      merchant_category: null,
      merchant_address_1: null,
      merchant_address_2: null,
      merchant_address_3: null,
      merchant_address_4: null,
      merchant_postcode: null,
      merchant_latitude: null,
      merchant_longitude: null,
      is_active: merchant.is_active,
      verification_status: 'active',
      organization_affiliations: merchant.organization_memberships?.map((membership: any) => ({
        id: membership.organization.id,
        organization: {
          id: membership.organization.id,
          name: membership.organization.name,
          type: membership.organization.type,
          logo_url: null
        },
        affiliation_status: 'active',
        membership_level: 'standard'
      })) || [],
      merchant_locations: merchant.merchant_locations || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    // Calculate distances if location filter is provided
    if (filters.location?.latitude && filters.location?.longitude) {
      results = results.map(merchant => ({
        ...merchant,
        distance: this.calculateDistance(
          filters.location!.latitude!,
          filters.location!.longitude!,
          merchant.merchant_latitude || 0,
          merchant.merchant_longitude || 0
        )
      }));

      // Filter by radius if specified
      if (filters.location.radius) {
        results = results.filter(merchant => 
          (merchant.distance || Infinity) <= filters.location!.radius!
        );
      }

      // Sort by distance
      results.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    return {
      results,
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > page * limit
    };
  }

  /**
   * Get detailed company information
   */
  static async getCompanyDetails(id: string, type: 'supplier' | 'merchant'): Promise<CompanyDetails> {
    try {
      if (type === 'supplier') {
        return await this.getSupplierDetails(id);
      } else {
        return await this.getMerchantDetails(id);
      }
    } catch (error) {
      console.error('Get company details error:', error);
      throw new Error('Failed to get company details');
    }
  }

  /**
   * Get supplier details
   */
  private static async getSupplierDetails(id: string): Promise<CompanyDetails> {
    const { data, error } = await supabase
      .from('suppliers')
      .select(`
        id,
        supplier_name,
        supplier_description,
        supplier_website,
        country,
        is_active,
        supplier_organization_affiliations (
          id,
          affiliation_type,
          status,
          organization:organizations (
            id,
            name,
            type,
            organization_settings (
              logo_url,
              primary_color,
              secondary_color
            )
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Get supplier details error:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.supplier_name,
      type: 'supplier',
      description: data.supplier_description,
      website: data.supplier_website,
      organizationAffiliations: data.supplier_organization_affiliations?.map((affiliation: any) => ({
        id: affiliation.organization.id,
        name: affiliation.organization.name,
        type: affiliation.organization.type,
        logo_url: affiliation.organization.organization_settings?.[0]?.logo_url,
        primary_color: affiliation.organization.organization_settings?.[0]?.primary_color || '#3b82f6',
        secondary_color: affiliation.organization.organization_settings?.[0]?.secondary_color || '#1e40af',
        suggested: true,
        affiliationType: affiliation.affiliation_type
      })) || [],
      isActive: data.is_active
    };
  }

  /**
   * Get merchant details
   */
  private static async getMerchantDetails(id: string): Promise<CompanyDetails> {
    const { data, error } = await supabase
      .from('merchants')
      .select(`
        id,
        merchant_name,
        description,
        merchant_website_url,
        merchant_email,
        merchant_phone,
        merchant_address_1,
        merchant_address_2,
        merchant_address_3,
        merchant_address_4,
        merchant_postcode,
        merchant_latitude,
        merchant_longitude,
        business_registration_number,
        vat_number,
        trading_since,
        annual_turnover_band,
        employee_count_band,
        merchant_category,
        is_active,
        verification_status,
        merchant_organization_affiliations (
          id,
          affiliation_status,
          membership_level,
          organization:organizations (
            id,
            name,
            type,
            organization_settings (
              logo_url,
              primary_color,
              secondary_color
            )
          )
        ),
        merchant_locations (
          id,
          name,
          city,
          county,
          postal_code
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Get merchant details error:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.merchant_name,
      type: 'merchant',
      description: data.description,
      website: data.merchant_website_url,
      email: data.merchant_email,
      phone: data.merchant_phone,
      address: {
        line1: data.merchant_address_1,
        line2: data.merchant_address_2,
        line3: data.merchant_address_3,
        line4: data.merchant_address_4,
        postcode: data.merchant_postcode,
        latitude: data.merchant_latitude,
        longitude: data.merchant_longitude
      },
      businessInfo: {
        registrationNumber: data.business_registration_number,
        vatNumber: data.vat_number,
        tradingSince: data.trading_since,
        annualTurnoverBand: data.annual_turnover_band,
        employeeCountBand: data.employee_count_band,
        category: data.merchant_category
      },
      organizationAffiliations: data.merchant_organization_affiliations?.map((affiliation: any) => ({
        id: affiliation.organization.id,
        name: affiliation.organization.name,
        type: affiliation.organization.type,
        logo_url: affiliation.organization.organization_settings?.[0]?.logo_url,
        primary_color: affiliation.organization.organization_settings?.[0]?.primary_color || '#3b82f6',
        secondary_color: affiliation.organization.organization_settings?.[0]?.secondary_color || '#1e40af',
        suggested: true,
        membershipLevel: affiliation.membership_level
      })) || [],
      locations: data.merchant_locations || [],
      verificationStatus: data.verification_status,
      isActive: data.is_active
    };
  }

  /**
   * Get autocomplete suggestions
   */
  static async getAutocompleteSuggestions(options: AutocompleteOptions): Promise<AutocompleteResult[]> {
    const { query, type, limit = this.MAX_AUTOCOMPLETE_RESULTS } = options;
    
    if (!query.trim()) {
      return [];
    }

    try {
      const suggestions: AutocompleteResult[] = [];

      if (type === 'supplier') {
        const { data } = await supabase
          .from('suppliers')
          .select('name')
          .ilike('name', `%${query}%`)
          .eq('is_active', true)
          .limit(limit);

        suggestions.push(...(data || []).map(item => ({
          text: item.name,
          type: 'company' as const,
          count: 1
        })));
      } else {
        const { data } = await supabase
          .from('merchants')
          .select('name')
          .ilike('name', `%${query}%`)
          .eq('is_active', true)
          .limit(limit);

        suggestions.push(...(data || []).map(item => ({
          text: item.name,
          type: 'company' as const,
          count: 1
        })));
      }

      return suggestions;
    } catch (error) {
      console.error('Autocomplete error:', error);
      return [];
    }
  }

  /**
   * Search merchants by geographic location
   */
  static async searchMerchantsByLocation(options: GeographicSearchOptions): Promise<MerchantSearchResult[]> {
    const { latitude, longitude, radius, limit = this.DEFAULT_LIMIT } = options;

    try {
      // Note: This is a simplified distance calculation. In production,
      // you might want to use PostGIS for more accurate geographic queries
      const { data, error } = await supabase
        .from('merchants')
        .select(`
          id,
          merchant_name,
          description,
          merchant_website_url,
          merchant_email,
          merchant_phone,
          logo_url,
          business_registration_number,
          vat_number,
          trading_since,
          annual_turnover_band,
          employee_count_band,
          merchant_category,
          merchant_address_1,
          merchant_address_2,
          merchant_address_3,
          merchant_address_4,
          merchant_postcode,
          merchant_latitude,
          merchant_longitude,
          is_active,
          verification_status,
          created_at,
          updated_at,
          merchant_organization_affiliations (
            id,
            affiliation_status,
            membership_level,
            organization:organizations (
              id,
              name,
              type,
              organization_settings (
                logo_url,
                primary_color,
                secondary_color
              )
            )
          ),
          merchant_locations (
            id,
            name,
            city,
            county,
            postal_code
          )
        `)
        .eq('is_active', true)
        .not('merchant_latitude', 'is', null)
        .not('merchant_longitude', 'is', null)
        .limit(limit * 2); // Get more results to filter by distance

      if (error) {
        console.error('Geographic search error:', error);
        throw error;
      }

      // Calculate distances and filter by radius
      const results: MerchantSearchResult[] = (data || [])
        .map(merchant => ({
          id: merchant.id,
          merchant_name: merchant.merchant_name,
          description: merchant.description,
          merchant_website_url: merchant.merchant_website_url,
          merchant_email: merchant.merchant_email,
          merchant_phone: merchant.merchant_phone,
          logo_url: merchant.logo_url,
          business_registration_number: merchant.business_registration_number,
          vat_number: merchant.vat_number,
          trading_since: merchant.trading_since,
          annual_turnover_band: merchant.annual_turnover_band,
          employee_count_band: merchant.employee_count_band,
          merchant_category: merchant.merchant_category,
          merchant_address_1: merchant.merchant_address_1,
          merchant_address_2: merchant.merchant_address_2,
          merchant_address_3: merchant.merchant_address_3,
          merchant_address_4: merchant.merchant_address_4,
          merchant_postcode: merchant.merchant_postcode,
          merchant_latitude: merchant.merchant_latitude,
          merchant_longitude: merchant.merchant_longitude,
          is_active: merchant.is_active,
          verification_status: merchant.verification_status,
          organization_affiliations: merchant.merchant_organization_affiliations?.map((affiliation: any) => ({
            id: affiliation.id,
            organization: {
              id: affiliation.organization.id,
              name: affiliation.organization.name,
              type: affiliation.organization.type,
              logo_url: affiliation.organization.organization_settings?.[0]?.logo_url
            },
            affiliation_status: affiliation.affiliation_status,
            membership_level: affiliation.membership_level
          })) || [],
          merchant_locations: merchant.merchant_locations || [],
          distance: this.calculateDistance(
            latitude,
            longitude,
            merchant.merchant_latitude || 0,
            merchant.merchant_longitude || 0
          ),
          created_at: merchant.created_at,
          updated_at: merchant.updated_at
        }))
        .filter(merchant => (merchant.distance || Infinity) <= radius)
        .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity))
        .slice(0, limit);

      return results;
    } catch (error) {
      console.error('Geographic search error:', error);
      throw error;
    }
  }

  /**
   * Log search analytics
   */
  static async logSearchAnalytics(analytics: SearchAnalytics): Promise<void> {
    try {
      // In a real application, you might want to store this in a separate analytics table
      console.log('Search analytics:', analytics);
    } catch (error) {
      console.error('Analytics logging error:', error);
      // Don't throw here - analytics failures shouldn't break the search
    }
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  private static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  private static toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}