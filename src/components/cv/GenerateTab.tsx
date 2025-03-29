
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { FileDown, FileUp } from "lucide-react";

interface GenerateTabProps {
  onBackClick: () => void;
}

const GenerateTab: React.FC<GenerateTabProps> = ({ onBackClick }) => {
  const [clientLogo, setClientLogo] = useState<string | null>(null);

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

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-center space-y-6 max-w-md mx-auto py-8">
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
        
        <div className="flex gap-4 w-full">
          <Button variant="outline" className="flex-1" onClick={onBackClick}>
            Back to Preview
          </Button>
          <Button className="flex-1">
            Generate Document
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GenerateTab;
