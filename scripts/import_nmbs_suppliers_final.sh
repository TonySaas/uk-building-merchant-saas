#!/bin/bash

# NMBS Supplier Import Automation Script - FINAL FIXED VERSION
# This script will import all remaining NMBS suppliers (batches 5-31)

# Configuration
SUPABASE_URL="https://bdtjybhunqqucivpoyad.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGp5Ymh1bnFxdWNpdnBveWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NTQ3MDIsImV4cCI6MjA1MTMzMDcwMn0.3lshYOQJwnyLCa-SWP3hpfvPW9R7u1GKJzMQAfpQ7k8"
BATCH_DIR="/Users/tonyboyle/uk-building-merchant-saas/sql"
LOG_FILE="/Users/tonyboyle/uk-building-merchant-saas/logs/import_$(date +%Y%m%d_%H%M%S).log"

# Create logs directory if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to get current supplier count using direct API call
get_supplier_count() {
    local response=$(curl -s \
        -H "apikey: ${SUPABASE_ANON_KEY}" \
        -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
        -H "Content-Type: application/json" \
        -H "Prefer: count=exact" \
        "${SUPABASE_URL}/rest/v1/suppliers?select=id")
    
    # Extract count from Content-Range header via response
    local count=$(echo "$response" | jq length 2>/dev/null || echo "0")
    echo "$count"
}

# Function to import a single supplier
import_single_supplier() {
    local supplier_name="$1"
    local slug="$2"
    local description="$3"
    local website="$4"
    local country="$5"
    
    # Escape quotes and special characters for JSON
    supplier_name=$(echo "$supplier_name" | sed 's/"/\\"/g' | sed "s/'/\\'/g")
    description=$(echo "$description" | sed 's/"/\\"/g' | sed "s/'/\\'/g")
    
    local payload=$(cat <<EOF
{
    "p_supplier_name": "$supplier_name",
    "p_slug": "$slug", 
    "p_supplier_description": "$description",
    "p_supplier_website": "$website",
    "p_country": "$country"
}
EOF
)
    
    local response=$(curl -s -X POST "${SUPABASE_URL}/rest/v1/rpc/import_supplier_with_nmbs_affiliation" \
        -H "apikey: ${SUPABASE_ANON_KEY}" \
        -H "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
        -H "Content-Type: application/json" \
        -d "$payload")
    
    echo "$response"
}

# Function to import a batch of suppliers
import_batch() {
    local batch_num=$1
    local batch_file="${BATCH_DIR}/nmbs_batch_$(printf "%02d" $batch_num).json"
    
    if [[ ! -f "$batch_file" ]]; then
        log "ERROR: Batch file not found: $batch_file"
        return 1
    fi
    
    log "Processing batch $batch_num from: $batch_file"
    
    # Get supplier count before import
    local count_before=$(get_supplier_count)
    log "Supplier count before batch $batch_num: $count_before"
    
    # Read and process each supplier in the batch
    local successful=0
    local failed=0
    local total=0
    
    # Use jq to parse the JSON file and process each supplier
    while IFS= read -r supplier; do
        ((total++))
        
        local name=$(echo "$supplier" | jq -r '.supplier_name // ""')
        local slug=$(echo "$supplier" | jq -r '.slug // ""')
        local description=$(echo "$supplier" | jq -r '.supplier_description // ""')
        local website=$(echo "$supplier" | jq -r '.supplier_website // ""')
        local country=$(echo "$supplier" | jq -r '.country // "United Kingdom"')
        
        if [[ -z "$name" || -z "$slug" ]]; then
            log "    ⚠️  Skipping invalid supplier data"
            continue
        fi
        
        log "  Importing: $name"
        
        local response=$(import_single_supplier "$name" "$slug" "$description" "$website" "$country")
        
        if echo "$response" | grep -q '"success":true'; then
            ((successful++))
            log "    ✅ $name imported successfully"
        else
            ((failed++))
            local error_msg=$(echo "$response" | jq -r '.message // "Unknown error"' 2>/dev/null || echo "Parse error")
            log "    ❌ $name failed: $error_msg"
        fi
        
        # Brief pause between suppliers to avoid overwhelming the API
        sleep 0.3
        
    done < <(jq -c '.[]' "$batch_file" 2>/dev/null)
    
    # Wait for processing
    sleep 2
    
    # Get supplier count after import
    local count_after=$(get_supplier_count)
    local imported=$((count_after - count_before))
    
    log "Batch $batch_num completed:"
    log "  - Processed: $total suppliers"
    log "  - Successful: $successful"
    log "  - Failed: $failed"
    log "  - Database count: $count_before → $count_after (+$imported)"
    
    # Return success if at least some suppliers were imported
    if [[ $successful -gt 0 ]]; then
        return 0
    else
        return 1
    fi
}

# Main execution
main() {
    log "=== NMBS Supplier Import Started (FINAL FIXED VERSION) ==="
    log "Log file: $LOG_FILE"
    
    # Check if jq is available
    if ! command -v jq &> /dev/null; then
        log "ERROR: jq is required but not installed. Please install jq first."
        echo "Install jq with: brew install jq"
        exit 1
    fi
    
    # Get initial count
    local initial_count=$(get_supplier_count)
    log "Initial supplier count: $initial_count"
    
    # Process batches 5-31
    local successful_batches=0
    local failed_batches=0
    
    for batch in {5..31}; do
        log ""
        log "=== Starting Batch $batch ==="
        
        if import_batch $batch; then
            ((successful_batches++))
            log "✅ Batch $batch completed successfully"
        else
            ((failed_batches++))
            log "❌ Batch $batch had failures"
            
            # Ask if we should continue on failure
            echo ""
            read -p "Batch $batch had failures. Continue with next batch? (y/N): " -n 1 -r
            echo ""
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                log "Import stopped by user after batch $batch failure"
                break
            fi
        fi
        
        # Brief pause between batches
        sleep 1
    done
    
    # Final summary
    local final_count=$(get_supplier_count)
    local total_imported=$((final_count - initial_count))
    
    log ""
    log "=== NMBS Supplier Import Completed ==="
    log "Initial count: $initial_count"
    log "Final count: $final_count"
    log "Total imported: $total_imported"
    log "Successful batches: $successful_batches"
    log "Failed batches: $failed_batches"
    log "Log saved to: $LOG_FILE"
    
    if [[ $failed_batches -eq 0 ]]; then
        log "🎉 All batches completed successfully!"
    else
        log "⚠️  Some batches had failures. Check log for details."
    fi
    
    # Verification
    if [[ $final_count -ge 300 ]]; then
        log "✅ SUCCESS: Final count ($final_count) meets target (≥300)"
    else
        log "⚠️  WARNING: Final count ($final_count) below target (300+)"
        log "💡 TIP: You may want to check failed batches and re-run them"
    fi
    
    log ""
    log "🎯 NEXT STEPS:"
    log "1. Verify final supplier count in Supabase dashboard"
    log "2. Continue with Phase 1 development (merchant interface, consumer PWA)"
    log "3. Begin Phase 2 features once foundation is complete"
}

# Execute main function
main "$@"
