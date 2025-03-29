import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParsedCVData } from '@/types/cv';

interface CVPreviewProps {
  cvData: ParsedCVData | null;
  isAnonymized: boolean;
  sectionVisibility: {
    personalDetails: boolean;
    profile: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    achievements: boolean;
    languages?: boolean;
    certifications?: boolean;
    professionalMemberships?: boolean;
    earlierCareer?: boolean;
    publications?: boolean;
    addDetails?: boolean;
    [key: string]: boolean | undefined;
  };
  onContinueClick: () => void;
}

const CVPreview: React.FC<CVPreviewProps> = ({ 
  cvData,
  isAnonymized, 
  sectionVisibility,
  onContinueClick
}) => {

  if (!cvData) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading CV data...</span>
      </div>
    );
  }

  const displayValue = (value: string | null | undefined) => {
    return isAnonymized ? "[Redacted]" : value || "N/A";
  };

  const fullName = `${cvData.firstName || ''} ${cvData.surname || ''}`.trim() || "CV Preview";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{displayValue(fullName)}</h2>
        <div className="flex items-center gap-2">
        </div>
      </div>

      {sectionVisibility.personalDetails && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Personal Details</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={displayValue(cvData.email)} readOnly />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={displayValue(cvData.phone)} readOnly />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={displayValue(cvData.location ? `${cvData.location.city || ''}, ${cvData.location.country || ''}`.trim().replace(/^,|,$/g, '') : null)} readOnly />
            </div>
            {cvData.links && cvData.links.length > 0 && (
              <div>
                <Label htmlFor="link-0">Link</Label>
                <Input id="link-0" value={displayValue(cvData.links[0])} readOnly />
              </div>
            )}
          </div>
        </div>
      )}

      {sectionVisibility.profile && cvData.profileStatement && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Profile</h3>
          </div>
          <Textarea value={cvData.profileStatement} readOnly className="min-h-[120px] bg-muted/30" />
        </div>
      )}

      {sectionVisibility.experience && cvData.experience && cvData.experience.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Experience</h3>
          </div>
          <div className="space-y-4">
            {cvData.experience.map((exp, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <h4 className="font-medium">{exp.company || '[Company Missing]'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {exp.start || '?'} - {exp.current ? 'Present' : (exp.end || '?')}
                  </p>
                </div>
                {exp.summary && <p className="text-sm mb-2">{exp.summary}</p>}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    {exp.highlights.map((hl, hlIndex) => (
                      <li key={hlIndex}>{hl}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {sectionVisibility.skills && cvData.skills && cvData.skills.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <div key={index} className="bg-primary/10 px-3 py-1 rounded-full text-sm">
                {skill.name} {skill.proficiency ? `(${skill.proficiency})` : ''}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Education Section --- */}
      {sectionVisibility.education && cvData.education && cvData.education.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Education</h3>
          </div>
          <div className="space-y-4">
            {cvData.education.map((edu: any, index) => (
              <div key={index} className="border rounded-md p-4">
                {/* TODO: Improve rendering once specific education structure in ParsedCVData is known */}
                {edu.institution && <h4 className="font-medium">{edu.institution}</h4>}
                {edu.qualifications && Array.isArray(edu.qualifications) && edu.qualifications.map((q: any, qIndex: number) => (
                  <div key={qIndex} className="mt-1 ml-2">
                    <p className="text-sm">{q.course || 'Course N/A'} {q.qualification && `(${q.qualification})`}</p>
                    <p className="text-xs text-muted-foreground">
                      {q.start && q.end ? `${q.start} - ${q.end}` : (q.start || q.end || 'Date N/A')}
                      {q.grade && ` - ${q.grade}`}
                    </p>
                  </div>
                ))}
                {!edu.institution && !edu.qualifications && 
                  <pre className="text-xs bg-muted/20 p-2 rounded">{JSON.stringify(edu, null, 2)}</pre>
                }
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* --- Languages Section --- */}
      {sectionVisibility.languages && cvData.languages && cvData.languages.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cvData.languages.map((lang: any, index) => (
              <div key={index} className="bg-primary/10 px-3 py-1 rounded-full text-sm">
                {typeof lang === 'string' ? lang : `${lang.name || 'N/A'}${lang.level ? ` (${lang.level})` : ''}`}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Certifications Section --- */}
      {sectionVisibility.certifications && cvData.certifications && cvData.certifications.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Certifications</h3>
          </div>
          <div className="space-y-2">
            {cvData.certifications.map((cert: any, index) => (
              <div key={index} className="border rounded-md p-3">
                 {/* TODO: Improve rendering once specific certification structure in ParsedCVData is known */}
                <h4 className="font-medium">{cert.name || 'Certification Name N/A'}</h4>
                {(cert.issuer || cert.date) && (
                  <p className="text-sm text-muted-foreground">
                    {cert.issuer || ''}{cert.issuer && cert.date ? ', ' : ''}{cert.date || ''}
                  </p>
                )}
                 {!cert.name && !cert.issuer && !cert.date && 
                  <pre className="text-xs bg-muted/20 p-2 rounded">{JSON.stringify(cert, null, 2)}</pre>
                }
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Professional Memberships Section --- */}
      {sectionVisibility.professionalMemberships && cvData.professionalMemberships && cvData.professionalMemberships.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Professional Memberships</h3>
          </div>
          <div className="space-y-2">
            {cvData.professionalMemberships.map((mem: any, index) => (
              <div key={index} className="border rounded-md p-3">
                {/* TODO: Improve rendering once specific membership structure in ParsedCVData is known */}
                <h4 className="font-medium">{mem.institution || 'Institution N/A'}</h4>
                {mem.name && <p className="text-sm text-muted-foreground">{mem.name}</p>}
                 {!mem.institution && !mem.name && 
                  <pre className="text-xs bg-muted/20 p-2 rounded">{JSON.stringify(mem, null, 2)}</pre>
                }
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Earlier Career Section --- */}
      {sectionVisibility.earlierCareer && cvData.earlierCareer && cvData.earlierCareer.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Earlier Career</h3>
          </div>
          <div className="space-y-4">
            {cvData.earlierCareer.map((ec: any, index) => (
              <div key={index} className="border rounded-md p-4">
                {/* TODO: Improve rendering once specific earlier career structure in ParsedCVData is known */}
                 <h4 className="font-medium">{ec.company || 'Company N/A'}</h4>
                 {(ec.start || ec.end) && (
                    <p className="text-sm text-muted-foreground mb-1">
                      {ec.start || '?'} - {ec.end || '?'}
                    </p>
                 )}
                 {ec.roles && Array.isArray(ec.roles) && (
                   <ul className="list-disc list-inside mt-1 space-y-1 text-sm ml-4">
                     {ec.roles.map((role: any, rIndex: number) => (
                       <li key={rIndex}>{role.title || 'Role Title N/A'}</li>
                     ))}
                   </ul>
                 )}
                 {!ec.company && !ec.roles && 
                  <pre className="text-xs bg-muted/20 p-2 rounded">{JSON.stringify(ec, null, 2)}</pre>
                 }
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Publications Section --- */}
      {sectionVisibility.publications && cvData.publications && cvData.publications.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Publications</h3>
          </div>
          <div className="space-y-2">
            {cvData.publications.map((pub: any, index) => (
              <div key={index} className="border rounded-md p-3">
                {/* TODO: Improve rendering once specific publication structure in ParsedCVData is known */}
                <h4 className="font-medium">{pub.title || 'Title N/A'}</h4>
                {(pub.pubType || pub.date) && (
                  <p className="text-sm text-muted-foreground">
                     {pub.pubType || ''}{pub.pubType && pub.date ? ', ' : ''}{pub.date || ''}
                  </p>
                )}
                {!pub.title && !pub.pubType && !pub.date &&
                  <pre className="text-xs bg-muted/20 p-2 rounded">{JSON.stringify(pub, null, 2)}</pre>
                }
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- Additional Details Section --- */}
      {sectionVisibility.addDetails && cvData.addDetails && cvData.addDetails.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Additional Details</h3>
          </div>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {cvData.addDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* --- Achievements Section (Moved down for logical flow) --- */}
      {sectionVisibility.achievements && cvData.achievements && cvData.achievements.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Achievements</h3>
          </div>
          <ul className="list-disc list-inside space-y-1 text-sm">
            {cvData.achievements.map((ach, index) => (
              <li key={index}>{ach}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end mt-8">
        <Button onClick={onContinueClick} size="lg" disabled={!cvData}>
          Continue to Generate & Export
        </Button>
      </div>
    </div>
  );
};

export default CVPreview;
