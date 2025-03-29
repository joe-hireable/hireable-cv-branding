
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          website: string | null
          address: string | null
          description: string | null
          brand_color: string | null
          logo_storage_path: string | null
          default_cv_template: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          website?: string | null
          address?: string | null
          description?: string | null
          brand_color?: string | null
          logo_storage_path?: string | null
          default_cv_template?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          website?: string | null
          address?: string | null
          description?: string | null
          brand_color?: string | null
          logo_storage_path?: string | null
          default_cv_template?: string
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          phone: string | null
          job_title: string | null
          bio: string | null
          company_id: string | null
          default_anonymize: boolean
          default_section_visibility: Json | null
          default_section_order: Json | null
          default_ai_model: string
          auto_optimize_upload: boolean
          smart_keyword_detection: boolean
          grammar_correction: boolean
          custom_ai_instructions: string | null
          default_export_format: string
          default_include_cover_page: boolean
          default_include_recruiter_details: boolean
          default_email_template: string | null
          email_notifications: boolean
          processing_notifications: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          job_title?: string | null
          bio?: string | null
          company_id?: string | null
          default_anonymize?: boolean
          default_section_visibility?: Json | null
          default_section_order?: Json | null
          default_ai_model?: string
          auto_optimize_upload?: boolean
          smart_keyword_detection?: boolean
          grammar_correction?: boolean
          custom_ai_instructions?: string | null
          default_export_format?: string
          default_include_cover_page?: boolean
          default_include_recruiter_details?: boolean
          default_email_template?: string | null
          email_notifications?: boolean
          processing_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          phone?: string | null
          job_title?: string | null
          bio?: string | null
          company_id?: string | null
          default_anonymize?: boolean
          default_section_visibility?: Json | null
          default_section_order?: Json | null
          default_ai_model?: string
          auto_optimize_upload?: boolean
          smart_keyword_detection?: boolean
          grammar_correction?: boolean
          custom_ai_instructions?: string | null
          default_export_format?: string
          default_include_cover_page?: boolean
          default_include_recruiter_details?: boolean
          default_email_template?: string | null
          email_notifications?: boolean
          processing_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      candidates: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          current_position: string | null
          current_company: string | null
          owner_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          current_position?: string | null
          current_company?: string | null
          owner_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          current_position?: string | null
          current_company?: string | null
          owner_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cvs: {
        Row: {
          id: string
          candidate_id: string
          uploader_id: string
          original_file_storage_path: string | null
          original_filename: string | null
          parsed_data: Json | null
          status: Database["public"]["Enums"]["cv_status"]
          error_message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          candidate_id: string
          uploader_id: string
          original_file_storage_path?: string | null
          original_filename?: string | null
          parsed_data?: Json | null
          status?: Database["public"]["Enums"]["cv_status"]
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          candidate_id?: string
          uploader_id?: string
          original_file_storage_path?: string | null
          original_filename?: string | null
          parsed_data?: Json | null
          status?: Database["public"]["Enums"]["cv_status"]
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cv_analysis_results: {
        Row: {
          id: string
          cv_id: string
          task_type: Database["public"]["Enums"]["analysis_task_type"]
          result_data: Json | null
          model_used: string | null
          jd_storage_path: string | null
          created_at: string
        }
        Insert: {
          id?: string
          cv_id: string
          task_type: Database["public"]["Enums"]["analysis_task_type"]
          result_data?: Json | null
          model_used?: string | null
          jd_storage_path?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          cv_id?: string
          task_type?: Database["public"]["Enums"]["analysis_task_type"]
          result_data?: Json | null
          model_used?: string | null
          jd_storage_path?: string | null
          created_at?: string
        }
      }
      generated_documents: {
        Row: {
          id: string
          cv_id: string
          generator_id: string
          generated_file_storage_path: string
          format: string
          template_style: string | null
          included_recruiter_branding: boolean | null
          included_cover_page: boolean | null
          client_logo_storage_path: string | null
          settings_snapshot: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          cv_id: string
          generator_id: string
          generated_file_storage_path: string
          format: string
          template_style?: string | null
          included_recruiter_branding?: boolean | null
          included_cover_page?: boolean | null
          client_logo_storage_path?: string | null
          settings_snapshot?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          cv_id?: string
          generator_id?: string
          generated_file_storage_path?: string
          format?: string
          template_style?: string | null
          included_recruiter_branding?: boolean | null
          included_cover_page?: boolean | null
          client_logo_storage_path?: string | null
          settings_snapshot?: Json | null
          created_at?: string
        }
      }
      cv_chats: {
        Row: {
          id: number
          cv_id: string
          user_id: string | null
          sender_type: Database["public"]["Enums"]["chat_sender_type"]
          message_text: string
          timestamp: string
        }
        Insert: {
          id?: number
          cv_id: string
          user_id?: string | null
          sender_type: Database["public"]["Enums"]["chat_sender_type"]
          message_text: string
          timestamp?: string
        }
        Update: {
          id?: number
          cv_id?: string
          user_id?: string | null
          sender_type?: Database["public"]["Enums"]["chat_sender_type"]
          message_text?: string
          timestamp?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cv_status: 'Uploaded' | 'Parsing' | 'Parsed' | 'Optimizing_PS' | 'Optimizing_CS' | 
        'Optimizing_KA' | 'Optimizing_Role' | 'Scoring' | 'OptimizationComplete' | 
        'Generating' | 'Generated' | 'Error'
      analysis_task_type: 'ps' | 'cs' | 'ka' | 'role' | 'scoring'
      chat_sender_type: 'user' | 'assistant'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
