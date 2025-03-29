
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { CVData } from '@/types/cv';

export async function getCVs(candidateId: string) {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .select('*')
      .eq('candidate_id', candidateId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error fetching CV history');
    return { data: null, error };
  }
}

export async function getCV(id: string) {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error fetching CV details');
    return { data: null, error };
  }
}

export async function uploadCV(candidateId: string, file: File) {
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // Upload file to storage
    const fileExt = file.name.split('.').pop();
    const filePath = `original_cvs/${candidateId}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('original_cvs')
      .upload(filePath, file);
      
    if (uploadError) throw uploadError;
    
    // Create CV record
    const { data, error: insertError } = await supabase
      .from('cvs')
      .insert({
        candidate_id: candidateId,
        uploader_id: userId,
        original_file_storage_path: filePath,
        original_filename: file.name,
        status: 'Uploaded'
      })
      .select()
      .single();
      
    if (insertError) throw insertError;
    
    toast.success('CV uploaded successfully');
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error uploading CV');
    return { data: null, error };
  }
}

export async function updateCVData(id: string, parsedData: CVData) {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .update({
        parsed_data: parsedData,
        status: 'Parsed'
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error updating CV data');
    return { data: null, error };
  }
}

export async function updateCVStatus(id: string, status: string) {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error updating CV status');
    return { data: null, error };
  }
}

export async function downloadCVFile(filePath: string) {
  try {
    const { data, error } = await supabase.storage
      .from('original_cvs')
      .download(filePath);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error downloading CV file');
    return { data: null, error };
  }
}
