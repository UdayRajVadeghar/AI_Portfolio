export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert"
export type SkillCategory = "Frontend" | "Backend" | "Database" | "Cloud & DevOps" | "Tools & Methodologies" | "Agentic AI"
export type UsageFrequency = "Daily" | "Weekly" | "Monthly" | "Occasionally"

export interface Skill {
  id: string // unique identifier (slugified name)
  name: string // display name
  level: SkillLevel
  proficiency: number // 0-100 for radar chart
  category: SkillCategory
  description: string
  acquiredDate: string // ISO date string
  lastUsed: string // ISO date string
  usageFrequency: UsageFrequency
  relatedSkills: string[] // IDs of related skills
  projectIds: string[] // IDs of projects using this skill
  icon?: string // optional emoji
  color?: string // hex color
}

export const skillsData: Skill[] = [
  // Frontend Skills
  {
    id: "javascript",
    name: "JavaScript",
    level: "Expert",
    proficiency: 95,
    category: "Frontend",
    description: "ES6+, DOM manipulation, async programming, closures, and functional concepts",
    acquiredDate: "2019-01-15",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["typescript", "react-js", "node-js", "express-js"],
    projectIds: ["mycptrainer", "ecommerce", "hirehub"],
    icon: "🟨",
    color: "#F7DF1E"
  },
  {
    id: "typescript",
    name: "TypeScript",
    level: "Expert",
    proficiency: 90,
    category: "Frontend",
    description: "Type systems, interfaces, generics, and advanced type manipulations",
    acquiredDate: "2020-06-01",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["javascript", "react-js", "next-js", "node-js"],
    projectIds: ["mycptrainer", "portfolio"],
    icon: "📘",
    color: "#3178C6"
  },
  {
    id: "react-js",
    name: "React.js",
    level: "Expert",
    proficiency: 92,
    category: "Frontend",
    description: "Hooks, context, state management, performance optimization, and custom hooks",
    acquiredDate: "2020-03-15",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["typescript", "javascript", "next-js", "tailwind-css"],
    projectIds: ["mycptrainer", "ecommerce", "portfolio"],
    icon: "⚛️",
    color: "#61DAFB"
  },
  {
    id: "html-css",
    name: "HTML/CSS",
    level: "Expert",
    proficiency: 90,
    category: "Frontend",
    description: "Semantic HTML, CSS Grid, Flexbox, animations, and responsive design",
    acquiredDate: "2018-09-01",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["tailwind-css", "react-js"],
    projectIds: ["mycptrainer", "ecommerce", "portfolio", "hirehub"],
    icon: "🎨",
    color: "#E44D26"
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS",
    level: "Advanced",
    proficiency: 85,
    category: "Frontend",
    description: "Utility-first approach, customization, and component patterns",
    acquiredDate: "2021-04-20",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["html-css", "react-js", "next-js"],
    projectIds: ["mycptrainer", "portfolio"],
    icon: "💨",
    color: "#06B6D4"
  },
  {
    id: "next-js",
    name: "Next.js",
    level: "Expert",
    proficiency: 90,
    category: "Frontend",
    description: "App Router, Server Components, SSR, SSG, and API routes",
    acquiredDate: "2021-08-10",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["react-js", "typescript", "tailwind-css", "node-js"],
    projectIds: ["mycptrainer", "portfolio"],
    icon: "▲",
    color: "#000000"
  },

  // Backend Skills
  {
    id: "node-js",
    name: "Node.js",
    level: "Expert",
    proficiency: 90,
    category: "Backend",
    description: "Event loop, streams, async patterns, and performance optimization",
    acquiredDate: "2019-11-01",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["javascript", "typescript", "express-js", "aws"],
    projectIds: ["mycptrainer", "hirehub", "ecommerce"],
    icon: "🟩",
    color: "#339933"
  },
  {
    id: "php",
    name: "PHP",
    level: "Advanced",
    proficiency: 80,
    category: "Backend",
    description: "OOP, modern PHP practices, and framework integration",
    acquiredDate: "2018-05-15",
    lastUsed: "2024-08-01",
    usageFrequency: "Occasionally",
    relatedSkills: ["laravel", "mysql"],
    projectIds: [],
    icon: "🐘",
    color: "#777BB4"
  },
  {
    id: "laravel",
    name: "Laravel",
    level: "Advanced",
    proficiency: 85,
    category: "Backend",
    description: "MVC architecture, Eloquent ORM, middleware, and service providers",
    acquiredDate: "2019-02-10",
    lastUsed: "2024-08-01",
    usageFrequency: "Occasionally",
    relatedSkills: ["php", "mysql", "postgresql"],
    projectIds: [],
    icon: "🔺",
    color: "#FF2D20"
  },
  {
    id: "express-js",
    name: "Express.js",
    level: "Expert",
    proficiency: 90,
    category: "Backend",
    description: "Routing, middleware, error handling, and API design",
    acquiredDate: "2020-01-20",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["node-js", "javascript", "restful-apis", "postgresql"],
    projectIds: ["ecommerce", "hirehub"],
    icon: "🚂",
    color: "#000000"
  },
  {
    id: "restful-apis",
    name: "RESTful APIs",
    level: "Expert",
    proficiency: 95,
    category: "Backend",
    description: "Design principles, authentication, rate limiting, and documentation",
    acquiredDate: "2019-09-15",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["node-js", "express-js", "aws", "postgresql"],
    projectIds: ["mycptrainer", "ecommerce", "hirehub"],
    icon: "🔌",
    color: "#4CAF50"
  },

  // Database Skills
  {
    id: "mysql",
    name: "MySQL",
    level: "Advanced",
    proficiency: 85,
    category: "Database",
    description: "Query optimization, indexing, transactions, and stored procedures",
    acquiredDate: "2018-10-01",
    lastUsed: "2025-05-10",
    usageFrequency: "Monthly",
    relatedSkills: ["php", "laravel", "postgresql"],
    projectIds: [],
    icon: "🐬",
    color: "#4479A1"
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    level: "Advanced",
    proficiency: 80,
    category: "Database",
    description: "Advanced queries, JSON operations, and performance tuning",
    acquiredDate: "2020-04-15",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["node-js", "express-js", "mysql", "restful-apis"],
    projectIds: ["mycptrainer", "ecommerce"],
    icon: "🐘",
    color: "#336791"
  },
  {
    id: "dynamodb",
    name: "DynamoDB",
    level: "Advanced",
    proficiency: 80,
    category: "Database",
    description: "NoSQL design patterns, single-table design, and query optimization",
    acquiredDate: "2022-03-10",
    lastUsed: "2025-11-18",
    usageFrequency: "Weekly",
    relatedSkills: ["aws", "lambda", "node-js"],
    projectIds: ["hirehub"],
    icon: "⚡",
    color: "#4053D6"
  },
  {
    id: "mongodb",
    name: "MongoDB",
    level: "Intermediate",
    proficiency: 75,
    category: "Database",
    description: "Document modeling, aggregation pipeline, and indexing strategies",
    acquiredDate: "2020-07-20",
    lastUsed: "2024-12-01",
    usageFrequency: "Monthly",
    relatedSkills: ["node-js", "express-js"],
    projectIds: [],
    icon: "🍃",
    color: "#47A248"
  },
  {
    id: "redis",
    name: "Redis",
    level: "Advanced",
    proficiency: 80,
    category: "Database",
    description: "Caching strategies, data structures, and pub/sub patterns",
    acquiredDate: "2021-11-15",
    lastUsed: "2025-11-18",
    usageFrequency: "Weekly",
    relatedSkills: ["node-js", "express-js", "postgresql"],
    projectIds: ["mycptrainer", "portfolio"],
    icon: "🔴",
    color: "#DC382D"
  },

  // Cloud & DevOps Skills
  {
    id: "aws",
    name: "AWS",
    level: "Advanced",
    proficiency: 85,
    category: "Cloud & DevOps",
    description: "Lambda, SQS, EventBridge, Step Functions, and serverless architecture",
    acquiredDate: "2021-06-01",
    lastUsed: "2025-11-18",
    usageFrequency: "Weekly",
    relatedSkills: ["lambda", "sqs", "node-js", "dynamodb", "docker"],
    projectIds: ["hirehub"],
    icon: "☁️",
    color: "#FF9900"
  },
  {
    id: "lambda",
    name: "AWS Lambda",
    level: "Advanced",
    proficiency: 82,
    category: "Cloud & DevOps",
    description: "Serverless functions, event-driven architecture, and cold start optimization",
    acquiredDate: "2021-09-15",
    lastUsed: "2025-11-18",
    usageFrequency: "Weekly",
    relatedSkills: ["aws", "node-js", "dynamodb", "sqs"],
    projectIds: ["hirehub"],
    icon: "λ",
    color: "#FF9900"
  },
  {
    id: "sqs",
    name: "AWS SQS",
    level: "Advanced",
    proficiency: 80,
    category: "Cloud & DevOps",
    description: "Message queuing, distributed systems, and asynchronous processing",
    acquiredDate: "2022-01-20",
    lastUsed: "2025-11-15",
    usageFrequency: "Weekly",
    relatedSkills: ["aws", "lambda", "rabbitmq"],
    projectIds: ["hirehub"],
    icon: "📬",
    color: "#FF9900"
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    level: "Advanced",
    proficiency: 85,
    category: "Cloud & DevOps",
    description: "CI/CD pipelines, workflow automation, and deployment strategies",
    acquiredDate: "2020-12-01",
    lastUsed: "2025-11-18",
    usageFrequency: "Weekly",
    relatedSkills: ["git", "docker", "ci-cd"],
    projectIds: ["mycptrainer", "portfolio"],
    icon: "⚙️",
    color: "#2088FF"
  },
  {
    id: "travis-ci",
    name: "Travis-CI",
    level: "Intermediate",
    proficiency: 70,
    category: "Cloud & DevOps",
    description: "Build configuration, test automation, and deployment integration",
    acquiredDate: "2019-08-10",
    lastUsed: "2024-06-15",
    usageFrequency: "Occasionally",
    relatedSkills: ["ci-cd", "github-actions", "git"],
    projectIds: [],
    icon: "🔧",
    color: "#3EAAAF"
  },
  {
    id: "docker",
    name: "Docker",
    level: "Advanced",
    proficiency: 80,
    category: "Cloud & DevOps",
    description: "Containerization, multi-stage builds, and Docker Compose",
    acquiredDate: "2021-02-10",
    lastUsed: "2025-11-10",
    usageFrequency: "Weekly",
    relatedSkills: ["aws", "ci-cd", "node-js"],
    projectIds: ["mycptrainer"],
    icon: "🐳",
    color: "#2496ED"
  },
  {
    id: "ci-cd",
    name: "CI/CD",
    level: "Advanced",
    proficiency: 85,
    category: "Cloud & DevOps",
    description: "Continuous integration, deployment automation, and testing strategies",
    acquiredDate: "2020-10-15",
    lastUsed: "2025-11-18",
    usageFrequency: "Weekly",
    relatedSkills: ["github-actions", "docker", "git"],
    projectIds: ["mycptrainer", "portfolio"],
    icon: "🔄",
    color: "#4CAF50"
  },

  // Tools & Methodologies
  {
    id: "git",
    name: "Git",
    level: "Expert",
    proficiency: 90,
    category: "Tools & Methodologies",
    description: "Version control, branching strategies, and collaborative workflows",
    acquiredDate: "2018-08-01",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["github-actions", "ci-cd"],
    projectIds: ["mycptrainer", "ecommerce", "hirehub", "portfolio"],
    icon: "🔀",
    color: "#F05032"
  },
  {
    id: "agile",
    name: "Agile",
    level: "Advanced",
    proficiency: 85,
    category: "Tools & Methodologies",
    description: "Scrum, Kanban, sprint planning, and retrospectives",
    acquiredDate: "2020-01-10",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["scrum", "jira"],
    projectIds: [],
    icon: "🏃",
    color: "#00ADD8"
  },
  {
    id: "scrum",
    name: "Scrum",
    level: "Advanced",
    proficiency: 85,
    category: "Tools & Methodologies",
    description: "Sprint planning, daily standups, and team facilitation",
    acquiredDate: "2020-02-15",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["agile", "jira"],
    projectIds: [],
    icon: "📊",
    color: "#009FDA"
  },
  {
    id: "jira",
    name: "JIRA",
    level: "Advanced",
    proficiency: 80,
    category: "Tools & Methodologies",
    description: "Project tracking, workflow customization, and reporting",
    acquiredDate: "2020-03-01",
    lastUsed: "2025-11-15",
    usageFrequency: "Weekly",
    relatedSkills: ["agile", "scrum"],
    projectIds: [],
    icon: "📋",
    color: "#0052CC"
  },
  {
    id: "figma",
    name: "Figma",
    level: "Intermediate",
    proficiency: 70,
    category: "Tools & Methodologies",
    description: "Design collaboration, prototyping, and developer handoff",
    acquiredDate: "2021-05-10",
    lastUsed: "2025-10-20",
    usageFrequency: "Monthly",
    relatedSkills: ["react-js", "tailwind-css"],
    projectIds: ["mycptrainer", "portfolio"],
    icon: "🎨",
    color: "#F24E1E"
  },

  // Additional skills from projects
  {
    id: "sentry",
    name: "Sentry",
    level: "Advanced",
    proficiency: 82,
    category: "Tools & Methodologies",
    description: "Error tracking, performance monitoring, and debugging",
    acquiredDate: "2023-03-15",
    lastUsed: "2025-11-18",
    usageFrequency: "Daily",
    relatedSkills: ["next-js", "typescript", "node-js"],
    projectIds: ["mycptrainer"],
    icon: "🐛",
    color: "#362D59"
  },
  {
    id: "rabbitmq",
    name: "RabbitMQ",
    level: "Advanced",
    proficiency: 78,
    category: "Backend",
    description: "Message broker, queue management, and distributed systems",
    acquiredDate: "2023-06-10",
    lastUsed: "2025-11-18",
    usageFrequency: "Weekly",
    relatedSkills: ["node-js", "sqs", "postgresql"],
    projectIds: ["mycptrainer"],
    icon: "🐰",
    color: "#FF6600"
  },
]

