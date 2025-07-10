// Simple API endpoint for merchant search
// This bypasses RLS policy issues by using service role key

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { query, type = 'merchant', limit = 10 } = req.body

  if (!query || query.length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' })
  }

  try {
    const tableName = type === 'supplier' ? 'suppliers' : 'merchants'
    const selectFields = type === 'supplier' 
      ? 'id, name, description'
      : 'id, merchant_name, merchant_category'
    const searchField = type === 'supplier' ? 'name' : 'merchant_name'

    console.log(`API Search: ${type} for "${query}"`)

    const { data, error } = await supabase
      .from(tableName)
      .select(selectFields)
      .ilike(searchField, `%${query}%`)
      .limit(limit)

    if (error) {
      console.error('API Search error:', error)
      return res.status(500).json({ error: error.message })
    }

    // Map the data to consistent format
    const mappedData = (data || []).map(item => ({
      id: item.id,
      name: type === 'supplier' ? item.name : item.merchant_name,
      description: type === 'supplier' ? item.description : item.merchant_category
    }))

    return res.status(200).json({
      results: mappedData,
      count: mappedData.length,
      query,
      type
    })

  } catch (error) {
    console.error('API Search exception:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}