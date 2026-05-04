"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, X } from "lucide-react"
import Link from "next/link"
import type { Skill } from "@/lib/skills-data"
import type { ProjectData } from "@/lib/projects-data"
import { cn } from "@/lib/utils"

interface ProjectsBySkillViewProps {
  skills: Skill[]
  projects: ProjectData[]
}

export default function ProjectsBySkillView({ skills, projects }: ProjectsBySkillViewProps) {
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([])

  const toggleSkillFilter = (skillId: string) => {
    setSelectedSkillIds(prev =>
      prev.includes(skillId)
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    )
  }

  const clearFilters = () => {
    setSelectedSkillIds([])
  }

  const filteredProjects = projects.filter(project => {
    if (selectedSkillIds.length === 0) return true
    return selectedSkillIds.some(skillId => project.skillIds.includes(skillId))
  })

  // Get skills that are actually used in projects
  const usedSkills = skills.filter(skill =>
    projects.some(project => project.skillIds.includes(skill.id))
  ).sort((a, b) => {
    const aProjects = projects.filter(p => p.skillIds.includes(a.id)).length
    const bProjects = projects.filter(p => p.skillIds.includes(b.id)).length
    return bProjects - aProjects
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Projects by Technology</h3>
        <p className="text-sm text-muted-foreground">
          Filter projects by the skills they use
        </p>
      </div>

      {/* Skill filter chips */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">Filter by Skills</h4>
            {selectedSkillIds.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear ({selectedSkillIds.length})
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {usedSkills.map(skill => {
              const projectCount = projects.filter(p => p.skillIds.includes(skill.id)).length
              const isSelected = selectedSkillIds.includes(skill.id)

              return (
                <Badge
                  key={skill.id}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all hover:scale-105",
                    isSelected && "shadow-md"
                  )}
                  onClick={() => toggleSkillFilter(skill.id)}
                >
                  {skill.icon && <span className="mr-1">{skill.icon}</span>}
                  {skill.name}
                  <span className="ml-1 text-xs opacity-70">({projectCount})</span>
                </Badge>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Project grid */}
      {filteredProjects.length === 0 ? (
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
          <div className="text-center">
            <p>No projects found with selected skills</p>
            <Button
              variant="link"
              size="sm"
              onClick={clearFilters}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const projectSkills = skills.filter(s => project.skillIds.includes(s.id))

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                  <CardContent className="flex-1 flex flex-col p-5">
                    {/* Project header */}
                    <div className="mb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold">{project.title}</h3>
                        {project.featured && (
                          <Badge variant="secondary" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Skills used */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-1.5">
                        {projectSkills.slice(0, 6).map(skill => (
                          <Badge
                            key={skill.id}
                            variant="outline"
                            className={cn(
                              "text-xs cursor-pointer hover:bg-primary/10 transition-colors",
                              selectedSkillIds.includes(skill.id) && "bg-primary/20 border-primary"
                            )}
                            onClick={() => toggleSkillFilter(skill.id)}
                          >
                            {skill.icon && <span className="mr-1">{skill.icon}</span>}
                            {skill.name}
                          </Badge>
                        ))}
                        {projectSkills.length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{projectSkills.length - 6} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-2 mt-auto">
                      {project.codeLink && (
                        <Button size="sm" variant="outline" asChild className="flex-1">
                          <Link
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-1 h-4 w-4" /> Code
                          </Link>
                        </Button>
                      )}
                      {project.liveLink && (
                        <Button size="sm" variant="outline" asChild className="flex-1">
                          <Link
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-1 h-4 w-4" /> Live
                          </Link>
                        </Button>
                      )}
                    </div>

                    {/* Date range */}
                    {project.startDate && (
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(project.startDate).getFullYear()}
                        {project.endDate && ` - ${new Date(project.endDate).getFullYear()}`}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
