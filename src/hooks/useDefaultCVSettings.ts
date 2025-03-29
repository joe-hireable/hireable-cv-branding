
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { updateDefaultCVSettings } from '@/services/profileService';

// Define a specific type for sectionVisibility that matches the structure in CVEditor.tsx
export interface SectionVisibilityType {
  personalDetails: boolean;
  profile: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
  achievements: boolean;
  languages: boolean;
  certifications: boolean;
  professionalMemberships: boolean;
  earlierCareer: boolean;
  publications: boolean;
  addDetails: boolean;
  [key: string]: boolean; // Index signature to allow accessing by string key
}

export interface DefaultCVSettings {
  isAnonymized: boolean;
  sectionVisibility: SectionVisibilityType;
  sectionOrder: string[];
}

interface ApplySettingsOptions {
  isAnonymized: boolean;
  sectionVisibility: SectionVisibilityType;
  sectionOrder: string[];
  onAnonymizeChange: (value: boolean) => void;
  onSectionVisibilityChange: (section: string) => void;
  onSectionOrderChange: (newOrder: string[]) => void;
}

export function useDefaultCVSettings() {
  const [defaultSettings, setDefaultSettings] = useState<DefaultCVSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load default settings from Supabase on mount
    const loadDefaultSettings = async () => {
      try {
        const user = await supabase.auth.getUser();
        
        if (user.data.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('default_anonymize, default_section_visibility, default_section_order')
            .eq('id', user.data.user.id)
            .single();
          
          if (error) throw error;
          
          if (data) {
            // Check if we have stored settings in Supabase
            if (data.default_section_visibility && data.default_section_order) {
              setDefaultSettings({
                isAnonymized: data.default_anonymize || false,
                sectionVisibility: data.default_section_visibility as SectionVisibilityType,
                sectionOrder: data.default_section_order as string[]
              });
            } else {
              // Fall back to localStorage if Supabase doesn't have settings yet
              loadFromLocalStorage();
            }
          }
        } else {
          // Not logged in, use localStorage
          loadFromLocalStorage();
        }
      } catch (error) {
        console.error('Failed to load default CV settings from Supabase:', error);
        loadFromLocalStorage();
      } finally {
        setIsLoading(false);
      }
    };

    const loadFromLocalStorage = () => {
      try {
        const savedSettings = localStorage.getItem('cv-default-settings');
        if (savedSettings) {
          setDefaultSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error('Failed to load default CV settings from localStorage:', error);
      }
    };

    loadDefaultSettings();
  }, []);

  const saveDefaultSettings = async (settings: DefaultCVSettings) => {
    try {
      // Save to localStorage as a fallback
      localStorage.setItem('cv-default-settings', JSON.stringify(settings));
      
      // Save to Supabase if logged in
      const user = await supabase.auth.getUser();
      
      if (user.data.user) {
        const { error } = await updateDefaultCVSettings({
          default_anonymize: settings.isAnonymized,
          default_section_visibility: settings.sectionVisibility,
          default_section_order: settings.sectionOrder
        });
        
        if (error) throw error;
      }
      
      setDefaultSettings(settings);
    } catch (error) {
      console.error('Failed to save default CV settings:', error);
      toast.error('Failed to save default settings');
    }
  };

  const applyDefaultSettings = (options: ApplySettingsOptions) => {
    if (!defaultSettings) return;

    // Apply default anonymization setting
    if (options.isAnonymized !== defaultSettings.isAnonymized) {
      options.onAnonymizeChange(defaultSettings.isAnonymized);
    }

    // Apply default section visibility settings
    Object.entries(defaultSettings.sectionVisibility).forEach(([key, value]) => {
      if (options.sectionVisibility[key] !== value) {
        options.onSectionVisibilityChange(key);
      }
    });

    // Apply default section order
    if (JSON.stringify(options.sectionOrder) !== JSON.stringify(defaultSettings.sectionOrder)) {
      options.onSectionOrderChange([...defaultSettings.sectionOrder]);
    }
  };

  return {
    defaultSettings,
    isLoading,
    saveDefaultSettings,
    applyDefaultSettings
  };
}
