#!/bin/bash

# Quick test of the fixed import function

SUPABASE_URL="https://bdtjybhunqqucivpoyad.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGp5Ymh1bnFxdWNpdnBveWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NTQ3MDIsImV4cCI6MjA1MTMzMDcwMn0.3lshYOQJwnyLCa-SWP3hpfvPW9R7u1GKJzMQAfpQ7k8"

echo "🧪 Testing supplier import function..."

# Get current count
current_count=$(curl -s \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    "${SUPABASE_URL}/rest/v1/suppliers?select=id" | jq length)

echo "Current supplier count: $current_count"

# Test import one supplier from batch 5
echo "Testing import of BSW Timber Ltd..."

response=$(curl -s -X POST "${SUPABASE_URL}/rest/v1/rpc/import_supplier_with_nmbs_affiliation" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    -H "Content-Type: application/json" \
    -d '{
        "p_supplier_name": "BSW Timber Ltd Test",
        "p_slug": "bsw-timber-ltd-test",
        "p_supplier_description": "NMBS affiliated supplier providing building materials and related products.",
        "p_supplier_website": "https://www.bsw.co.uk",
        "p_country": "United Kingdom"
    }')

echo "Response: $response"

# Check new count
sleep 1
new_count=$(curl -s \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
    "${SUPABASE_URL}/rest/v1/suppliers?select=id" | jq length)

echo "New supplier count: $new_count"
echo "Imported: $((new_count - current_count)) suppliers"

if echo "$response" | grep -q '"success":true'; then
    echo "✅ Test successful! Ready to run full import."
    echo ""
    echo "To run the full import:"
    echo "./scripts/import_nmbs_suppliers_final.sh"
else
    echo "❌ Test failed. Check the response above."
fi
