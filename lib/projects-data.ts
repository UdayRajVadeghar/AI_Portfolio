export type ProjectCategory = "Personal" | "Professional" | "Open Source"

export interface ProjectData {
  id: string
  title: string
  description: string
  tags: string[]
  skillIds: string[]
  codeLink: string | null
  liveLink: string | null
  category: ProjectCategory
  startDate: string
  endDate?: string
  featured: boolean
  image?: string
}

export const projectsData: ProjectData[] = [
  {
    id: "mycptrainer",
    title: "MyCpTrainer",
    description: "Founder of MyCPTrainer — an intelligent platform empowering programmers to level up in competitive programming with data-driven insights and tailored practice.",
    tags: ["Typescript", "NextJS", "Sentry", "PostgreSQL", "RabbitMQ", "Redis", "Docker"],
    skillIds: ["typescript", "next-js", "sentry", "postgresql", "rabbitmq", "redis", "docker", "react-js", "tailwind-css", "node-js", "restful-apis", "ci-cd"],
    codeLink: null,
    liveLink: "https://mycptrainer.com",
    category: "Personal",
    startDate: "2024-01-01",
    featured: true
  },
  {
    id: "ecommerce",
    title: "E-Commerce Website",
    description: "A custom e-commerce platform featuring dedicated admin, seller, and buyer portals with integrated secure payment processing",
    tags: ["React", "PostgreSQL", "Express", "Node.js", "JavaScript", "HTML/CSS"],
    skillIds: ["react-js", "postgresql", "express-js", "node-js", "javascript", "html-css", "restful-apis", "git"],
    codeLink: "https://github.com/UdayRajVadeghar/stocklyn",
    liveLink: "https://github.com/UdayRajVadeghar/stocklyn",
    category: "Personal",
    startDate: "2023-03-15",
    endDate: "2023-08-20",
    featured: true
  },
  {
    id: "hirehub",
    title: "HireHub",
    description: "A job platform where candidates can apply for positions and recruiters can review, shortlist, and manage applications.",
    tags: ["Node.js", "AWS", "SQS", "Lambda", "DynamoDB", "JavaScript"],
    skillIds: ["node-js", "aws", "sqs", "lambda", "dynamodb", "javascript", "restful-apis", "git"],
    codeLink: "https://github.com/UdayRajVadeghar/HireHubv1",
    liveLink: null,
    category: "Personal",
    startDate: "2022-09-01",
    endDate: "2023-01-15",
    featured: true
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description: "This portfolio! An AI-powered Next.js website featuring a conversational AI chatbot with RAG, multi-agent architecture, and beautiful interactive components.",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Vertex AI", "Redis"],
    skillIds: ["next-js", "typescript", "react-js", "tailwind-css", "redis", "node-js", "html-css", "github-actions", "git", "figma"],
    codeLink: null,
    liveLink: "https://udayrajvadeghar.com",
    category: "Personal",
    startDate: "2025-10-01",
    featured: true
  }
]

// Helper functions
export function getProjectById(id: string): ProjectData | undefined {
  return projectsData.find(project => project.id === id)
}

export function getProjectsByCategory(category: ProjectCategory): ProjectData[] {
  return projectsData.filter(project => project.category === category)
}

export function getProjectsBySkill(skillId: string): ProjectData[] {
  return projectsData.filter(project => project.skillIds.includes(skillId))
}

export function getFeaturedProjects(): ProjectData[] {
  return projectsData.filter(project => project.featured)
}

export function getProjectsByTag(tag: string): ProjectData[] {
  return projectsData.filter(project =>
    project.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}
