// CV Data Model based on the provided schema
export interface CVLink {
  title: string | null;
  url: string | null;
}

export interface CVLocation {
  city: string | null;
  country: string | null;
  postalCode?: string | null;
}

export interface CVSkill {
  name: string;
  proficiency: "Beginner" | "Average" | "Intermediate" | "Advanced" | "Expert";
  skillType: "hard" | "soft";
}

export interface CVLanguage {
  name: string;
  level: "Native" | "Fluent" | "Advanced" | "Intermediate" | "Basic" | null;
}

export interface CVExperience {
  company: string;
  title?: string;
  start: string | null; // YYYY-MM or YYYY
  end: string | null; // YYYY-MM or YYYY
  current: boolean;
  summary: string | null;
  highlights: string[] | null;
}

export interface CVQualification {
  qualification: string | null; // e.g., "Bachelor's", "Master's"
  course: string;
  start: string | null;
  end: string | null;
  grade: string | null;
}

export interface CVEducation {
  institution: string;
  location: CVLocation | null;
  qualifications: CVQualification[] | null;
}

export interface CVCertification {
  name: string;
  issuer: string | null;
  date: string | null; // YYYY or YYYY-MM
}

export interface CVMembership {
  institution: string;
  name: string; // Type/level of membership
}

export interface CVRole {
  title: string;
  start: string | null;
  end: string | null;
}

export interface CVEarlierCareer {
  company: string;
  start: string | null;
  end: string | null;
  roles: CVRole[];
}

export interface CVPublication {
  pubType: string | null; // e.g., "article", "book", "paper", "presentation"
  title: string;
  date: string | null;
}

export interface CVData {
  firstName: string | null;
  surname: string | null;
  email: string | null;
  phone: string | null;
  links: CVLink[] | null;
  location: CVLocation | null;
  headline: string; // Professional headline/title summary
  profileStatement: string; // Professional summary/personal statement
  skills: CVSkill[];
  achievements: string[];
  languages: CVLanguage[] | null;
  experience: CVExperience[];
  education: CVEducation[] | null;
  certifications: CVCertification[] | null;
  professionalMemberships: CVMembership[] | null;
  earlierCareer: CVEarlierCareer[] | null;
  publications: CVPublication[] | null;
  addDetails: string[] | null; // Miscellaneous info (e.g., projects, volunteering)
}

// Additional types for UI state management
export type CVSection = keyof CVData;

export interface CVSectionVisibility {
  [key: string]: boolean;
}

export interface CVSectionOrder {
  sections: CVSection[];
}

export interface BackendResponse<T> {
  status: "success" | "error" | "partial";
  errors: string[] | null;
  data: T;
}

// Define interfaces based on the GCF parsing response structure

interface Location {
  city: string | null;
  country: string | null;
  postalCode: string | null;
}

interface Skill {
  name: string;
  proficiency: string; // Consider using an enum like 'Beginner' | 'Intermediate' | 'Advanced'
  skillType: string;   // Consider using an enum like 'hard' | 'soft'
}

interface Experience {
  company: string;
  start: string; // Consider using Date type if appropriate after parsing
  end: string | null;
  current: boolean;
  summary: string;
  highlights: string[];
}

// Define interfaces for other sections if their structure becomes known
// interface Education { ... }
// interface Certification { ... }
// ... etc ...

export interface ParsedCVData {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  links: string[]; 
  location: Location;
  headline: string;
  profileStatement: string;
  skills: Skill[];
  achievements: string[];
  languages: any[]; // Use a specific type if structure is known
  experience: Experience[];
  education: any[]; // Use a specific type if structure is known
  certifications: any[]; // Use a specific type if structure is known
  professionalMemberships: any[]; // Use a specific type if structure is known
  earlierCareer: any[]; // Use a specific type if structure is known
  publications: any[]; // Use a specific type if structure is known
  addDetails: string[];
}

// Define the overall structure of the GCF response
export interface GCFResponse {
    status: "success" | "error" | "partial";
    errors: { code: string; message: string; field?: string; severity?: string; }[] | null;
    data: ParsedCVData | null; // Use the specific type here
}
