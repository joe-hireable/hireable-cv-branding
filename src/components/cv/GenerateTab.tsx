
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FileDown, FileUp, ChevronDown, ChevronUp } from "lucide-react";
import CVSectionItem from './CVSectionItem';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CVSection } from "@/types/cv";

interface GenerateTabProps {
  onBackClick: () => void;
  isAnonymized: boolean;
  sectionVisibility: {
    personalDetails: boolean;
    profile: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    achievements: boolean;
  };
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
  const [clientLogo, setClientLogo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("export-options");
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);

  const handleClientLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setClientLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    
    // If there's no destination or the item is dropped in the same place, do nothing
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    // Create a new array with the updated order
    const newSectionOrder = Array.from(sectionOrder);
    const [movedSection] = newSectionOrder.splice(source.index, 1);
    newSectionOrder.splice(destination.index, 0, movedSection);
    
    // Update the state with the new order
    onSectionOrderChange(newSectionOrder);
  };

  // CV sections from data model
  const cvSections: Record<string, string> = {
    personalDetails: "Personal Details",
    profileStatement: "Profile",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    achievements: "Achievements",
    languages: "Languages",
    certifications: "Certifications",
    professionalMemberships: "Professional Memberships",
    earlierCareer: "Earlier Career",
    publications: "Publications",
    addDetails: "Additional Details"
  };

  return (
    <Card className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="export-options">Export Options</TabsTrigger>
          <TabsTrigger value="cv-settings">CV Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="export-options">
          <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto py-4">
            <div className="rounded-full p-4 bg-primary/10">
              <FileDown size={40} className="text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Generate CV Document</h2>
            <p className="text-center text-muted-foreground">
              Your CV is ready to be generated with your branding.
            </p>
            
            <div className="w-full space-y-4 border rounded-lg p-6">
              <div>
                <Label htmlFor="format">Output Format</Label>
                <select id="format" className="w-full rounded-md border border-input px-3 py-2 mt-1">
                  <option value="pdf">PDF Document</option>
                  <option value="docx">Word Document (.docx)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="template">Template Style</Label>
                <select id="template" className="w-full rounded-md border border-input px-3 py-2 mt-1">
                  <option value="professional">Professional</option>
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Include Recruiter Branding</h4>
                  <p className="text-sm text-muted-foreground">Add your company logo and details</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Include Cover Page</h4>
                  <p className="text-sm text-muted-foreground">Add a branded cover page</p>
                </div>
                <Switch defaultChecked={false} />
              </div>

              <Separator className="my-2" />
              
              <Collapsible
                open={isVisibilityOpen}
                onOpenChange={setIsVisibilityOpen}
                className="w-full border rounded-md p-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Edit Section Visibility</h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                      {isVisibilityOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-2 space-y-2">
                  {Object.entries(cvSections).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between py-1">
                      <Label htmlFor={`toggle-${key}`} className="text-sm">{label}</Label>
                      <Switch 
                        id={`toggle-${key}`} 
                        checked={sectionVisibility[key as keyof typeof sectionVisibility]} 
                        onCheckedChange={() => onSectionVisibilityChange(key)}
                      />
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              <Separator className="my-2" />
              
              <div>
                <Label htmlFor="client-logo" className="mb-2 block">Client Company Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  {clientLogo ? (
                    <div className="flex flex-col items-center gap-2">
                      <img 
                        src={clientLogo} 
                        alt="Client logo" 
                        className="w-32 h-32 object-contain mb-2" 
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setClientLogo(null)}
                      >
                        Remove Logo
                      </Button>
                    </div>
                  ) : (
                    <>
                      <input 
                        type="file" 
                        className="hidden" 
                        id="client-logo" 
                        accept="image/*"
                        onChange={handleClientLogoUpload}
                      />
                      <label htmlFor="client-logo" className="cursor-pointer flex flex-col items-center">
                        <FileUp size={24} className="mb-2 text-muted-foreground" />
                        <span className="text-sm font-medium">Upload Client Logo</span>
                        <span className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG (max 2MB)</span>
                      </label>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This logo will be used for branding the CV for this specific client
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="cv-settings">
          <div className="max-w-md mx-auto py-4">
            <h3 className="text-lg font-medium mb-4">CV Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Anonymize CV</h4>
                  <p className="text-sm text-muted-foreground">Hide personal contact details</p>
                </div>
                <Switch 
                  checked={isAnonymized} 
                  onCheckedChange={onAnonymizeChange}
                />
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Section Visibility</h4>
                <div className="space-y-2">
                  {Object.entries(cvSections).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between">
                      <Label htmlFor={`toggle-settings-${key}`}>{label}</Label>
                      <Switch 
                        id={`toggle-settings-${key}`} 
                        checked={sectionVisibility[key as keyof typeof sectionVisibility]} 
                        onCheckedChange={() => onSectionVisibilityChange(key)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Section Order</h4>
                <p className="text-sm text-muted-foreground mb-2">Drag sections to reorder</p>
                
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {sectionOrder.map((section, index) => {
                          // Only render visible sections
                          if (sectionVisibility[section as keyof typeof sectionVisibility]) {
                            return (
                              <Draggable key={section} draggableId={section} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <CVSectionItem 
                                      title={cvSections[section] || section.charAt(0).toUpperCase() + section.slice(1)} 
                                      isDragging={snapshot.isDragging}
                                      dragHandleProps={provided.dragHandleProps}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            );
                          }
                          return null;
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex gap-4 w-full max-w-md mx-auto mt-8">
        <Button variant="outline" className="flex-1" onClick={onBackClick}>
          Back to Preview
        </Button>
        <Button className="flex-1">
          Generate Document
        </Button>
      </div>
    </Card>
  );
};

export default GenerateTab;
