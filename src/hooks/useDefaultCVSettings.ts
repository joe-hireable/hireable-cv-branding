
import { useState, useEffect } from 'react';

export interface DefaultCVSettings {
  isAnonymized: boolean;
  sectionVisibility: Record<string, boolean>;
  sectionOrder: string[];
}

interface ApplySettingsOptions {
  isAnonymized: boolean;
  sectionVisibility: Record<string, boolean>;
  sectionOrder: string[];
  onAnonymizeChange: (value: boolean) => void;
  onSectionVisibilityChange: (section: string) => void;
  onSectionOrderChange: (newOrder: string[]) => void;
}

export function useDefaultCVSettings() {
  const [defaultSettings, setDefaultSettings] = useState<DefaultCVSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load default settings from localStorage on mount
    const loadDefaultSettings = () => {
      try {
        const savedSettings = localStorage.getItem('cv-default-settings');
        if (savedSettings) {
          setDefaultSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error('Failed to load default CV settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDefaultSettings();
  }, []);

  const saveDefaultSettings = (settings: DefaultCVSettings) => {
    try {
      localStorage.setItem('cv-default-settings', JSON.stringify(settings));
      setDefaultSettings(settings);
    } catch (error) {
      console.error('Failed to save default CV settings:', error);
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
