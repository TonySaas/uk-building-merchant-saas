# NMBS Supplier Import - Quick Start Guide

## 🚀 Automated Import Process

This script will automatically process all remaining NMBS supplier batches (5-31) without requiring Claude Desktop.

## Prerequisites

1. **Batch files are ready** in `/Users/tonyboyle/uk-building-merchant-saas/sql/`
2. **Supabase is configured** and accessible
3. **Terminal access** to run the script

## Usage

### Step 1: Make the script executable
```bash
chmod +x /Users/tonyboyle/uk-building-merchant-saas/scripts/import_nmbs_suppliers.sh
```

### Step 2: Run the import
```bash
cd /Users/tonyboyle/uk-building-merchant-saas
./scripts/import_nmbs_suppliers.sh
```

## What the Script Does

1. **Processes batches 5-31** sequentially
2. **Logs all activity** to timestamped log files
3. **Tracks supplier counts** before/after each batch
4. **Handles errors gracefully** with option to continue
5. **Provides final summary** of results

## Monitoring Progress

The script will:
- ✅ Show real-time progress in terminal
- 📝 Save detailed logs to `/Users/tonyboyle/uk-building-merchant-saas/logs/`
- 📊 Display supplier counts after each batch
- ⚠️ Prompt on errors whether to continue

## Expected Results

- **Starting count**: ~36 suppliers
- **Target final count**: 306 suppliers (270 to be imported)
- **Processing time**: ~5-10 minutes total
- **Batches to process**: 27 batches (5-31)

## Troubleshooting

### If a batch fails:
1. **Check the log file** for specific error details
2. **Verify batch file exists** in the sql directory
3. **Check Supabase connectivity**
4. **Choose to continue or stop** when prompted

### Manual verification:
```bash
# Check current supplier count
curl -X POST "https://bdtjybhunqqucivpoyad.supabase.co/rest/v1/rpc/count_suppliers" \
     -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkdGp5Ymh1bnFxdWNpdnBveWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NTQ3MDIsImV4cCI6MjA1MTMzMDcwMn0.3lshYOQJwnyLCa-SWP3hpfvPW9R7u1GKJzMQAfpQ7k8" \
     -H "Content-Type: application/json" \
     -d '{}'
```

## Log Files

Logs are automatically saved to:
```
/Users/tonyboyle/uk-building-merchant-saas/logs/import_YYYYMMDD_HHMMSS.log
```

Each log contains:
- Timestamp for each operation
- Supplier counts before/after each batch
- Success/failure status
- Error details if any occur
- Final summary statistics

## Success Indicators

✅ **Complete Success**: All 27 batches processed, ~306 total suppliers
✅ **Partial Success**: Most batches processed, can retry failed ones manually
❌ **Failure**: Check logs and Supabase connectivity

## Next Steps After Completion

1. **Verify final count** matches expected ~306 suppliers
2. **Review logs** for any issues
3. **Continue with Phase 1** development (merchant interface, consumer PWA)
4. **Begin Phase 2** features once foundation is complete

---

🎯 **Ready to Run**: Simply execute the script and monitor progress. No Claude interaction required!
