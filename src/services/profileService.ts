
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { SectionVisibilityType } from '@/hooks/useDefaultCVSettings';

export async function getProfile() {
  try {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        companies (*)
      `)
      .eq('id', user.data.user.id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error fetching profile');
    return { data: null, error };
  }
}

export async function updateProfile(updates: {
  first_name?: string;
  last_name?: string;
  phone?: string;
  job_title?: string;
  bio?: string;
}) {
  try {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.data.user.id)
      .select()
      .single();
      
    if (error) throw error;
    toast.success('Profile updated successfully');
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error updating profile');
    return { data: null, error };
  }
}

export async function updateCompanyDetails(companyId: string, updates: {
  name?: string;
  website?: string;
  address?: string;
  description?: string;
  brand_color?: string;
  default_cv_template?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', companyId)
      .select()
      .single();
      
    if (error) throw error;
    toast.success('Company details updated successfully');
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error updating company details');
    return { data: null, error };
  }
}

export async function createCompany(companyData: {
  name: string;
  website?: string;
  address?: string;
  description?: string;
  brand_color?: string;
}) {
  try {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('User not authenticated');
    }

    // Create the company
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .insert(companyData)
      .select()
      .single();
      
    if (companyError) throw companyError;
    
    // Link the company to the user's profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ company_id: company.id })
      .eq('id', user.data.user.id);
      
    if (profileError) throw profileError;
    
    toast.success('Company created successfully');
    return { data: company, error: null };
  } catch (error: any) {
    toast.error('Error creating company');
    return { data: null, error };
  }
}

export async function uploadCompanyLogo(companyId: string, file: File) {
  try {
    // Upload file to storage
    const fileExt = file.name.split('.').pop();
    const filePath = `company_logos/${companyId}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('company_logos')
      .upload(filePath, file, { upsert: true });
      
    if (uploadError) throw uploadError;
    
    // Update company record with logo path
    const { data, error: updateError } = await supabase
      .from('companies')
      .update({ logo_storage_path: filePath })
      .eq('id', companyId)
      .select()
      .single();
      
    if (updateError) throw updateError;
    
    toast.success('Logo uploaded successfully');
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error uploading logo');
    return { data: null, error };
  }
}

export async function updateDefaultCVSettings(settings: {
  default_anonymize?: boolean;
  default_section_visibility?: SectionVisibilityType;
  default_section_order?: string[];
}) {
  try {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(settings)
      .eq('id', user.data.user.id)
      .select()
      .single();
      
    if (error) throw error;
    toast.success('Default CV settings updated successfully');
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error updating default CV settings');
    return { data: null, error };
  }
}
