
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import CVSectionItem from './CVSectionItem';
import { Save } from "lucide-react";
import { toast } from "sonner";
import { cvSectionLabels } from "./CVSectionLabels";
import { SectionVisibilityType, DefaultCVSettings } from "@/hooks/useDefaultCVSettings";

interface CVSettingsTabProps {
  isAnonymized: boolean;
  sectionVisibility: SectionVisibilityType;
  sectionOrder: string[];
  onAnonymizeChange: (checked: boolean) => void;
  onSectionVisibilityChange: (section: string) => void;
  onSectionOrderChange: (newOrder: string[]) => void;
  saveDefaultSettings: (settings: DefaultCVSettings) => void;
}

const CVSettingsTab: React.FC<CVSettingsTabProps> = ({
  isAnonymized,
  sectionVisibility,
  sectionOrder,
  onAnonymizeChange,
  onSectionVisibilityChange,
  onSectionOrderChange,
  saveDefaultSettings
}) => {
  const handleSaveDefaults = () => {
    saveDefaultSettings({
      isAnonymized,
      sectionVisibility,
      sectionOrder
    });
    toast.success("Default CV settings saved successfully");
  };
  
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    const newSectionOrder = Array.from(sectionOrder);
    const [movedSection] = newSectionOrder.splice(source.index, 1);
    newSectionOrder.splice(destination.index, 0, movedSection);
    
    onSectionOrderChange(newSectionOrder);
  };

  return (
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
            {Object.entries(cvSectionLabels).map(([key, label]) => (
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
                    if (sectionVisibility[section as keyof typeof sectionVisibility]) {
                      return (
                        <Draggable key={section} draggableId={section} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <CVSectionItem 
                                title={cvSectionLabels[section] || section.charAt(0).toUpperCase() + section.slice(1)} 
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

        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2" 
          onClick={handleSaveDefaults}
        >
          <Save size={16} />
          Save as Default Settings
        </Button>
      </div>
    </div>
  );
};

export default CVSettingsTab;
