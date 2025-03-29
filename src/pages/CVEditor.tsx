
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UploadTab from "@/components/cv/UploadTab";
import GenerateTab from "@/components/cv/GenerateTab";
import CVPreview from "@/components/cv/CVPreview";
import CVChat from "@/components/cv/CVChat";
import ChatButton from "@/components/cv/ChatButton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useDefaultCVSettings } from "@/hooks/useDefaultCVSettings";
import { CVSection } from "@/types/cv";

const CVEditor = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("upload");
  const [showChat, setShowChat] = useState(false);
  const [isAnonymized, setIsAnonymized] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState({
    personalDetails: true,
    profile: true,
    experience: true,
    education: true,
    skills: true,
    achievements: true,
    languages: true,
    certifications: true,
    professionalMemberships: true,
    earlierCareer: false,
    publications: true,
    addDetails: true
  });
  
  // Define the default order of sections
  const [sectionOrder, setSectionOrder] = useState([
    "personalDetails",
    "profile",
    "experience",
    "skills",
    "education",
    "achievements",
    "languages",
    "certifications",
    "professionalMemberships",
    "publications",
    "addDetails"
  ]);

  const { defaultSettings } = useDefaultCVSettings();
  
  useEffect(() => {
    // Apply default settings if available
    if (defaultSettings) {
      setIsAnonymized(defaultSettings.isAnonymized);
      setSectionVisibility(defaultSettings.sectionVisibility);
      setSectionOrder(defaultSettings.sectionOrder);
    }
  }, [defaultSettings]);
  
  const handleUploadComplete = () => {
    setCurrentStep("preview");
  };

  const toggleSectionVisibility = (section: string) => {
    setSectionVisibility({
      ...sectionVisibility,
      [section]: !sectionVisibility[section as keyof typeof sectionVisibility]
    });
  };

  const handleContinueToGenerate = () => {
    setCurrentStep("generate");
  };
  
  const toggleChat = () => {
    setShowChat(!showChat);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-3xl font-bold">CV Editor</h1>
      </div>

      <TooltipProvider>
        <div className="relative">
          {currentStep === "upload" && (
            <UploadTab onUploadComplete={handleUploadComplete} />
          )}
          
          {currentStep === "preview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-3">
                <Card className="p-6">
                  <CVPreview 
                    isAnonymized={isAnonymized}
                    sectionVisibility={sectionVisibility}
                    onContinueClick={handleContinueToGenerate}
                  />
                </Card>
              </div>
            </div>
          )}
          
          {currentStep === "generate" && (
            <GenerateTab 
              onBackClick={() => setCurrentStep("preview")}
              isAnonymized={isAnonymized}
              sectionVisibility={sectionVisibility}
              sectionOrder={sectionOrder}
              onAnonymizeChange={setIsAnonymized}
              onSectionVisibilityChange={toggleSectionVisibility}
              onSectionOrderChange={setSectionOrder}
            />
          )}
          
          {showChat && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={toggleChat}>
              <div onClick={(e) => e.stopPropagation()}>
                <CVChat onClose={toggleChat} />
              </div>
            </div>
          )}
          
          {currentStep === "preview" && !showChat && (
            <div className="fixed bottom-6 right-6 z-40">
              <ChatButton onClick={toggleChat} />
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
};

export default CVEditor;
