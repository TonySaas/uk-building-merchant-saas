#!/bin/bash

# NMBS Supplier Import Automation Script
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

# Function to get current supplier count
get_supplier_count() {
    curl -s -X POST "${SUPABASE_URL}/rest/v1/rpc/count_suppliers" \
        -H "apikey: ${SUPABASE_ANON_KEY}" \
        -H "Content-Type: application/json" \
        -d '{}' | grep -o '"count":[0-9]*' | cut -d':' -f2
}

# Function to import a single batch
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
    
    # Import the batch
    local response=$(curl -s -X POST "${SUPABASE_URL}/rest/v1/rpc/import_suppliers_batch" \
        -H "apikey: ${SUPABASE_ANON_KEY}" \
        -H "Content-Type: application/json" \
        -d @"$batch_file")
    
    # Check if response contains error
    if echo "$response" | grep -q '"error"'; then
        log "ERROR in batch $batch_num: $response"
        return 1
    fi
    
    # Wait for processing
    sleep 3
    
    # Get supplier count after import
    local count_after=$(get_supplier_count)
    local imported=$((count_after - count_before))
    
    log "Batch $batch_num completed. Imported: $imported suppliers. Total: $count_after"
    
    return 0
}

# Main execution
main() {
    log "=== NMBS Supplier Import Started ==="
    log "Log file: $LOG_FILE"
    
    # Get initial count
    local initial_count=$(get_supplier_count)
    log "Initial supplier count: $initial_count"
    
    # Process batches 5-31
    local successful_batches=0
    local failed_batches=0
    
    for batch in {5..31}; do
        if import_batch $batch; then
            ((successful_batches++))
            log "✅ Batch $batch successful"
        else
            ((failed_batches++))
            log "❌ Batch $batch failed"
            
            # Ask if we should continue on failure
            read -p "Batch $batch failed. Continue with next batch? (y/n): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                log "Import stopped by user after batch $batch failure"
                break
            fi
        fi
        
        # Brief pause between batches
        sleep 2
    done
    
    # Final summary
    local final_count=$(get_supplier_count)
    local total_imported=$((final_count - initial_count))
    
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
        log "⚠️  Some batches failed. Check log for details."
    fi
}

# Execute main function
main "$@"
