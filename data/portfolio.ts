export type SkillCategory = {
  id: string;
  title: string;
  technologies: string[];
  evidence: string;
};
export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  classification?: string;
  responsibilities: string[];
};
export type Qualification = {
  id: string;
  level: string;
  programme: string;
  institution: string;
  period: string;
  detail: string;
};
export type Service = {
  id: string;
  title: string;
  description: string;
  delivers: string[];
};

export const profile = {
  name: "Paul Napoleon Phiri",
  role: "Full-Stack Software Developer",
  headline:
    "Building reliable digital systems for businesses and organisations.",
  location: "Blantyre, Malawi",
  availability: "Available for selected work",
  email: "phiri6paul@gmail.com",
  phone: "+265 997 765 664",
  github: "https://github.com/MustbePaul",
  linkedin: "https://www.linkedin.com/in/paul-napoleon-phiri",
  biography:
    "Business Information Technology graduate who began programming in 2023. I build web, mobile and business systems with Laravel, React, Node.js and Flutter.",
  aboutParagraphs: [
    "My Business Information Technology background shapes how I work: understand the business problem first, then build the software that solves it. That means asking what a booking clerk, a driver or an editor actually needs to get their job done before writing a line of code.",
    "I am comfortable across the whole stack — designing the database, building the Laravel API behind it, and delivering the React or Flutter interface in front of it. I care about maintainability and reliability, and I have shipped work inside team codebases under real constraints, including a mid-build payment-provider pivot.",
  ],
  highlights: [
    "Web and mobile development",
    "Payment integrations",
    "Booking and CMS systems",
  ],
};

export const navigation = [
  "Home",
  "About",
  "Experience",
  "Projects",
  "Contact",
] as const;

export const developmentJourney = [
  {
    year: "2022",
    detail:
      "Began Business Information Technology studies at Malawi University of Science and Technology.",
  },
  {
    year: "2023",
    detail: "Began programming and independent learning during my second year.",
  },
  {
    year: "2024–2025",
    detail:
      "Built academic and independent development foundations across web and application work.",
  },
  {
    year: "Nov 2025",
    detail:
      "Began a concurrent family-business role at Naporcas Business Center.",
  },
  {
    year: "Feb 2026",
    detail: "Joined Terex Innovation Lab as a Software Developer.",
  },
  {
    year: "Aug 2026",
    detail:
      "Graduated from Malawi University of Science and Technology on 6 August.",
  },
  { year: "Sep 2026", detail: "Concluded employment at Terex Innovation Lab." },
  {
    year: "Oct 2026",
    detail: "Joined Country Club Limbe as a Software Developer.",
  },
  {
    year: "Present",
    detail: "Continue professional and independent development.",
  },
] as const;

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
    evidence:
      "Interfaces delivered for a client storytelling platform, in-house products and this portfolio.",
  },
  {
    id: "backend",
    title: "Backend Development",
    technologies: [
      "Laravel",
      "PHP",
      "Node.js",
      "Express",
      "REST APIs",
      "Authentication",
      "Role-based access",
    ],
    evidence:
      "Laravel services and authentication workflows for web and mobile products.",
  },
  {
    id: "mobile",
    title: "Mobile Application Development",
    technologies: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Provider",
      "Dio",
      "Offline functionality",
    ],
    evidence:
      "A complete mental-wellness mobile client and passenger booking experiences built on Flutter.",
  },
  {
    id: "databases",
    title: "Database Management",
    technologies: ["MySQL", "PostgreSQL", "SQLite", "SQL"],
    evidence:
      "Database design behind booking, content and records workflows across personal and team projects.",
  },
  {
    id: "apis",
    title: "API Integration",
    technologies: ["REST APIs", "PayChangu", "OneKhusa"],
    evidence:
      "Client/server integration and payment workflows in team projects.",
  },
  {
    id: "testing",
    title: "Software Testing and Debugging",
    technologies: ["Postman", "Playwright", "ESLint"],
    evidence:
      "API checks, application debugging and automated checks in this portfolio.",
  },
  {
    id: "tools",
    title: "Deployment and Development Tools",
    technologies: ["Git", "GitHub", "Laragon", "VS Code", "Figma", "Vercel"],
    evidence:
      "Daily tooling for version control, API testing, debugging and deployment support.",
  },
];

