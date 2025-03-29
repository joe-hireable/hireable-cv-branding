
import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CVPreviewProps {
  isAnonymized: boolean;
  sectionVisibility: {
    personalDetails: boolean;
    profile: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    achievements: boolean;
  };
}

const CVPreview: React.FC<CVPreviewProps> = ({ 
  isAnonymized, 
  sectionVisibility 
}) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default CVPreview;
