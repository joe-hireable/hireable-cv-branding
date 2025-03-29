
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, FileUp, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-3xl font-bold">Recruiter Profile</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Jane" />
                </div>
                <div>
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="jane.doe@recruitmentfirm.com" />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+44 7700 900000" />
              </div>
              
              <div>
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" defaultValue="Senior Recruiter" />
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" className="min-h-[120px]" defaultValue="Experienced recruiter with over 5 years in tech talent acquisition. Specialized in placing software engineers, product managers and UX/UI designers with leading tech companies and startups." />
              </div>
              
              <Button className="w-full md:w-auto">
                <Save size={16} className="mr-2" />
                Save Personal Information
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="TechTalent Recruiters" />
              </div>
              
              <div>
                <Label htmlFor="company-website">Company Website</Label>
                <Input id="company-website" defaultValue="https://techtalentrecruiters.com" />
              </div>
              
              <div>
                <Label htmlFor="company-address">Company Address</Label>
                <Textarea id="company-address" defaultValue="123 Recruitment Street, London, SW1A 1AA" />
              </div>
              
              <div>
                <Label htmlFor="company-description">Company Description</Label>
                <Textarea id="company-description" className="min-h-[120px]" defaultValue="TechTalent Recruiters is a specialized recruitment agency focused on connecting top tech talent with innovative companies. We provide personalized recruitment services and career guidance for tech professionals." />
              </div>
              
              <Button className="w-full md:w-auto">
                <Save size={16} className="mr-2" />
                Save Company Details
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="color-scheme" className="mb-2 block">Brand Color</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="w-full aspect-square bg-purple-600 rounded-md cursor-pointer ring-2 ring-offset-2 ring-primary"></div>
                  <div className="w-full aspect-square bg-blue-600 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-green-600 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-red-600 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-orange-600 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-pink-600 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square gradient-bg rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-gradient-to-br from-blue-500 to-green-500 rounded-md cursor-pointer"></div>
                  <div className="w-full aspect-square bg-slate-800 rounded-md cursor-pointer"></div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label htmlFor="logo" className="mb-2 block">Company Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <img src="/lovable-uploads/192b4687-e714-4d45-a184-90b8183ee8a8.png" alt="Hireable logo" className="w-24 h-24 object-contain mb-4" />
                  <input type="file" className="hidden" id="logo" />
                  <label htmlFor="logo" className="cursor-pointer flex items-center">
                    <FileUp size={16} className="mr-2" />
                    <span>Upload New Logo</span>
                  </label>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label htmlFor="cv-template" className="mb-2 block">Default CV Template</Label>
                <select id="cv-template" className="w-full rounded-md border border-input px-3 py-2">
                  <option value="professional">Professional</option>
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
              
              <Button className="w-full">Save Branding Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
