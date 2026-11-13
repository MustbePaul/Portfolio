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
export type Project = {
  id: string;
  title: string;
  ownership: string;
  status?: string;
  problem: string;
  solution: string;
  contribution: string[];
  engineering?: string;
  technologies: string[];
  image?: string;
  imageAlt?: string;
  imageContain?: boolean;
  liveUrl?: string;
  walkthroughUrl?: string;
  caseStudyUrl?: string;
  repositoryUrl?: string;
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
    "Business Information Technology graduate developing full-stack web and mobile systems with Laravel, React and Flutter — from booking platforms and CMS-backed websites to payment integrations for real organisational workflows.",
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
    technologies: ["Laravel", "PHP", "Node.js", "Sanctum"],
    evidence:
      "Laravel services and authentication workflows for web and mobile products.",
  },
  {
    id: "mobile",
    title: "Mobile Application Development",
    technologies: ["Flutter", "Dart", "Provider"],
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
      "Developing and implementing components of the Country Club Limbe Digital Ecosystem, including the Club Management System.",
      "Building backend services and API integrations for membership and operational workflows.",
      "Testing, troubleshooting and preparing applications for deployment while supporting technical and digital infrastructure improvements.",
    ],
  },
  {
    id: "terex",
    title: "Software Developer",
    company: "Terex Innovation Lab Limited",
    location: "Blantyre, Malawi",
    period: "February 2026 — September 2026",
    responsibilities: [
      "Developed frontend and backend systems for in-house products using Laravel, PHP, JavaScript, React, Angular and Flutter.",
      "Delivered dual payment-gateway integration (PayChangu and OneKhusa) after a hosting constraint forced a mid-build pivot.",
      "Rebuilt authentication, routing and theme persistence for ZikoSpace and delivered its accommodation booking flow end to end.",
      "Built role-specific passenger, driver and administrator experiences for TaxiHire / SWIFTR.",
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
  {
    id: "secondary",
    level: "Secondary education",
    programme: "AS Level & IGCSE",
    institution: "Kamuzu Academy",
    period: "2015 — 2021",
    detail: "International secondary education.",
  },
];

export const projects: Project[] = [
  {
    id: "serenity-hub",
    title: "Serenity Hub",
    ownership: "Personal Project",
    status: "Personal project — deployment status unverified",
    problem:
      "People seeking mental-wellness support need one place to discover resources, track their progress and connect with therapists.",
    solution:
      "Built a Flutter client and versioned Laravel API for guided audio and video sessions, mood-informed recommendations, therapist discovery, appointment booking, bookmarks and support request ticketing.",
    contribution: [
      "Built the Flutter mobile experience and Laravel 13 API",
      "Implemented authentication, media playback and progress tracking",
      "Created therapist availability, booking, mood check-in and support workflows",
    ],
    engineering:
      "A versioned Laravel API separates the Flutter client from the backend and supports progress and booking workflows.",
    technologies: [
      "Flutter",
      "Laravel 13",
      "PHP 8.3",
      "Provider",
      "SQLite",
      "REST API",
    ],
    image: "/images/serenity-hub.png",
    imageAlt:
      "Serenity Hub mobile welcome screen with sign-in and account creation actions",
    imageContain: true,
    repositoryUrl: "https://github.com/MustbePaul/Serenity-Hub",
  },
  {
    id: "story-workshop",
    title: "Story Workshop Website",
    ownership: "Client Project — Story Workshop",
    status: "Client project — deployment status unverified",
    problem:
      "A public-facing organisation needed to publish varied programme content while keeping editorial and operational workflows protected.",
    solution:
      "Contributed to Story Workshop's public storytelling platform and protected CMS for articles, events, vacancies, bookings, newsletters and submissions.",
    contribution: [
      "Public website development",
      "Protected CMS workflows",
      "Frontend data and motion integration",
    ],
    engineering:
      "The public content interface and protected editorial workflows were separated through authenticated CMS access.",
    technologies: [
      "React 19",
      "Laravel 13",
      "Sanctum",
      "MySQL",
      "React Query",
      "Framer Motion",
    ],
    image: "/images/story-workshop.webp",
    imageAlt:
      "Story Workshop website hero presenting its changing lives through storytelling mission",
  },
  {
    id: "zikospace",
    title: "ZikoSpace",
    ownership: "Terex Innovation Lab — In-House Project",
    status: "In-house project — deployment status unverified",
    problem:
      "The accommodation platform needed a more dependable sign-in journey, routing and booking experience.",
    solution:
      "As a Terex Innovation Lab developer, rebuilt authentication and routing, fixed persistent theming and delivered the accommodation booking flow end to end.",
    contribution: [
      "Authentication and routing",
      "Booking workflow",
      "Theme persistence",
    ],
    engineering:
      "Authentication, routing and theme persistence were repaired alongside the booking flow.",
    technologies: ["Laravel", "PHP", "JavaScript", "MySQL", "Tailwind CSS"],
    image: "/images/zikospace.webp",
    imageAlt: "ZikoSpace accommodation listings interface",
  },
  {
    id: "swiftr",
    title: "TaxiHire / SWIFTR",
    ownership: "Terex Innovation Lab — In-House Project",
    status: "In-house project — deployment status unverified",
    problem:
      "Passengers and operators needed a shared system for managing ride bookings and payments across distinct user roles.",
    solution:
      "As part of the Terex Innovation Lab team, developed passenger, driver and administrator experiences, then supported two payment gateways when hosting constraints required a mid-project pivot.",
    contribution: [
      "Booking flow development",
      "Payment integration",
      "Passenger, driver and admin experiences",
    ],
    engineering:
      "A hosting constraint required a change to the payment integration approach during development.",
    technologies: ["Flutter", "Angular", "Node.js", "PayChangu", "OneKhusa"],
    image: "/images/taxihire.webp",
    imageAlt: "TaxiHire route booking interface",
  },
  {
    id: "terex-site",
    title: "Terex Website Redesign",
    ownership: "Terex Innovation Lab — In-House Project",
    status: "Under Review — Not Yet in Production",
    problem:
      "The corporate website needed a clearer first impression and stronger presentation of partners and initiatives.",
    solution:
      "Implemented a new website experience with refreshed hero, partner and initiative content. The redesign is currently under review and awaiting production approval; the existing website remains live.",
    contribution: [
      "Hero redesign",
      "Partner and initiative pages",
      "Scroll interactions",
    ],
    engineering:
      "The redesign remains under review, so this preview is clearly separated from the existing live site.",
    technologies: ["React", "JavaScript", "CSS"],
    image: "/images/terex-website.webp",
    imageAlt:
      "Preview of the new Terex Innovation Lab website currently under review",
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
