// Single source of truth for the portfolio content.
// Everything here comes from Trenton_Rose_Resume.pdf — edit this file to update the site.

export const profile = {
  name: 'Trenton Rose',
  initials: 'TR',
  title: 'Senior Full Stack Developer',
  headline: 'Java · React · React Native & iOS',
  location: 'Savannah, MO',
  email: 'man349477@gmail.com',
  phone: '(601) 658-0653',
  phoneHref: 'tel:+16016580653',
  linkedin: 'https://www.linkedin.com/in/trenton-rose-3207753b1',
  linkedinLabel: 'linkedin.com/in/trenton-rose-3207753b1',
  github: 'https://github.com/superworm1016',
  githubUser: 'superworm1016',
  cv: 'Trenton_Rose_Resume.pdf',
  summary:
    'Senior full stack developer with 10+ years of enterprise software experience across financial services and healthcare, including professional React Native and iOS development. I build Java Spring Boot services, React web interfaces, and mobile applications integrated with secure REST APIs and relational data — owning architecture through production delivery.',
  stack: ['Java', 'Spring Boot', 'React', 'React Native', 'TypeScript', 'Azure', 'AWS'],
  facts: [
    { value: '10+', label: 'years in enterprise software' },
    { value: '2009', label: 'shipping production software since' },
    { value: '4', label: 'teams, from Garmin to Jack Henry' },
  ],
};

export type Role = {
  company: string;
  short: string;
  location: string;
  title: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM
  product: string;
  productDescription: string;
  bullets: string[];
  tags: string[];
  color: string; // tailwind color token name
};

export const experience: Role[] = [
  {
    company: 'Jack Henry & Associates Inc',
    short: 'JH',
    location: 'Monett, MO',
    title: 'Full Stack AI Engineer / Senior Software Architect',
    start: '2018-02',
    end: '2026-11',
    product: 'Financial Services Web and Mobile Applications',
    productDescription:
      'Enterprise financial applications delivering authenticated business workflows through React web interfaces and React Native applications for iOS. Java Spring Boot REST services connect application workflows to relational data, with enterprise access controls and containerized deployment on Azure and AWS.',
    bullets: [
      'Owned architecture and production delivery across web interfaces, mobile applications, backend services, and financial data integrations, translating enterprise requirements into secure application capabilities.',
      'Developed React Native features for iOS applications, connecting mobile interfaces with secure REST APIs and the enterprise financial services application stack.',
      'Designed Java Spring Boot REST APIs supporting web and mobile application workflows, connecting backend service logic with SQL Server and PostgreSQL data access.',
      'Implemented enterprise authentication and role-based access across application and API layers, controlling access to financial data and AI-enabled capabilities within existing systems.',
      'Delivered LLM and RAG capabilities with LangChain and Azure/OpenAI services, embedding semantic retrieval and intelligent automation into authenticated application workflows.',
      'Architected Docker and Kubernetes deployments across Azure and AWS; reviewed implementations for security, maintainability, reliability, and performance before production delivery.',
    ],
    tags: ['Java', 'Spring Boot', 'React', 'React Native', 'iOS', 'SQL Server', 'PostgreSQL', 'LangChain', 'Azure OpenAI', 'Docker', 'Kubernetes', 'Azure', 'AWS'],
    color: 'accent',
  },
  {
    company: 'Cerner Corporation',
    short: 'C',
    location: 'Kansas City, MO',
    title: 'Senior Full Stack Developer',
    start: '2013-06',
    end: '2018-01',
    product: 'Clinical Workflow and Patient Management Applications',
    productDescription:
      'Healthcare web applications supporting clinical workflows, patient management, and access to enterprise healthcare data. React interfaces communicate with backend REST services and relational databases through authenticated integrations with internal healthcare systems.',
    bullets: [
      'Built responsive React interfaces for clinical and patient management workflows using JavaScript, HTML5, and CSS3, connecting healthcare information with the screens used to manage it.',
      'Developed Node.js and Express REST services linking frontend applications to backend business logic and SQL Server data, supporting features across the full application stack.',
      'Integrated healthcare platforms with internal enterprise systems through authenticated APIs, maintaining data security and reliability across application boundaries.',
      'Worked with SQL Server and Oracle Database in the healthcare application stack, supporting the data access and integration needs of clinical workflows.',
      'Delivered frontend and backend changes in Agile development teams, keeping React interfaces, REST services, and enterprise integrations aligned as features evolved.',
    ],
    tags: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Node.js', 'Express', 'SQL Server', 'Oracle', 'Agile'],
    color: 'green',
  },
  {
    company: 'DST Systems',
    short: 'DST',
    location: 'Kansas City, MO',
    title: 'Full Stack Engineer',
    start: '2010-08',
    end: '2013-04',
    product: 'Investment Management and Enterprise Reporting Applications',
    productDescription:
      'Financial services applications connecting investment management workflows and enterprise reporting to web interfaces, backend services, and SQL Server data.',
    bullets: [
      'Developed ASP.NET and C# applications for investment management and enterprise reporting, connecting JavaScript, HTML, and CSS interfaces with backend business logic.',
      'Built backend services and SQL Server database solutions for business-critical financial applications, integrating web services with the application data layer.',
    ],
    tags: ['ASP.NET', 'C#', 'JavaScript', 'HTML', 'CSS', 'SQL Server'],
    color: 'purple',
  },
  {
    company: 'Garmin International',
    short: 'G',
    location: 'Olathe, KS',
    title: 'Stack Developer',
    start: '2009-06',
    end: '2010-07',
    product: 'Web Applications and Supporting Services',
    productDescription:
      'Web applications linking browser interfaces with ASP.NET business logic, backend services, and relational data.',
    bullets: [
      'Developed web applications with ASP.NET, C#, JavaScript, HTML, and CSS; built SQL Server-backed services connecting application interfaces to business-critical data.',
    ],
    tags: ['ASP.NET', 'C#', 'JavaScript', 'SQL Server'],
    color: 'orange',
  },
];

