
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { SectionVisibilityType } from '@/hooks/useDefaultCVSettings';

interface GenerateDocumentInput {
  cvId: string;
  format: 'pdf' | 'docx';
  templateStyle: string;
  includedRecruiterBranding: boolean;
  includedCoverPage: boolean;
  isAnonymized: boolean;
  sectionVisibility: SectionVisibilityType;
  sectionOrder: string[];
}

export async function generateDocument(input: GenerateDocumentInput) {
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // In a real application, you would call your backend service here
    // to generate the document. For now, we'll simulate the process.
    
    // This would be replaced with actual document generation logic and storage
    const filePath = `generated_cvs/${input.cvId}/${Date.now()}.${input.format}`;
    
    // Create a document record
    const { data, error } = await supabase
      .from('generated_documents')
      .insert({
        cv_id: input.cvId,
        generator_id: userId,
        generated_file_storage_path: filePath,
        format: input.format,
        template_style: input.templateStyle,
        included_recruiter_branding: input.includedRecruiterBranding,
        included_cover_page: input.includedCoverPage,
        settings_snapshot: {
          isAnonymized: input.isAnonymized,
          sectionVisibility: input.sectionVisibility,
          sectionOrder: input.sectionOrder
        }
      })
      .select()
      .single();
      
    if (error) throw error;
    
    toast.success(`Document generated successfully`);
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error generating document');
    return { data: null, error };
  }
}

export async function getGeneratedDocuments(cvId: string) {
  try {
    const { data, error } = await supabase
      .from('generated_documents')
      .select('*')
      .eq('cv_id', cvId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    toast.error('Error fetching generated documents');
    return { data: null, error };
  }
}

export async function downloadGeneratedDocument(filePath: string) {
  try {
    // In a real app, we would fetch a signed URL or download from storage
    // Here we'll just simulate a successful file download
    
    toast.success(`Document download started`);
    return { data: true, error: null };
  } catch (error: any) {
    toast.error('Error downloading document');
    return { data: null, error };
  }
}
