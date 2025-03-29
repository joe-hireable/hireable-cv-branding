
import { CVData } from "../types/cv";

// Sample CV data for development and testing
export const sampleCVData: CVData = {
  firstName: "John",
  surname: "Smith",
  email: "john.smith@example.com",
  phone: "+44 7700 900123",
  links: [
    {
      title: "LinkedIn",
      url: "linkedin.com/in/johnsmith"
    },
    {
      title: "GitHub",
      url: "github.com/johnsmith"
    }
  ],
  location: {
    city: "London",
    country: "UK",
    postalCode: "SW1A 1AA"
  },
  headline: "Senior Software Engineer",
  profileStatement: "Experienced software engineer with over 7 years of expertise in full-stack development. Specializing in React, Node.js, and cloud technologies. Proven track record of delivering high-quality web applications and mentoring junior developers.",
  skills: [
    { name: "React", proficiency: "Expert", skillType: "hard" },
    { name: "TypeScript", proficiency: "Advanced", skillType: "hard" },
    { name: "Node.js", proficiency: "Advanced", skillType: "hard" },
    { name: "GraphQL", proficiency: "Intermediate", skillType: "hard" },
    { name: "AWS", proficiency: "Advanced", skillType: "hard" },
    { name: "Docker", proficiency: "Intermediate", skillType: "hard" },
    { name: "Agile Methodologies", proficiency: "Advanced", skillType: "soft" },
    { name: "Team Leadership", proficiency: "Advanced", skillType: "soft" }
  ],
  achievements: [
    "Led development of a customer portal that increased user engagement by 45%",
    "Reduced API response times by 60% through query optimization",
    "Won 'Developer of the Year' award in 2021"
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "French", level: "Intermediate" }
  ],
  experience: [
    {
      company: "Tech Corporation Ltd",
      title: "Senior Software Engineer",
      start: "2020-01",
      end: null,
      current: true,
      summary: "Leading development of customer-facing applications and mentoring junior developers.",
      highlights: [
        "Led development of customer-facing portal with React and TypeScript",
        "Reduced API response times by 40% through query optimization",
        "Mentored junior developers and conducted code reviews",
        "Implemented CI/CD pipeline using GitHub Actions"
      ]
    },
    {
      company: "StartUp Inc",
      title: "Software Developer",
      start: "2017-03",
      end: "2019-12",
      current: false,
      summary: "Developed and maintained frontend applications and APIs.",
      highlights: [
        "Developed and maintained frontend applications using React",
        "Built RESTful APIs with Node.js and Express",
        "Implemented automated testing with Jest and React Testing Library",
        "Participated in agile development processes"
      ]
    }
  ],
  education: [
    {
      institution: "University of Manchester",
      location: {
        city: "Manchester",
        country: "UK"
      },
      qualifications: [
        {
          qualification: "BSc",
          course: "Computer Science",
          start: "2013",
          end: "2017",
          grade: "First Class Honours"
        }
      ]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2020"
    },
    {
      name: "Microsoft Certified: Azure Developer Associate",
      issuer: "Microsoft",
      date: "2021"
    }
  ],
  professionalMemberships: [
    {
      institution: "British Computer Society",
      name: "Professional Member"
    }
  ],
  earlierCareer: null,
  publications: null,
  addDetails: [
    "Volunteer coding instructor at local community college",
    "Open source contributor to React-based projects"
  ]
};

export default sampleCVData;
