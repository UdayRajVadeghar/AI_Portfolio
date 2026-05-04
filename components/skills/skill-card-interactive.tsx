"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import type { Skill } from "@/lib/skills-data"
import type { ProjectData } from "@/lib/projects-data"
import { getSkillLevelColor, getCategoryColor } from "@/lib/chart-theme"
import { cn } from "@/lib/utils"

interface SkillCardInteractiveProps {
  skill: Skill
  projects: ProjectData[]
  onProjectClick?: (projectId: string) => void
}

export default function SkillCardInteractive({
  skill,
  projects,
  onProjectClick
}: SkillCardInteractiveProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const skillProjects = projects.filter(p => p.skillIds.includes(skill.id))
  const relatedSkillsCount = skill.relatedSkills.length

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "cursor-pointer hover:shadow-lg transition-all",
          isExpanded && "ring-2 ring-primary"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {skill.icon && <span className="text-xl">{skill.icon}</span>}
                <h4 className="font-semibold text-lg">{skill.name}</h4>
              </div>
              <Badge
                variant="secondary"
                className="text-xs"
                style={{
                  backgroundColor: getSkillLevelColor(skill.level) + '20',
                  color: getSkillLevelColor(skill.level),
                  borderColor: getSkillLevelColor(skill.level)
                }}
              >
                {skill.level}
              </Badge>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Proficiency bar */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground">Proficiency</span>
              <span className="text-xs font-medium">{skill.proficiency}%</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: getSkillLevelColor(skill.level) }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.proficiency}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {skill.category}
            </Badge>
            {skillProjects.length > 0 && (
              <span>{skillProjects.length} project{skillProjects.length > 1 ? 's' : ''}</span>
            )}
            {relatedSkillsCount > 0 && (
              <span>{relatedSkillsCount} related</span>
            )}
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t space-y-4">
                  {/* Description */}
                  <div>
                    <h5 className="text-sm font-semibold mb-1">Description</h5>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>

                  {/* Timeline info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <h5 className="text-xs font-semibold mb-1">Acquired</h5>
                      <p className="text-xs text-muted-foreground">
                        {new Date(skill.acquiredDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold mb-1">Usage</h5>
                      <Badge variant="outline" className="text-xs">
                        {skill.usageFrequency}
                      </Badge>
                    </div>
                  </div>

                  {/* Projects using this skill */}
                  {skillProjects.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold mb-2">Used in Projects</h5>
                      <div className="space-y-2">
                        {skillProjects.map(project => (
                          <div
                            key={project.id}
                            className="p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group"
                            onClick={(e) => {
                              e.stopPropagation()
                              if (onProjectClick) onProjectClick(project.id)
                            }}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                                  {project.title}
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {project.description}
                                </p>
                              </div>
                              <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related skills count */}
                  {relatedSkillsCount > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold mb-1">Related Skills</h5>
                      <p className="text-xs text-muted-foreground">
                        Connected to {relatedSkillsCount} other skill{relatedSkillsCount > 1 ? 's' : ''} in your stack
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
