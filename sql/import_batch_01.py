#!/usr/bin/env python3
import json
import time
import requests

# Batch 1 suppliers from the JSON file
suppliers = [
  {
    "supplier_name": "Acheson & Glover",
    "slug": "acheson-glover",
    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
    "supplier_website": "https://www.ag.uk.com",
    "country": "United Kingdom",
    "is_active": True
  },
  {
    "supplier_name": "Ademco 1 Ltd, Honeywell Home",
    "slug": "ademco-1-ltd-honeywell-home",
    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
    "supplier_website": "https://www.heatingcontrols.honeywellhome.com",
    "country": "United Kingdom",
    "is_active": True
  },
  {
    "supplier_name": "Adey Innovations",
    "slug": "adey-innovations",
    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
    "supplier_website": "https://www.adey.co.uk",
    "country": "United Kingdom",
    "is_active": True
  },
  {
    "supplier_name": "Aerosol Solutions Ltd",
    "slug": "aerosol-solutions-ltd",
    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
    "supplier_website": "https://www.aerosolsolutions.co.uk",
    "country": "United Kingdom",
    "is_active": True
  },
  {
    "supplier_name": "AGA Rangemaster",
    "slug": "aga-rangemaster",
    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
    "supplier_website": "https://www.leisuresinks.co.uk",
    "country": "United Kingdom",
    "is_active": True
  },
  {
    "supplier_name": "Aggregate Industries/ Bradstone/ Charcon",
    "slug": "aggregate-industries-bradstone-charcon",
    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
    "supplier_website": "https://www.bradstone.com",
    "country": "United Kingdom",
    "is_active": True
  },
  {
    "supplier_name": "AIM Solder UK LTD",
    "slug": "aim-solder-uk-ltd",
    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
    "supplier_website": "https://www.aimsolder.com",
    "country": "United Kingdom",
    "is_active": True
  },
  {
    "supplier_name": "Airflow ( Nicoll Ventilators) Ltd",
    "slug": "airflow-nicoll-ventilators-ltd",
    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
    "supplier_website": "https://www.airflow-vent.co.uk",
    "country": "United Kingdom",
    "is_active": True
  },
  {
    "supplier_name": "Aliaxis UK (including Hunter and Marley Plumbing)",
    "slug": "aliaxis-uk-including-hunter-and-marley-plumbing",
    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
    "supplier_website": "https://www.aliaxis.co.uk",
    "country": "United Kingdom",
    "is_active": True
  },
  {
    "supplier_name": "Allegion UK Ltd",
    "slug": "allegion-uk-ltd",
    "supplier_description": "NMBS affiliated supplier providing building materials and related products.",
    "supplier_website": "https://www.allegion.co.uk",
    "country": "United Kingdom",
    "is_active": True
  }
]

print("Starting NMBS Batch 1 Import...")
print(f"Processing {len(suppliers)} suppliers")

successful = 0
failed = 0

for i, supplier in enumerate(suppliers, 1):
    try:
        print(f"\n[{i}/{len(suppliers)}] Processing: {supplier['supplier_name']}")
        
        # Print the API call that would be made
        api_call = {
            "p_supplier_name": supplier["supplier_name"],
            "p_slug": supplier["slug"],
            "p_supplier_description": supplier["supplier_description"],
            "p_supplier_website": supplier["supplier_website"],
            "p_country": supplier["country"]
        }
        
        print(f"API Call: supabase:postgrestRequest")
        print(f"Method: POST")
        print(f"Path: /rpc/import_supplier_with_nmbs_affiliation")
        print(f"Body: {json.dumps(api_call, indent=2)}")
        
        # Note: In actual implementation, you would make the API call here
        # For now, we're just generating the calls
        
        successful += 1
        print(f"✅ Ready for import")
        
        # Small delay to avoid overwhelming the API
        time.sleep(0.1)
        
    except Exception as e:
        failed += 1
        print(f"❌ Error preparing {supplier['supplier_name']}: {str(e)}")

print(f"\n📊 Batch 1 Summary:")
print(f"✅ Successful: {successful}")
print(f"❌ Failed: {failed}")
print(f"📝 Total: {len(suppliers)}")
