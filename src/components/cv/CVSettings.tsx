
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CVSectionItem from './CVSectionItem';

interface CVSettingsProps {
  isAnonymized: boolean;
  sectionVisibility: {
    personalDetails: boolean;
    profile: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    achievements: boolean;
  };
  onAnonymizeChange: (checked: boolean) => void;
  onSectionVisibilityChange: (section: string) => void;
  onContinueClick: () => void;
}

const CVSettings: React.FC<CVSettingsProps> = ({
  isAnonymized,
  sectionVisibility,
  onAnonymizeChange,
  onSectionVisibilityChange,
  onContinueClick
}) => {
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
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="font-medium mb-2">Section Order</h4>
          <p className="text-sm text-muted-foreground mb-2">Drag sections to reorder</p>
          <div className="space-y-2">
            {sectionVisibility.personalDetails && (
              <CVSectionItem title="Personal Details" />
            )}
            {sectionVisibility.profile && (
              <CVSectionItem title="Profile" />
            )}
            {sectionVisibility.experience && (
              <CVSectionItem title="Experience" />
            )}
            {sectionVisibility.skills && (
              <CVSectionItem title="Skills" />
            )}
            {sectionVisibility.education && (
              <CVSectionItem title="Education" />
            )}
          </div>
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
