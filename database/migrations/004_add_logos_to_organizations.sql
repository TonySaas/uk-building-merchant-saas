-- Add logo columns to organizations table
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS logo_storage_path TEXT,
ADD COLUMN IF NOT EXISTS logo_alt_text TEXT;