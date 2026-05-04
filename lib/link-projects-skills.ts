import type { ProjectData } from './projects-data'
import type { Skill } from './skills-data'

/**
 * Links projects to skills based on tags and skill names/IDs
 * Returns updated projects with populated skillIds
 */
export function linkProjectsToSkills(projects: ProjectData[], skills: Skill[]): ProjectData[] {
  return projects.map(project => {
    // Map tags to skill IDs by matching against skill names or IDs
    const skillIds = project.tags
      .map(tag => {
        // Try to find skill by exact name match (case-insensitive)
        const byName = skills.find(s =>
          s.name.toLowerCase() === tag.toLowerCase()
        )
        if (byName) return byName.id

        // Try to find skill by ID match (slugified tag)
        const slugifiedTag = tag.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')
        const byId = skills.find(s => s.id === slugifiedTag)
        if (byId) return byId.id

        // Try partial match
        const partial = skills.find(s =>
          s.name.toLowerCase().includes(tag.toLowerCase()) ||
          tag.toLowerCase().includes(s.name.toLowerCase())
        )
        if (partial) return partial.id

        return null
      })
      .filter((id): id is string => id !== null)

    // Remove duplicates
    const uniqueSkillIds = Array.from(new Set(skillIds))

    return {
      ...project,
      skillIds: uniqueSkillIds
    }
  })
}

/**
 * Gets all projects that use a specific skill
 */
export function getProjectsForSkill(skillId: string, projects: ProjectData[]): ProjectData[] {
  return projects.filter(project => project.skillIds.includes(skillId))
}

/**
 * Gets all skills used in a specific project
 */
export function getSkillsForProject(projectId: string, projects: ProjectData[], skills: Skill[]): Skill[] {
  const project = projects.find(p => p.id === projectId)
  if (!project) return []

  return project.skillIds
    .map(skillId => skills.find(s => s.id === skillId))
    .filter((skill): skill is Skill => skill !== undefined)
}

/**
 * Validates that all project skillIds reference valid skills
 */
export function validateProjectSkillLinks(projects: ProjectData[], skills: Skill[]): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []
  const skillIds = new Set(skills.map(s => s.id))

  projects.forEach(project => {
    project.skillIds.forEach(skillId => {
      if (!skillIds.has(skillId)) {
        errors.push(`Project "${project.title}" references invalid skill ID: ${skillId}`)
      }
    })
  })

  return {
    valid: errors.length === 0,
    errors
  }
}