export const experiences: Experience[] = [
  {
    id: "ccl",
    title: "Software Developer",
    company: "Country Club Limbe",
    location: "Limbe, Malawi",
    period: "October 2026 — Present",
    current: true,
    responsibilities: [
      "Developing shared services and integrating web and Flutter clients for membership, golf, tournaments, kitchen and operational workflows.",
      "Working on authentication, authorisation, financial integration and application testing across the club ecosystem.",
      "Supporting security remediation, staging checks, hosting preparation and technical infrastructure improvements. Production release is not yet verified.",
    ],
  },
  {
    id: "terex",
    title: "Software Developer",
    company: "Terex Innovation Lab Limited",
    location: "Blantyre, Malawi",
    period: "February 2026 — September 2026",
    responsibilities: [
      "Developed Laravel and React systems for employer-owned products and contributed to collaborative client and in-house work.",
      "Served as primary web developer for TaxiHire / SWIFTR, including ride booking, role-specific workflows and PayChangu and OneKhusa payment versions.",
      "Contributed frontend implementation and UI/UX refinement to ZikoSpace alongside other developers.",
      "Contributed to the Story Workshop website and CMS and Terex website redesign in collaborative codebases.",
    ],
  },
  {
    id: "naporcas",
    title: "Operations & Financial Records Assistant",
    company: "Naporcas Business Center",
    location: "Lilongwe, Malawi",
    period: "November 2025 — Present",
    classification: "Family Business — Concurrent Role",
    responsibilities: [
      "Manage rental fee collection and accurate financial records.",
      "Track income, expenditure and payment documentation for reliable reconciliation.",
    ],
  },
];

export const qualifications: Qualification[] = [
  {
    id: "degree",
    level: "Bachelor's degree",
    programme: "BSc in Business Information Technology",
    institution: "Malawi University of Science and Technology",
    period: "2022 — August 2026",
    detail:
      "Graduated 6 August 2026 with a foundation spanning software, information systems and business technology.",
  },
];

export const services: Service[] = [
  {
    id: "full-stack-web",
    title: "Full-Stack Web Application Development",
    description:
      "Complete web applications from database schema to interface, built with Laravel and React.",
    delivers: [
      "Database-backed web applications",
      "Responsive interfaces",
      "Deployment support",
    ],
  },
  {
    id: "mobile-apps",
    title: "Mobile Application Development",
    description:
      "Cross-platform mobile applications built with Flutter and connected to real backends.",
    delivers: [
      "Flutter applications",
      "API-connected mobile clients",
      "Authentication flows",
    ],
  },
  {
    id: "api-integration",
    title: "API Development and Integration",
    description:
      "REST APIs and third-party integrations, including payment gateways such as PayChangu and OneKhusa.",
    delivers: [
      "REST API development",
      "Payment gateway integration",
      "Authenticated client integrations",
    ],
  },
  {
    id: "business-systems",
    title: "Business Systems and Workflow Automation",
    description:
      "Software for real organisational workflows: bookings, content operations and record keeping.",
    delivers: [
      "Booking and scheduling systems",
      "CMS-backed websites",
      "Records and reporting tools",
    ],
  },
  {
    id: "maintenance",
    title: "Software Maintenance and Improvement",
    description:
      "Stabilising and improving existing systems — from auth rebuilds to interface refreshes.",
    delivers: [
      "Bug fixing and stabilisation",
      "Interface redesigns",
      "Incremental improvements",
    ],
  },
];
