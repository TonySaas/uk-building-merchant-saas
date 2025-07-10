            print(f"❌ CSV file not found: {csv_path}")
        except Exception as e:
            print(f"❌ Error processing CSV: {str(e)}")
    
    def upload_summary(self):
        """Print upload summary."""
        print(f"\n📈 Upload Summary:")
        print(f"✅ Successfully uploaded: {self.uploaded_count} suppliers")
        print(f"❌ Errors: {self.error_count}")
        print(f"🎯 Total processed: {self.uploaded_count + self.error_count}")

def main():
    """Main execution function."""
    csv_path = "/Users/tonyboyle/Library/CloudStorage/Dropbox/MERCHANT DEALS Folder Dropbox/MERCHANT DEALS DATA/NMBS Merchants and Suppliers/NMBS_Suppliers_Names_Websites_306.csv"
    
    if not SUPABASE_KEY:
        print("❌ Error: SUPABASE_ANON_KEY environment variable not set")
        print("   Please set it with: export SUPABASE_ANON_KEY='your_key_here'")
        return
    
    uploader = NMBSSupplierUploader()
    uploader.process_csv(csv_path)
    uploader.upload_summary()

if __name__ == "__main__":
    main()
