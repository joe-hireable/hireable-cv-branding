
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export interface CreateCandidateInput {
  first_name?: string;
  last_name?: string;
  current_position?: string;
  current_company?: string;
}

export async function getCandidates() {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error fetching candidates');
    return { data: null, error };
  }
}

export async function getCandidate(id: string) {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error fetching candidate details');
    return { data: null, error };
  }
}

export async function createCandidate(candidate: CreateCandidateInput) {
  try {
    const user = supabase.auth.getUser();
    const { data, error } = await supabase
      .from('candidates')
      .insert({
        ...candidate,
        owner_id: (await user).data.user?.id
      })
      .select()
      .single();
      
    if (error) throw error;
    toast.success('Candidate created successfully');
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error creating candidate');
    return { data: null, error };
  }
}

export async function updateCandidate(id: string, updates: Partial<CreateCandidateInput>) {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    toast.success('Candidate updated successfully');
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error updating candidate');
    return { data: null, error };
  }
}

export async function deleteCandidate(id: string) {
  try {
    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    toast.success('Candidate deleted successfully');
    return { error: null };
  } catch (error: any) {
    toast.error('Error deleting candidate');
    return { error };
  }
}