// Category metadata
export const skillCategories = [
  {
    id: "frontend",
    name: "Frontend",
    description: "Client-side technologies and frameworks",
    color: "#3b82f6",
    icon: "🎨"
  },
  {
    id: "backend",
    name: "Backend",
    description: "Server-side technologies and APIs",
    color: "#22c55e",
    icon: "⚙️"
  },
  {
    id: "database",
    name: "Database",
    description: "Data storage and management systems",
    color: "#f59e0b",
    icon: "💾"
  },
  {
    id: "cloud-devops",
    name: "Cloud & DevOps",
    description: "Cloud platforms and deployment automation",
    color: "#a855f7",
    icon: "☁️"
  },
  {
    id: "tools-methodologies",
    name: "Tools & Methodologies",
    description: "Development tools and practices",
    color: "#f43f5e",
    icon: "🛠️"
  }
]

// Helper functions
export function getSkillById(id: string): Skill | undefined {
  return skillsData.find(skill => skill.id === id)
}

export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skillsData.filter(skill => skill.category === category)
}

export function getSkillsByLevel(level: SkillLevel): Skill[] {
  return skillsData.filter(skill => skill.level === level)
}

export function getSkillsByProject(projectId: string): Skill[] {
  return skillsData.filter(skill => skill.projectIds.includes(projectId))
}

export function getRelatedSkills(skillId: string): Skill[] {
  const skill = getSkillById(skillId)
  if (!skill) return []
  return skill.relatedSkills
    .map(id => getSkillById(id))
    .filter((s): s is Skill => s !== undefined)
}
