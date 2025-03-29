
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UploadTab from "@/components/cv/UploadTab";
import GenerateTab from "@/components/cv/GenerateTab";
import CVPreview from "@/components/cv/CVPreview";
import CVSettings from "@/components/cv/CVSettings";

const CVEditor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upload");
  const [isAnonymized, setIsAnonymized] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState({
    personalDetails: true,
    profile: true,
    experience: true,
    education: true,
    skills: true,
    achievements: true
  });
  
  const handleUploadComplete = () => {
    setActiveTab("preview");
  };

  const toggleSectionVisibility = (section: string) => {
    setSectionVisibility({
      ...sectionVisibility,
      [section]: !sectionVisibility[section as keyof typeof sectionVisibility]
    });
  };

  const handleContinueToGenerate = () => {
    setActiveTab("generate");
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-3xl font-bold">CV Editor</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="preview">Preview & Edit</TabsTrigger>
          <TabsTrigger value="generate">Generate & Export</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <UploadTab onUploadComplete={handleUploadComplete} />
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="p-6">
                <CVPreview 
                  isAnonymized={isAnonymized}
                  sectionVisibility={sectionVisibility}
                />
              </Card>
            </div>
            
            <div>
              <Card className="p-6">
                <CVSettings
                  isAnonymized={isAnonymized}
                  sectionVisibility={sectionVisibility}
                  onAnonymizeChange={setIsAnonymized}
                  onSectionVisibilityChange={toggleSectionVisibility}
                  onContinueClick={handleContinueToGenerate}
                />
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="generate">
          <GenerateTab onBackClick={() => setActiveTab("preview")} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CVEditor;
