export type ProjectCategory =
  | "Web applications"
  | "Mobile applications"
  | "Enterprise systems"
  | "Financial technology"
  | "Healthcare and wellbeing"
  | "Booking and transportation"
  | "Business management"
  | "Academic projects";
export type ProjectRelationship =
  | "Personal"
  | "Employer-owned"
  | "Client"
  | "Collaborative"
  | "Academic"
  | "Personal Academic Project"
  | "Personal Project";
export type ProjectStatus =
  | "In development"
  | "Prototype"
  | "Under review"
  | "Staging";

export type CaseStudy = {
  slug: string;
  title: string;
  relationship: ProjectRelationship;
  status: ProjectStatus;
  categories: ProjectCategory[];
  summary: string;
  problem: string;
  role: string;
  objectives?: string[];
  features: string[];
  stack: string[];
  engineering: string;
  challenge?: string;
  architecture?: string[];
  quality: string;
  deployment: string;
  learning: string;
  period?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  gallery?: { src: string; alt: string; caption: string }[];
  repository?: string;
  website?: string;
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "country-club-limbe",
    title: "Country Club Limbe Digital Ecosystem",
    relationship: "Employer-owned",
    status: "In development",
    categories: [
      "Enterprise systems",
      "Business management",
      "Mobile applications",
    ],
    summary:
      "Connected membership, golf and operational workflows across shared services and several application clients.",
    problem:
      "Club operations span members, events, tee times, tournaments, kitchen activity and financial records that need coordinated workflows.",
    role: "As a Software Developer Intern at Country Club Limbe, I work on shared backend services, client integration, testing, security remediation and deployment preparation. The ecosystem includes work by other developers.",
    objectives: [
      "Coordinate club workflows through shared services",
      "Support web and mobile clients with consistent access rules",
      "Prepare tested changes for staged release",
    ],
    architecture: [
      "Web and Flutter clients",
      "Authenticated shared API",
      "Membership, golf, tournament and kitchen workflows",
      "Relational operational records",
    ],
    challenge:
      "Several independently developed clients need consistent membership and operational state while release and security work continue.",
    features: [
      "Membership and authentication workflows",
      "Golf and tournament workflows",
      "Kitchen and operational integration",
      "Web and Flutter client integration",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Express",
      "MySQL",
      "Flutter",
      "REST APIs",
    ],
    engineering:
      "Shared authenticated APIs connect domain-specific clients through consistent access rules.",
    quality: "Application testing and security improvements are in progress.",
    deployment:
      "Development and staging preparation. Production release has not been verified.",
    learning:
      "Coordinating several clients around shared domain services requires clear API contracts and staged release checks.",
    period: "October 2026–present",
    website: "https://countryclublimbe.com/",
    image: "/images/country-club-limbe-public-site.webp",
    imageAlt:
      "Country Club Limbe public website homepage, captured in November 2026",
    imageCaption:
      "Country Club Limbe's public website, November 2026. Shown for organisation context; the digital ecosystem work described below is separate.",
    featured: true,
  },
  {
    slug: "serenity-hub",
    title: "Serenity Hub",
    relationship: "Personal",
    status: "In development",
    categories: [
      "Mobile applications",
      "Healthcare and wellbeing",
      "Web applications",
    ],
    summary:
      "A wellbeing platform with a Flutter client, web application and versioned Laravel API.",
    problem:
      "Wellbeing resources, personal check-ins and appointment discovery are often disconnected.",
    role: "I developed the personal project across its Laravel API and Flutter client, building authentication, guided media and appointment workflows.",
    features: [
      "Authentication and guided media",
      "Mood check-ins and recommendations",
      "Therapist discovery and appointments",
      "Support requests and local/offline access",
    ],
    stack: ["Laravel", "PHP", "Flutter", "Dart", "SQLite", "REST APIs"],
    engineering:
      "A versioned API keeps mobile features separate from the backend while local storage supports selected offline interactions.",
    quality: "API and mobile workflows are under development and testing.",
    deployment: "In development.",
    learning:
      "Sensitive wellbeing features need careful boundaries between product functionality and medical claims.",
    image: "/images/serenity-home-demo.png",
    imageAlt:
      "Serenity Hub web demo home with a synthetic mood check-in and guided session links",
    gallery: [
      {
        src: "/images/serenity-care-demo.png",
        alt: "Serenity Hub mobile care directory with clearly fictional sample profiles",
        caption: "Care directory with fictional profiles",
      },
    ],
    repository: "https://github.com/MustbePaul/Serenity-Hub",
    featured: true,
  },
  {
    slug: "taxihire-swiftr",
    title: "TaxiHire / SWIFTR",
    relationship: "Employer-owned",
    status: "In development",
    categories: [
      "Web applications",
      "Booking and transportation",
      "Financial technology",
    ],
    summary:
      "Terex-owned ride booking web product with passenger, driver, admin and payment workflows.",
    problem:
      "Ride bookings and their payment state need to remain coherent across several user roles.",
    role: "I was the primary developer of the web application at Terex. I built Laravel and React booking workflows and worked on PayChangu and OneKhusa payment versions. The mobile client is a separate codebase.",
    features: [
      "Ride booking and passenger flows",
      "Driver and administrator workflows",
      "PayChangu integration",
      "OneKhusa version and asynchronous payment verification",
    ],
    stack: ["Laravel", "PHP", "React", "MySQL", "PayChangu", "OneKhusa"],
    engineering:
      "A hosting constraint required adapting the payment integration; asynchronous verification separates a payment request from confirmed payment state.",
    quality:
      "Booking services, payment gateway clients and asynchronous jobs have been implemented and tested.",
    deployment: "Production release has not been verified.",
    learning:
      "Payment flows need explicit verification and recovery paths when the hosting environment changes.",
    image: "/images/swiftr-public-site.webp",
    imageAlt: "SWIFTR public taxi website homepage, captured in November 2026",
    imageCaption:
      "Current public SWIFTR website, November 2026. Shown for product context; my contribution was to the separate booking web application.",
    featured: true,
  },
  {
    slug: "buszathu-mobile",
    title: "BusZathu Mobile",
    relationship: "Collaborative",
    status: "In development",
    categories: ["Mobile applications", "Booking and transportation"],
    summary:
      "Flutter passenger and operator client for an existing bus booking platform.",
    problem:
      "The established platform needed mobile booking and boarding experiences connected to its existing API.",
    role: "I was given access to the existing platform to develop its mobile application. My contribution is the Flutter client and its API integration, not the web platform, backend or payment infrastructure.",
    features: [
      "Trip search and seat selection",
      "Passenger details and booking status",
      "E-tickets and QR display",
      "Operator ticket verification and boarding screens",
    ],
    stack: ["Flutter", "Dart", "Riverpod", "Dio", "REST APIs"],
    engineering:
      "Dio-based API classes consume the existing Laravel endpoints; Riverpod manages client state.",
    quality:
      "Client screens and API integrations are implemented; mobile release is still in progress.",
    deployment: "Mobile release is unverified.",
    learning:
      "Working against an established backend calls for clear handling of API response and booking state.",
    featured: true,
  },
  {
    slug: "online-banking-system",
    title: "Online Banking System",
    relationship: "Personal Academic Project",
    status: "Prototype",
    categories: [
      "Web applications",
      "Financial technology",
      "Enterprise systems",
      "Academic projects",
    ],
    summary:
      "Banking administration prototype for customers, accounts and controlled transactions.",
    problem:
      "Financial workflows need traceable account changes, permissions and statements.",
    role: "I originally developed this personal academic project during my third-year Human and Design Thinking course at MUST. I later redeveloped its administration workflows in Laravel, Inertia.js, React and TypeScript.",
    features: [
      "Customer and account management",
      "Deposits, withdrawals and transfers",
      "Statements and audit logs",
      "Role-based permissions",
    ],
    stack: ["Laravel", "Inertia.js", "React", "TypeScript", "MySQL"],
    engineering:
      "Transaction and permission rules are exercised in feature tests alongside statement and reporting workflows.",
    quality:
      "Feature tests exercise transaction and access rules. This remains a prototype.",
    deployment: "Prototype; production banking use is unverified.",
    learning:
      "Financial prototypes benefit from explicit access checks and transaction auditability.",
    image: "/images/banking-demo-dashboard.png",
    imageAlt:
      "Online Banking System dashboard in a labelled demo environment with synthetic account activity",
    gallery: [
      {
        src: "/images/banking-demo-transfer.png",
        alt: "Online Banking System transfer form with labelled demo accounts and synthetic values",
        caption: "Transfer workflow in the demo environment",
      },
      {
        src: "/images/banking-demo-accounts.png",
        alt: "Online Banking System account administration list with labelled synthetic demo accounts",
        caption: "Account administration with synthetic records",
      },
    ],
  },
  {
    slug: "billing-system",
    title: "Billing System",
    relationship: "Personal Project",
    status: "In development",
    categories: [
      "Web applications",
      "Financial technology",
      "Business management",
    ],
    summary:
      "Independently developed billing and financial administration application covering quotations, invoices, allocations and credit notes.",
    problem:
      "Billing records need consistent customer, payment and access workflows.",
    role: "I independently developed billing APIs and related workflows during late October and early November 2026.",
    features: [
      "Quotations and invoices",
      "Customers and credit notes",
      "Payment allocation and ledger models",
      "Role-based access and tenant isolation",
    ],
    stack: ["Laravel", "PHP", "React", "MySQL"],
    engineering:
      "The source separates invoice, quote and payment APIs and includes tenant isolation checks.",
    quality:
      "Feature tests cover billing operations, permissions and tenant isolation.",
    deployment: "Production deployment is unverified.",
    learning:
      "Tenant boundaries and payment allocation rules are core correctness concerns in billing software.",
    image: "/images/billing-demo-dashboard.webp",
    imageAlt:
      "Billing System dashboard in a local demo with synthetic receivables",
    imageCaption:
      "Local Billing System demo with synthetic records and publication-safe branding.",
    gallery: [
      {
        src: "/images/billing-demo-customers.webp",
        alt: "Billing System customer list with synthetic demo records",
        caption: "Customer accounts with synthetic records",
      },
      {
        src: "/images/billing-demo-quotations.webp",
        alt: "Billing System quotation list with a synthetic draft quote",
        caption: "Quotation workflow with a synthetic draft",
      },
      {
        src: "/images/billing-demo-invoices.webp",
        alt: "Billing System invoice list with synthetic demo records",
        caption: "Invoice management with synthetic records",
      },
      {
        src: "/images/billing-demo-payment-allocation.webp",
        alt: "Billing System posted payment allocation in the synthetic demo",
        caption: "Posted payment allocation against a demo invoice",
      },
      {
        src: "/images/billing-demo-credit-notes.webp",
        alt: "Billing System credit note list with a synthetic issued credit",
        caption: "Issued credit note in the local demo",
      },
    ],
  },
  {
    slug: "zikospace",
    title: "ZikoSpace",
    relationship: "Employer-owned",
    status: "In development",
    categories: ["Web applications", "Booking and transportation"],
    summary: "Collaborative accommodation discovery and booking work at Terex.",
    problem:
      "Property discovery and accommodation booking needed a clearer customer journey.",
    role: "I contributed frontend implementation and UI/UX refinement alongside other Terex developers.",
    features: [
      "Property discovery",
      "Accommodation booking journeys",
      "Responsive interface refinement",
    ],
    stack: ["Laravel", "PHP", "Blade", "MySQL", "Tailwind CSS"],
    engineering:
      "Customer-facing screens integrate with the existing booking and property workflows.",
    quality:
      "The booking interface was developed collaboratively and its production status is still being confirmed.",
    deployment: "Production status is unverified.",
    learning:
      "Shared product work requires clear attribution and consistent customer journeys.",
  },
  {
    slug: "story-workshop",
    title: "Story Workshop Website & CMS",
    relationship: "Client",
    status: "In development",
    categories: ["Web applications", "Business management"],
    summary:
      "Public storytelling pages and protected editorial workflows in a collaborative client project.",
    problem:
      "The organisation needed public content and controlled publishing workflows.",
    role: "I contributed to the public website and CMS as part of the Terex development team.",
    features: [
      "Articles, events and vacancies",
      "Studio booking and submissions",
      "Newsletters and protected CMS access",
    ],
    stack: ["React", "Laravel", "MySQL", "Sanctum"],
    engineering:
      "Public content and authenticated editorial workflows are served through separate interfaces.",
    quality:
      "Public content pages and protected editorial workflows have been implemented.",
    deployment: "Current production status is unverified.",
    learning:
      "Editorial systems need useful publishing controls without burdening the public experience.",
    image: "/images/story-workshop-public-site.webp",
    imageAlt:
      "Story Workshop public website homepage, captured in November 2026",
    imageCaption:
      "Current public Story Workshop website, November 2026. Developed collaboratively; the image does not identify individual contributions.",
  },
  {
    slug: "terex-website-redesign",
    title: "Terex Website Redesign",
    relationship: "Employer-owned",
    status: "Under review",
    categories: ["Web applications"],
    summary:
      "Corporate website redesign awaiting approval for production release.",
    problem:
      "The corporate site needed a clearer introduction to the organisation and its initiatives.",
    role: "I contributed responsive pages and presentation improvements as a Terex developer.",
    features: [
      "Hero and page composition",
      "Partner and initiative content",
      "Responsive presentation",
    ],
    stack: ["React", "JavaScript", "CSS"],
    engineering:
      "The redesign is kept distinct from the existing live website while it is reviewed.",
    quality: "The redesign is under review for approval and release.",
    deployment: "Under review; production approval is unverified.",
    learning:
      "A redesign should communicate the organisation clearly before adding visual effects.",
  },
  {
    slug: "mbewuai",
    title: "MbewuAI",
    relationship: "Academic",
    status: "Prototype",
    categories: ["Academic projects"],
    summary:
      "Precision agriculture prototype using simulated sensor and weather information.",
    problem:
      "A student team explored how environmental signals could inform crop-risk recommendations.",
    role: "I managed and presented the team project. Backend, frontend, research and integration were shared across team members.",
    features: [
      "Risk dashboard",
      "Simulated sensor data",
      "Crop-risk recommendations",
    ],
    stack: ["Node.js", "Express", "React"],
    engineering:
      "The prototype connects simulated inputs to a dashboard; field validation is not established.",
    quality: "The team built a working prototype with simulated inputs.",
    deployment: "Academic prototype; field deployment is unverified.",
    learning:
      "Project coordination and presentation are distinct from claiming sole technical authorship.",
  },
];
