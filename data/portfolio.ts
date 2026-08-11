export type SkillCategory = {
  id: string;
  title: string;
  technologies: string[];
};
export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
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
  technologies: string[];
  image?: string;
  imageAlt?: string;
  imageContain?: boolean;
  liveUrl?: string;
  walkthroughUrl?: string;
  caseStudyUrl?: string;
  repositoryUrl?: string;
};

export const profile = {
  name: "Paul Napoleon Phiri",
  location: "Blantyre, Malawi",
  email: "phiri6paul@gmail.com",
  github: "https://github.com/MustbePaul",
  linkedin: "https://linkedin.com/in/paul-phiri-2574281b0",
  roles: [
    "Full-Stack Software Developer",
    "Flutter Developer",
    "Laravel Developer",
    "Business IT Graduate",
  ],
  biography:
    "I am a Business Information Technology graduate who builds dependable web and mobile systems for banks, NGOs and growing businesses—from booking platforms and content systems to payment integrations.",
};

export const navigation = [
  "Home",
  "Skills",
  "Experience",
  "Qualification",
  "Projects",
  "Pricing",
  "Contact",
] as const;

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend Technologies",
    technologies: [
      "Laravel",
      "PHP",
      "Node.js",
      "REST APIs",
      "PayChangu",
      "OneKhusa",
    ],
  },
  {
    id: "frontend",
    title: "Frontend Technologies",
    technologies: [
      "React",
      "Next.js",
      "Angular",
      "Flutter",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    id: "database",
    title: "Database Technologies",
    technologies: ["MySQL", "PostgreSQL", "SQL"],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    technologies: ["Git", "GitHub", "Postman", "VS Code", "Figma", "Laragon"],
  },
];
export const marqueeSkills = skillCategories.flatMap(
  (group) => group.technologies,
);

export const experiences: Experience[] = [
  {
    id: "terex",
    title: "Software Developer",
    company: "Terex Innovation Lab Limited",
    location: "Blantyre, Malawi",
    period: "2026 — Present",
    current: true,
    responsibilities: [
      "Develop frontend and backend systems using Laravel, PHP, JavaScript and Flutter.",
      "Delivered dual payment-gateway integration after a hosting constraint forced a mid-build pivot.",
      "Contribute across ZikoSpace, TaxiHire/SWIFTR and the new Terex website currently under review.",
    ],
  },
  {
    id: "naporcas",
    title: "Operations & Financial Records Assistant",
    company: "Naporcas Business Center",
    location: "Lilongwe, Malawi",
    period: "Ongoing",
    responsibilities: [
      "Manage rental fee collection and accurate financial records.",
      "Track income, expenditure and payment documentation for reliable reconciliation.",
    ],
  },
];

export const qualifications: Qualification[] = [
  {
    id: "degree",
    level: "Bachelor’s degree",
    programme: "BSc in Business Information and Technology",
    institution: "Malawi University of Science and Technology",
    period: "2022 — August 2026",
    detail:
      "Graduated 6 August 2026 with a foundation spanning software, information systems and business technology.",
  },
  {
    id: "as",
    level: "Advanced Subsidiary",
    programme: "AS Level",
    institution: "Kamuzu Academy",
    period: "2020 — 2021",
    detail: "Advanced secondary education.",
  },
  {
    id: "igcse",
    level: "Secondary qualification",
    programme: "IGCSE",
    institution: "Kamuzu Academy",
    period: "2015 — 2020",
    detail: "International secondary education.",
  },
];

export const projects: Project[] = [
  {
    id: "serenity-hub",
    title: "Serenity Hub",
    ownership: "Personal Project",
    problem:
      "People seeking mental-wellness support need one place to discover resources, track their progress and connect with therapists.",
    solution:
      "Built a Flutter client and versioned Laravel API for guided audio and video sessions, mood-informed recommendations, therapist discovery, appointment booking, bookmarks and support requests.",
    contribution: [
      "Built the Flutter mobile experience and Laravel 13 API",
      "Implemented authentication, media playback and progress tracking",
      "Created therapist availability, booking, mood check-in and support workflows",
    ],
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
    problem:
      "A public-facing organisation needed to publish varied programme content while keeping editorial and operational workflows protected.",
    solution:
      "Contributed to Story Workshop's public storytelling platform and protected CMS for articles, events, vacancies, bookings, newsletters and submissions.",
    contribution: [
      "Public website development",
      "Protected CMS workflows",
      "Frontend data and motion integration",
    ],
    technologies: [
      "React 19",
      "Laravel 13",
      "Sanctum",
      "MySQL",
      "React Query",
      "Framer Motion",
    ],
    image: "/images/story-workshop.png",
    imageAlt:
      "Story Workshop website hero presenting its changing lives through storytelling mission",
  },
  {
    id: "zikospace",
    title: "ZikoSpace",
    ownership: "Terex Innovation Lab — In-House Project",
    problem:
      "The accommodation platform needed a more dependable sign-in journey, routing and booking experience.",
    solution:
      "As a Terex Innovation Lab developer, rebuilt authentication and routing, fixed persistent theming and delivered the accommodation booking flow end to end.",
    contribution: [
      "Authentication and routing",
      "Booking workflow",
      "Theme persistence",
    ],
    technologies: ["Laravel", "PHP", "JavaScript", "MySQL", "Tailwind CSS"],
    image: "/images/zikospace.png",
    imageAlt: "ZikoSpace accommodation listings interface",
  },
  {
    id: "swiftr",
    title: "TaxiHire / SWIFTR",
    ownership: "Terex Innovation Lab — In-House Project",
    problem:
      "Passengers and operators needed a shared system for managing ride bookings and payments across distinct user roles.",
    solution:
      "As part of the Terex Innovation Lab team, developed passenger, driver and administrator experiences, then supported two payment gateways when hosting constraints required a mid-project pivot.",
    contribution: [
      "Booking flow development",
      "Payment integration",
      "Passenger, driver and admin experiences",
    ],
    technologies: ["Flutter", "Angular", "Node.js", "PayChangu", "OneKhusa"],
    image: "/images/taxihire.png",
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
      "Implemented a new website experience with refreshed hero, partner and initiative content. The redesign is currently under review and awaiting production approval; the existing website remains in production.",
    contribution: [
      "Hero redesign",
      "Partner and initiative pages",
      "Scroll interactions",
    ],
    technologies: ["React", "JavaScript", "CSS"],
    image: "/images/terex-website.png",
    imageAlt:
      "Preview of the new Terex Innovation Lab website currently under review",
  },
];

export const engagementOptions = [
  {
    title: "Focused build",
    description:
      "A defined feature, integration or interface with a clear delivery boundary.",
    includes: ["Scoped implementation", "Responsive UI", "Handover notes"],
  },
  {
    title: "Product sprint",
    description:
      "A compact web or mobile product taken from requirements through a working release.",
    includes: [
      "Technical planning",
      "Full-stack delivery",
      "Deployment support",
    ],
  },
  {
    title: "Ongoing engineering",
    description:
      "Embedded development support for evolving platforms and product teams.",
    includes: ["Flexible scope", "Iteration cadence", "Team collaboration"],
  },
];
