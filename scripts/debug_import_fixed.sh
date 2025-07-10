#!/bin/bash

# Debug script to identify the exact issue - CORRECTED VERSION

SUPABASE_URL="https://lpsfnwbkofjpzmlbcztw.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwc2Zud2Jrb2ZqcHptbGJjenR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODkyMTQsImV4cCI6MjA2NzU2NTIxNH0.9smyBWRy1UgqEZS2FDrZ0fuK41l_7qevbK99cia6328"

echo "🔍 Debug: Step-by-step supplier import testing (CORRECTED)"
echo "==========================================================="

# Test 1: Basic Supabase connectivity
echo "1. Testing basic Supabase connectivity..."
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    "${SUPABASE_URL}/rest/v1/suppliers?select=id&limit=1")

echo "Response: $response"
echo ""

# Test 2: Check debug function
echo "2. Testing debug function (should work)..."
debug_response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" -X POST \
    "${SUPABASE_URL}/rest/v1/rpc/debug_registration_test" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    -H "Content-Type: application/json" \
    -d '{}')

echo "Debug response: $debug_response"
echo ""

# Test 3: Check what tables exist
echo "3. Checking existing tables..."
tables_response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    "${SUPABASE_URL}/rest/v1/?select=*")

echo "Tables response: $tables_response"
echo ""

# Test 4: Check organizations table
echo "4. Testing organizations table access..."
orgs_response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    "${SUPABASE_URL}/rest/v1/organizations?select=id,name&limit=5")

echo "Organizations response: $orgs_response"
echo ""

# Test 5: Check suppliers table structure
echo "5. Testing suppliers table access..."
suppliers_response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    "${SUPABASE_URL}/rest/v1/suppliers?select=id,name&limit=5")

echo "Suppliers response: $suppliers_response"
echo ""

# Test 6: Try to insert a simple supplier directly (not via function)
echo "6. Testing direct supplier insert..."
direct_insert_response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" -X POST \
    "${SUPABASE_URL}/rest/v1/suppliers" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=representation" \
    -d '{
        "name": "Test Direct Insert Supplier",
        "slug": "test-direct-insert-supplier",
        "description": "Test supplier via direct insert",
        "website": "https://test.com",
        "country": "United Kingdom"
    }')

echo "Direct insert response: $direct_insert_response"
echo ""

echo "🔍 Debug complete. Check responses above for clues."
