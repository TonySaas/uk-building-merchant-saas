import { supabase } from './supabase';

export const STORAGE_BUCKET = 'organization-logos';

export const uploadLogo = async (file: File, organizationId: string): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${organizationId}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading logo:', error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath);

  return publicUrl;
};

export const getLogoUrl = (organizationId: string, logoPath: string): string => {
  if (logoPath.startsWith('http')) {
    return logoPath; // Already a full URL
  }
  const { data: { publicUrl } } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(logoPath);
  return publicUrl;
};
