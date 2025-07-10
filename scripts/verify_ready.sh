#!/bin/bash

# Quick verification script to check if everything is ready for automated import

BATCH_DIR="/Users/tonyboyle/uk-building-merchant-saas/sql"
SUPABASE_URL="https://bdtjybhunqqucivpoyad.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGp5Ymh1bnFxdWNpdnBveWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NTQ3MDIsImV4cCI6MjA1MTMzMDcwMn0.3lshYOQJwnyLCa-SWP3hpfvPW9R7u1GKJzMQAfpQ7k8"

echo "🔍 Pre-Import Verification"
echo "=========================="

# Check if batch files exist
echo "📁 Checking batch files..."
missing_files=0
for i in {5..31}; do
    batch_file="${BATCH_DIR}/nmbs_batch_$(printf "%02d" $i).json"
    if [[ ! -f "$batch_file" ]]; then
        echo "❌ Missing: nmbs_batch_$(printf "%02d" $i).json"
        ((missing_files++))
    fi
done

if [[ $missing_files -eq 0 ]]; then
    echo "✅ All 27 batch files (5-31) are present"
else
    echo "❌ $missing_files batch files are missing"
    exit 1
fi

# Check Supabase connectivity
echo "🌐 Testing Supabase connectivity..."
response=$(curl -s -X POST "${SUPABASE_URL}/rest/v1/rpc/count_suppliers" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Content-Type: application/json" \
    -d '{}')

if echo "$response" | grep -q '"count"'; then
    current_count=$(echo "$response" | grep -o '"count":[0-9]*' | cut -d':' -f2)
    echo "✅ Supabase connected. Current supplier count: $current_count"
else
    echo "❌ Supabase connection failed. Response: $response"
    exit 1
fi

# Check import function availability
echo "🔧 Testing import function..."
test_response=$(curl -s -X POST "${SUPABASE_URL}/rest/v1/rpc/debug_registration_test" \
    -H "apikey: ${SUPABASE_ANON_KEY}" \
    -H "Content-Type: application/json" \
    -d '{}')

if echo "$test_response" | grep -q '"status":"success"'; then
    echo "✅ Import functions are working"
else
    echo "❌ Import function test failed. Response: $test_response"
    exit 1
fi

echo ""
echo "🎉 All checks passed! Ready for automated import."
echo ""
echo "To start the import, run:"
echo "  ./scripts/import_nmbs_suppliers.sh"
echo ""
echo "Expected results:"
echo "  • Process 27 batches (5-31)"
echo "  • Import ~270 suppliers"
echo "  • Final count: ~306 suppliers"
echo "  • Duration: 5-10 minutes"
