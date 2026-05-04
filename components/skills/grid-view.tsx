"use client"

import type { Skill } from "@/lib/skills-data"
import type { ProjectData } from "@/lib/projects-data"
import SkillCardInteractive from "./skill-card-interactive"

interface GridViewProps {
  skills: Skill[]
  projects: ProjectData[]
  onProjectClick?: (projectId: string) => void
}

export default function GridView({ skills, projects, onProjectClick }: GridViewProps) {
  if (skills.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        <p>No skills found matching your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map(skill => (
        <SkillCardInteractive
          key={skill.id}
          skill={skill}
          projects={projects}
          onProjectClick={onProjectClick}
        />
      ))}
    </div>
  )
}
