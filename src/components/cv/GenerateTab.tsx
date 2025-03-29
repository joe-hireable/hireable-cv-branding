
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDefaultCVSettings, SectionVisibilityType } from "@/hooks/useDefaultCVSettings";
import ExportOptionsTab from "./ExportOptionsTab";
import CVSettingsTab from "./CVSettingsTab";

interface GenerateTabProps {
  onBackClick: () => void;
  isAnonymized: boolean;
  sectionVisibility: SectionVisibilityType;
  sectionOrder: string[];
  onAnonymizeChange: (checked: boolean) => void;
  onSectionVisibilityChange: (section: string) => void;
  onSectionOrderChange: (newOrder: string[]) => void;
}

const GenerateTab: React.FC<GenerateTabProps> = ({ 
  onBackClick,
  isAnonymized,
  sectionVisibility,
  sectionOrder,
  onAnonymizeChange,
  onSectionVisibilityChange,
  onSectionOrderChange
}) => {
  const [activeTab, setActiveTab] = useState("export-options");
  const { defaultSettings, saveDefaultSettings, applyDefaultSettings } = useDefaultCVSettings();

  useEffect(() => {
    if (defaultSettings) {
      applyDefaultSettings({
        isAnonymized,
        sectionVisibility,
        sectionOrder,
        onAnonymizeChange,
        onSectionVisibilityChange,
        onSectionOrderChange
      });
    }
  }, [defaultSettings]);

  return (
    <Card className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="export-options">Export Options</TabsTrigger>
          <TabsTrigger value="cv-settings">CV Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="export-options">
          <ExportOptionsTab 
            isAnonymized={isAnonymized}
            sectionVisibility={sectionVisibility}
            onSectionVisibilityChange={onSectionVisibilityChange}
          />
        </TabsContent>
        
        <TabsContent value="cv-settings">
          <CVSettingsTab 
            isAnonymized={isAnonymized}
            sectionVisibility={sectionVisibility}
            sectionOrder={sectionOrder}
            onAnonymizeChange={onAnonymizeChange}
            onSectionVisibilityChange={onSectionVisibilityChange}
            onSectionOrderChange={onSectionOrderChange}
            saveDefaultSettings={saveDefaultSettings}
          />
        </TabsContent>
      </Tabs>
      
      <div className="flex gap-4 w-full max-w-md mx-auto mt-8">
        <Button variant="outline" className="flex-1" onClick={onBackClick}>
          Back to Preview
        </Button>
        <Button className="flex-1 flex items-center justify-center gap-2">
          <FileDown size={16} />
          Generate Document
        </Button>
      </div>
    </Card>
  );
};

export default GenerateTab;
