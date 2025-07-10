#!/bin/bash

# Debug script to identify the exact issue

SUPABASE_URL="https://bdtjybhunqqucivpoyad.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGp5Ymh1bnFxdWNpdnBveWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NTQ3MDIsImV4cCI6MjA1MTMzMDcwMn0.3lshYOQJwnyLCa-SWP3hpfvPW9R7u1GKJzMQAfpQ7k8"

echo "🔍 Debug: Step-by-step supplier import testing"
echo "=============================================="

# Test 1: Basic Supabase connectivity
echo "1. Testing basic Supabase connectivity..."
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    "${SUPABASE_URL}/rest/v1/suppliers?select=id&limit=1")

echo "Response: $response"
echo ""

# Test 2: Check available RPC functions
echo "2. Testing debug function (should work)..."
debug_response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" -X POST \
    "${SUPABASE_URL}/rest/v1/rpc/debug_registration_test" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    -H "Content-Type: application/json" \
    -d '{}')

echo "Debug response: $debug_response"
echo ""

# Test 3: Try the import function with minimal data
echo "3. Testing import function with minimal payload..."
import_response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" -X POST \
    "${SUPABASE_URL}/rest/v1/rpc/import_supplier_with_nmbs_affiliation" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
        "p_supplier_name": "Debug Test Supplier",
        "p_slug": "debug-test-supplier",
        "p_supplier_description": "Test",
        "p_supplier_website": "https://test.com",
        "p_country": "United Kingdom"
    }')

echo "Import response: $import_response"
echo ""

# Test 4: Check what functions are actually available
echo "4. Checking available functions..."
functions_response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    "${SUPABASE_URL}/rest/v1/rpc/")

echo "Functions response: $functions_response"
echo ""

# Test 5: Try with different function name
echo "5. Testing if function exists with different parameters..."
alt_response=$(curl -s -w "\nHTTP_STATUS:%{http_code}\n" -X POST \
    "${SUPABASE_URL}/rest/v1/rpc/import_supplier_with_nmbs_affiliation" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
        "supplier_name": "Alt Test Supplier",
        "slug": "alt-test-supplier",
        "supplier_description": "Test",
        "supplier_website": "https://test.com",
        "country": "United Kingdom"
    }')

echo "Alternative response: $alt_response"
echo ""

echo "🔍 Debug complete. Check responses above for clues."
