
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AI Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="ai-model">Default AI Model</Label>
              <select id="ai-model" className="w-full rounded-md border border-input px-3 py-2">
                <option value="balanced">Balanced (Recommended)</option>
                <option value="creative">Creative</option>
                <option value="precise">Precise</option>
              </select>
              <p className="text-sm text-muted-foreground">Select which AI model is used for CV optimization by default</p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="font-medium">AI Optimization Settings</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-optimize on upload</h4>
                  <p className="text-sm text-muted-foreground">Automatically run AI optimization when CV is uploaded</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Smart keyword detection</h4>
                  <p className="text-sm text-muted-foreground">Use AI to extract and highlight important keywords</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Grammar correction</h4>
                  <p className="text-sm text-muted-foreground">Automatically fix grammar and spelling errors</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label htmlFor="custom-instructions">Custom AI Instructions</Label>
              <Textarea id="custom-instructions" className="min-h-[120px]" placeholder="Enter any custom instructions for the AI when optimizing CVs..." />
              <p className="text-sm text-muted-foreground mt-1">These instructions will be used as additional guidance for AI optimization</p>
            </div>
            
            <Button>
              <Save size={16} className="mr-2" />
              Save AI Settings
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Document Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="default-format">Default Export Format</Label>
              <select id="default-format" className="w-full rounded-md border border-input px-3 py-2">
                <option value="pdf">PDF Document</option>
                <option value="docx">Word Document (.docx)</option>
              </select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Include cover page</h4>
                <p className="text-sm text-muted-foreground">Add a professional cover page to exported CVs</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Include recruiter details</h4>
                <p className="text-sm text-muted-foreground">Add your contact information to the CV footer</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div>
              <Label htmlFor="default-email">Default Email Template</Label>
              <Textarea id="default-email" className="min-h-[120px]" defaultValue="Dear [Client Name],

I'm pleased to submit [Candidate Name]'s CV for the [Position] role. With [X years] of relevant experience, they have the skills and background that match your requirements.

Key highlights include:
- [Highlight 1]
- [Highlight 2]
- [Highlight 3]

Please let me know if you'd like to schedule an interview or need any additional information.

Best regards,
[Your Name]" />
            </div>
            
            <Button>
              <Save size={16} className="mr-2" />
              Save Document Settings
            </Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email-settings">Email Address</Label>
                <Input id="email-settings" type="email" defaultValue="jane.doe@recruitmentfirm.com" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" defaultValue="********" />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="font-medium">Notification Settings</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive email alerts for important updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Processing notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications when CV processing completes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <Button>
              <Save size={16} className="mr-2" />
              Save Account Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
