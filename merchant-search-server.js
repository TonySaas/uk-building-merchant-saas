#!/usr/bin/env node

/**
 * Simple HTTP server to handle merchant search
 * This bypasses RLS policy issues by using service role key
 */

import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client with service role key
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Search endpoint
app.post('/api/search', async (req, res) => {
    const { query, type = 'merchant', limit = 10 } = req.body;

    if (!query || query.length < 2) {
        return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    try {
        const tableName = type === 'supplier' ? 'suppliers' : 'merchants';
        const selectFields = type === 'supplier' 
            ? `id, supplier_name, supplier_description, supplier_website, country,
               supplier_organization_affiliations (
                 id, organization_id,
                 organization:organizations (id, name, type, logo_url)
               )`
            : `id, merchant_name, merchant_category, merchant_website_url, verification_status,
               merchant_locations (id, name, city, county, postal_code),
               merchant_organization_affiliations (
                 id, status, membership_level,
                 organization:organizations (id, name, type, logo_url)
               )`;
        const searchField = type === 'supplier' ? 'supplier_name' : 'merchant_name';

        console.log(`🔍 Searching ${type}s for: "${query}"`);

        const { data, error } = await supabase
            .from(tableName)
            .select(selectFields)
            .ilike(searchField, `%${query}%`)
            .limit(limit);

        if (error) {
            console.error('❌ Search error:', error);
            return res.status(500).json({ error: error.message });
        }

        // Map the data to consistent format
        const mappedData = (data || []).map(item => ({
            id: item.id,
            name: type === 'supplier' ? item.supplier_name : item.merchant_name,
            description: type === 'supplier' ? item.supplier_description : item.merchant_category,
            website: type === 'supplier' ? item.supplier_website : item.merchant_website_url,
            country: type === 'supplier' ? item.country : 'United Kingdom',
            verification_status: type === 'merchant' ? item.verification_status : 'active',
            locations: type === 'merchant' ? (item.merchant_locations || []) : [],
            organization_affiliations: type === 'supplier' 
                ? (item.supplier_organization_affiliations || []).map(affiliation => ({
                    id: affiliation.id,
                    organizationId: affiliation.organization_id,
                    affiliationStatus: 'active',
                    membershipLevel: 'standard',
                    organization: affiliation.organization
                  }))
                : (item.merchant_organization_affiliations || []).map(affiliation => ({
                    id: affiliation.id,
                    organizationId: affiliation.organization.id,
                    affiliationStatus: affiliation.status,
                    membershipLevel: affiliation.membership_level,
                    organization: affiliation.organization
                  }))
        }));

        console.log(`✅ Found ${mappedData.length} results`);

        return res.json({
            results: mappedData,
            count: mappedData.length,
            query,
            type
        });

    } catch (error) {
        console.error('❌ Search exception:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Merchant search server running on http://localhost:${PORT}`);
    console.log(`📡 Search endpoint: http://localhost:${PORT}/api/search`);
});