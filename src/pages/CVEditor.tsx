import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Eye, FileDown, FileUp, MessageSquare, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CVEditor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upload");
  const [isUploading, setIsUploading] = useState(false);
  const [isAnonymized, setIsAnonymized] = useState(false);
  const [clientLogo, setClientLogo] = useState<string | null>(null);
  const [sectionVisibility, setSectionVisibility] = useState({
    personalDetails: true,
    profile: true,
    experience: true,
    education: true,
    skills: true,
    achievements: true
  });
  
  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setActiveTab("preview");
    }, 1500);
  };

  const toggleSectionVisibility = (section: string) => {
    setSectionVisibility({
      ...sectionVisibility,
      [section]: !sectionVisibility[section as keyof typeof sectionVisibility]
    });
  };

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
        
        <TabsContent value="upload" className="w-full">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center space-y-4 p-8">
              <div className="rounded-full p-4 bg-primary/10">
                <FileUp size={40} className="text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Upload a CV</h2>
              <p className="text-center text-muted-foreground mb-4">
                Drag and drop a CV file or click to browse
              </p>
              <div className="border-2 border-dashed rounded-lg p-12 w-full max-w-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="file" className="hidden" id="cv-upload" />
                <label htmlFor="cv-upload" className="cursor-pointer text-center">
                  <p className="font-medium">Click to browse</p>
                  <p className="text-sm text-muted-foreground mt-1">or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-4">Supported formats: PDF, DOCX, DOC</p>
                </label>
              </div>
              <Button className="mt-6" onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "Processing..." : "Upload & Process CV"}
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">John Smith</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye size={16} className="mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare size={16} className="mr-2" />
                      Edit with Chat
                    </Button>
                  </div>
                </div>

                {sectionVisibility.personalDetails && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">Personal Details</h3>
                      <Button variant="outline" size="sm">Optimize with AI</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={isAnonymized ? "[Redacted]" : "john.smith@example.com"} />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" defaultValue={isAnonymized ? "[Redacted]" : "+44 7700 900123"} />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue={isAnonymized ? "London" : "123 Main St, London, UK"} />
                      </div>
                      <div>
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input id="linkedin" defaultValue={isAnonymized ? "[Redacted]" : "linkedin.com/in/johnsmith"} />
                      </div>
                    </div>
                  </div>
                )}

                {sectionVisibility.profile && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">Profile</h3>
                      <Button variant="outline" size="sm">Optimize with AI</Button>
                    </div>
                    <Textarea defaultValue="Experienced software engineer with over 7 years of expertise in full-stack development. Specializing in React, Node.js, and cloud technologies. Proven track record of delivering high-quality web applications and mentoring junior developers." className="min-h-[120px]" />
                  </div>
                )}

                {sectionVisibility.experience && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">Experience</h3>
                      <Button variant="outline" size="sm">Optimize with AI</Button>
                    </div>
                    <div className="space-y-4">
                      <div className="border rounded-md p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                          <h4 className="font-medium">Senior Software Engineer</h4>
                          <p className="text-sm text-muted-foreground">Jan 2020 - Present</p>
                        </div>
                        <p className="text-muted-foreground">Tech Corporation Ltd, London</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                          <li>Led development of customer-facing portal with React and TypeScript</li>
                          <li>Reduced API response times by 40% through query optimization</li>
                          <li>Mentored junior developers and conducted code reviews</li>
                        </ul>
                      </div>
                      <div className="border rounded-md p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                          <h4 className="font-medium">Software Developer</h4>
                          <p className="text-sm text-muted-foreground">Mar 2017 - Dec 2019</p>
                        </div>
                        <p className="text-muted-foreground">StartUp Inc, Manchester</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                          <li>Developed and maintained frontend applications using React</li>
                          <li>Built RESTful APIs with Node.js and Express</li>
                          <li>Implemented automated testing with Jest and React Testing Library</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {sectionVisibility.skills && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">Skills</h3>
                      <Button variant="outline" size="sm">Optimize with AI</Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">React</div>
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">TypeScript</div>
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">Node.js</div>
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">GraphQL</div>
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">AWS</div>
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">CI/CD</div>
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">Docker</div>
                      <div className="bg-primary/10 px-3 py-1 rounded-full text-sm">MongoDB</div>
                    </div>
                  </div>
                )}

                {sectionVisibility.education && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">Education</h3>
                      <Button variant="outline" size="sm">Optimize with AI</Button>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h4 className="font-medium">BSc Computer Science</h4>
                        <p className="text-sm text-muted-foreground">2013 - 2017</p>
                      </div>
                      <p className="text-muted-foreground">University of Manchester</p>
                      <p className="text-sm mt-2">First Class Honours</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">CV Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Anonymize CV</h4>
                      <p className="text-sm text-muted-foreground">Hide personal contact details</p>
                    </div>
                    <Switch 
                      checked={isAnonymized} 
                      onCheckedChange={setIsAnonymized}
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
                          onCheckedChange={() => toggleSectionVisibility('personalDetails')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="toggle-profile">Profile</Label>
                        <Switch 
                          id="toggle-profile" 
                          checked={sectionVisibility.profile} 
                          onCheckedChange={() => toggleSectionVisibility('profile')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="toggle-experience">Experience</Label>
                        <Switch 
                          id="toggle-experience" 
                          checked={sectionVisibility.experience} 
                          onCheckedChange={() => toggleSectionVisibility('experience')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="toggle-skills">Skills</Label>
                        <Switch 
                          id="toggle-skills" 
                          checked={sectionVisibility.skills} 
                          onCheckedChange={() => toggleSectionVisibility('skills')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="toggle-education">Education</Label>
                        <Switch 
                          id="toggle-education" 
                          checked={sectionVisibility.education} 
                          onCheckedChange={() => toggleSectionVisibility('education')}
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
                        <div className="border rounded p-2 flex items-center justify-between bg-background cursor-move">
                          <span>Personal Details</span>
                          <div className="flex items-center gap-1">
                            <span>:::</span>
                          </div>
                        </div>
                      )}
                      {sectionVisibility.profile && (
                        <div className="border rounded p-2 flex items-center justify-between bg-background cursor-move">
                          <span>Profile</span>
                          <div className="flex items-center gap-1">
                            <span>:::</span>
                          </div>
                        </div>
                      )}
                      {sectionVisibility.experience && (
                        <div className="border rounded p-2 flex items-center justify-between bg-background cursor-move">
                          <span>Experience</span>
                          <div className="flex items-center gap-1">
                            <span>:::</span>
                          </div>
                        </div>
                      )}
                      {sectionVisibility.skills && (
                        <div className="border rounded p-2 flex items-center justify-between bg-background cursor-move">
                          <span>Skills</span>
                          <div className="flex items-center gap-1">
                            <span>:::</span>
                          </div>
                        </div>
                      )}
                      {sectionVisibility.education && (
                        <div className="border rounded p-2 flex items-center justify-between bg-background cursor-move">
                          <span>Education</span>
                          <div className="flex items-center gap-1">
                            <span>:::</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button onClick={() => setActiveTab("generate")} className="w-full">
                    Continue to Generate
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="generate">
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
                <Button variant="outline" className="flex-1" onClick={() => setActiveTab("preview")}>
                  Back to Preview
                </Button>
                <Button className="flex-1">
                  Generate Document
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CVEditor;
