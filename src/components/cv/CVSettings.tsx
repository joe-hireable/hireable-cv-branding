import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CVSectionItem from './CVSectionItem';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { SectionVisibilityType } from "@/hooks/useDefaultCVSettings";

interface CVSettingsProps {
  isAnonymized: boolean;
  sectionVisibility: SectionVisibilityType;
  onAnonymizeChange: (checked: boolean) => void;
  onSectionVisibilityChange: (section: string) => void;
  onContinueClick: () => void;
  sectionOrder: string[];
  onSectionOrderChange: (newOrder: string[]) => void;
}

const CVSettings: React.FC<CVSettingsProps> = ({
  isAnonymized,
  sectionVisibility,
  onAnonymizeChange,
  onSectionVisibilityChange,
  onContinueClick,
  sectionOrder,
  onSectionOrderChange
}) => {
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

  return (
    <div>
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
            <div className="flex items-center justify-between">
              <Label htmlFor="toggle-personal">Personal Details</Label>
              <Switch 
                id="toggle-personal" 
                checked={sectionVisibility.personalDetails} 
                onCheckedChange={() => onSectionVisibilityChange('personalDetails')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="toggle-profile">Profile</Label>
              <Switch 
                id="toggle-profile" 
                checked={sectionVisibility.profile} 
                onCheckedChange={() => onSectionVisibilityChange('profile')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="toggle-experience">Experience</Label>
              <Switch 
                id="toggle-experience" 
                checked={sectionVisibility.experience} 
                onCheckedChange={() => onSectionVisibilityChange('experience')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="toggle-skills">Skills</Label>
              <Switch 
                id="toggle-skills" 
                checked={sectionVisibility.skills} 
                onCheckedChange={() => onSectionVisibilityChange('skills')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="toggle-education">Education</Label>
              <Switch 
                id="toggle-education" 
                checked={sectionVisibility.education} 
                onCheckedChange={() => onSectionVisibilityChange('education')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="toggle-achievements">Achievements</Label>
              <Switch 
                id="toggle-achievements" 
                checked={sectionVisibility.achievements} 
                onCheckedChange={() => onSectionVisibilityChange('achievements')}
              />
            </div>
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
                                title={section.charAt(0).toUpperCase() + section.slice(1)} 
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
      
      <div className="mt-6">
        <Button onClick={onContinueClick} className="w-full">
          Continue to Generate
        </Button>
      </div>
    </div>
  );
};

export default CVSettings;
