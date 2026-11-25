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
  | "Repository project";
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
  gallery?: { src: string; alt: string; caption: string }[];
  repository?: string;
  featured?: boolean;
};

// Public copy is intentionally conservative. Evidence and unresolved ownership are tracked in docs.
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
    role: "As a current Software Developer, I work on shared backend services, client integration, testing, security remediation and deployment preparation. The ecosystem includes work by other developers.",
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
      "Shared authenticated APIs connect domain-specific clients. This description omits private endpoints and infrastructure details.",
    quality:
      "Source and release notes show application testing and security work in progress.",
    deployment:
      "Development and staging preparation. Production release has not been verified.",
    learning:
      "Coordinating several clients around shared domain services requires clear API contracts and staged release checks.",
    period: "October 2026–present",
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
    quality:
      "Implementation is visible in the current monorepo and earlier API/mobile repositories. Clinical outcomes and live usage are not established.",
    deployment:
      "Public source is available; production deployment is unverified.",
    learning:
      "Sensitive wellbeing features need careful boundaries between product functionality and medical claims.",
    image: "/images/serenity-hub.png",
    imageAlt: "Serenity Hub mobile welcome screen with sign-in actions",
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
      "The two local web versions contain booking services, gateway clients and payment jobs. End-to-end production operation is unverified.",
    deployment: "Production release has not been verified.",
    learning:
      "Payment flows need explicit verification and recovery paths when the hosting environment changes.",
    image: "/images/taxihire.webp",
    imageAlt: "TaxiHire ride booking interface",
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
      "The source contains the listed client screens and integrations. A full end-to-end release is unverified.",
    deployment: "Mobile release is unverified.",
    learning:
      "Working against an established backend calls for clear handling of API response and booking state.",
    repository: "https://github.com/MustbePaul/buszathu_mobile",
    featured: true,
  },
  {
    slug: "online-banking-system",
    title: "Online Banking System",
    relationship: "Repository project",
    status: "Prototype",
    categories: [
      "Web applications",
      "Financial technology",
      "Enterprise systems",
    ],
    summary:
      "Banking administration prototype for customers, accounts and controlled transactions.",
    problem:
      "Financial workflows need traceable account changes, permissions and statements.",
    role: "I implemented the repository project’s customer, account and transaction workflows. Client or company ownership has not been established.",
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
      "The repository contains feature tests for transaction and access rules. Regulated production use is not claimed.",
    deployment: "Prototype; production banking use is unverified.",
    learning:
      "Financial prototypes benefit from explicit access checks and transaction auditability.",
    repository: "https://github.com/MustbePaul/Online-Banking-System-",
    image: "/images/banking-demo-dashboard.png",
    imageAlt:
      "Online Banking System dashboard in a labelled demo environment with synthetic account activity",
    gallery: [
      {
        src: "/images/banking-demo-transfer.png",
        alt: "Online Banking System transfer form with labelled demo accounts and synthetic values",
        caption: "Transfer workflow in the demo environment",
      },
    ],
  },
  {
    slug: "billing-system",
    title: "Billing System",
    relationship: "Repository project",
    status: "In development",
    categories: [
      "Web applications",
      "Financial technology",
      "Business management",
    ],
    summary:
      "Billing workflows covering quotations, invoices, allocations and credit notes.",
    problem:
      "Billing records need consistent customer, payment and access workflows.",
    role: "I built and tested the repository project’s billing APIs and related workflows. Client or company ownership has not been established.",
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
    repository: "https://github.com/MustbePaul/Billing-System",
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
    role: "I contributed frontend implementation and UI/UX refinement alongside other Terex developers. An account-hosted House Rentals repository mirrors this codebase.",
    features: [
      "Property discovery",
      "Accommodation booking journeys",
      "Responsive interface refinement",
    ],
    stack: ["Laravel", "PHP", "Blade", "MySQL", "Tailwind CSS"],
    engineering:
      "Customer-facing screens integrate with the existing booking and property workflows.",
    quality:
      "Source and team history establish a collaborative codebase; individual module ownership is not fully separable.",
    deployment: "Production status is unverified.",
    learning:
      "Shared product work requires clear attribution and consistent customer journeys.",
    image: "/images/zikospace.webp",
    imageAlt: "ZikoSpace accommodation listing interface",
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
    role: "I contributed to the public website and CMS within a multi-author Terex codebase. Exact module ownership is not fully separable.",
    features: [
      "Articles, events and vacancies",
      "Studio booking and submissions",
      "Newsletters and protected CMS access",
    ],
    stack: ["React", "Laravel", "MySQL", "Sanctum"],
    engineering:
      "Public content and authenticated editorial workflows are served through separate interfaces.",
    quality:
      "The local source contains public and admin components plus backend controllers.",
    deployment: "Current production status is unverified.",
    learning:
      "Editorial systems need useful publishing controls without burdening the public experience.",
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
    quality:
      "The implementation is present in local source; approval and release remain separate steps.",
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
    quality:
      "Repository source supports a prototype, not a deployed agricultural advisory service.",
    deployment: "Academic prototype; field deployment is unverified.",
    learning:
      "Project coordination and presentation are distinct from claiming sole technical authorship.",
  },
];
