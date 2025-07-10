import { supabase } from '@/lib/supabase';

export interface SimpleCompany {
  id: string;
  name: string;
  description?: string;
  type: 'supplier' | 'merchant';
  organizations?: string[];
}

export class SimpleCompanySearchService {
  /**
   * Simple search that works with basic schema
   */
  static async searchCompanies(query: string, type: 'supplier' | 'merchant'): Promise<SimpleCompany[]> {
    if (!query.trim()) {
      return [];
    }

    try {
      console.log(`Searching ${type}s for: "${query}"`);
      
      // Use correct field names based on database schema
      const selectFields = type === 'supplier' 
        ? 'id, supplier_name, supplier_description'  // suppliers table uses 'supplier_name'
        : 'id, merchant_name, merchant_category';  // merchants table uses 'merchant_name'
      
      const searchField = type === 'supplier' ? 'supplier_name' : 'merchant_name';
      
      const { data, error } = await supabase
        .from(type === 'supplier' ? 'suppliers' : 'merchants')
        .select(selectFields)
        .ilike(searchField, `%${query}%`)
        .eq('is_active', true)
        .limit(10);

      if (error) {
        console.error(`${type} search error:`, error);
        throw new Error(`Failed to search ${type}s: ${error.message}`);
      }

      const results: SimpleCompany[] = (data || []).map(item => ({
        id: item.id,
        name: type === 'supplier' ? item.supplier_name : item.merchant_name,
        description: type === 'supplier' ? item.supplier_description : item.merchant_category,
        type,
        organizations: []
      }));

      console.log(`Found ${results.length} ${type}s`);
      return results;

    } catch (error) {
      console.error(`${type} search failed:`, error);
      throw error;
    }
  }
}