export const education = {
  school: 'Missouri University of Science and Technology',
  location: 'Rolla, MO',
  degree: 'Bachelor of Computer Science',
  start: '2005-08',
  end: '2009-05',
};

export type Project = {
  name: string;
  domain: string;
  description: string;
  highlights: string[];
  tags: string[];
  visual: 'health' | 'workflow' | 'assistant';
};

export const projects: Project[] = [
  {
    name: 'Healthcare Patient Data Management System',
    domain: 'Healthcare',
    description:
      'Angular interfaces and Java Spring Boot REST APIs for patient records and clinical workflows, integrating healthcare data exchange services with SQL Server and Docker.',
    highlights: ['Patient records', 'Clinical workflows', 'Healthcare data exchange'],
    tags: ['Angular', 'Java', 'Spring Boot', 'REST APIs', 'SQL Server', 'Docker'],
    visual: 'health',
  },
  {
    name: 'Enterprise Workflow Automation & Management Platform',
    domain: 'Enterprise',
    description:
      'React and TypeScript interfaces with ASP.NET Core APIs for business logic, authentication, role-based access, and automated approvals, backed by SQL Server and deployed with Azure, Docker, and Azure DevOps.',
    highlights: ['Automated approvals', 'Role-based access', 'Authentication'],
    tags: ['React', 'TypeScript', 'ASP.NET Core', 'SQL Server', 'Azure', 'Docker', 'Azure DevOps'],
    visual: 'workflow',
  },
  {
    name: 'AI Engineering Knowledge Assistant Platform',
    domain: 'AI',
    description:
      'A React chat interface and Python FastAPI services for searching technical documentation, connecting document processing, vector retrieval, LangChain, and Azure OpenAI with enterprise authentication and access-controlled retrieval.',
    highlights: ['Document search chat', 'Vector retrieval', 'Access-controlled retrieval'],
    tags: ['React', 'Python', 'FastAPI', 'LangChain', 'Azure OpenAI', 'Vector DB'],
    visual: 'assistant',
  },
];

export type SkillGroup = {
  id: string;
  name: string;
  blurb: string;
  items: string[];
  color: string;
};

export const skills: SkillGroup[] = [
  {
    id: '01',
    name: 'Backend',
    blurb: 'Java Spring Boot services and RESTful APIs, with Node.js, ASP.NET Core and FastAPI where they fit.',
    items: ['Java', 'Spring Boot', 'RESTful APIs', 'Microservices', 'Node.js', 'Express', 'C#', 'ASP.NET Core', 'Python FastAPI'],
    color: 'accent',
  },
  {
    id: '02',
    name: 'Frontend',
    blurb: 'Responsive, accessible React interfaces with typed state and predictable data flow.',
    items: ['React.js', 'Redux', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Responsive design', 'Accessibility'],
    color: 'cyan',
  },
  {
    id: '03',
    name: 'Mobile',
    blurb: 'Professional React Native and iOS development, wired to secure enterprise APIs.',
    items: ['React Native', 'iOS application development', 'Mobile API integration'],
    color: 'purple',
  },
  {
    id: '04',
    name: 'Data',
    blurb: 'Relational database design and query optimization across the major engines.',
    items: ['SQL Server', 'PostgreSQL', 'Oracle Database', 'Azure SQL', 'MySQL', 'Database design', 'Query optimization'],
    color: 'green',
  },
  {
    id: '05',
    name: 'Cloud & Delivery',
    blurb: 'Containerized delivery on Azure and AWS, with infrastructure as code and CI/CD.',
    items: ['Azure', 'AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Git', 'Azure DevOps', 'Agile/Scrum'],
    color: 'orange',
  },
  {
    id: '06',
    name: 'Quality & Security',
    blurb: 'Tested, reviewed, and access-controlled before it reaches production.',
    items: ['Unit testing', 'Integration testing', 'Code reviews', 'Performance analysis', 'Authentication', 'RBAC'],
    color: 'pink',
  },
];

