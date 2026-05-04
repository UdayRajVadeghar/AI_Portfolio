"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import type { Skill } from "@/lib/skills-data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCategoryColor } from "@/lib/chart-theme"
import { Calendar } from "lucide-react"

interface TimelineViewProps {
  skills: Skill[]
}

export default function TimelineView({ skills }: TimelineViewProps) {
  // Group skills by acquisition year
  const timelineData = useMemo(() => {
    const grouped = skills.reduce((acc, skill) => {
      const year = new Date(skill.acquiredDate).getFullYear()
      if (!acc[year]) acc[year] = []
      acc[year].push(skill)
      return acc
    }, {} as Record<number, Skill[]>)

    return Object.entries(grouped)
      .sort(([a], [b]) => Number(b) - Number(a)) // Most recent first
      .map(([year, yearSkills]) => ({
        year: Number(year),
        skills: yearSkills.sort((a, b) =>
          new Date(b.acquiredDate).getTime() - new Date(a.acquiredDate).getTime()
        )
      }))
  }, [skills])

  const getUsageFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case "Daily": return "bg-green-500"
      case "Weekly": return "bg-blue-500"
      case "Monthly": return "bg-amber-500"
      case "Occasionally": return "bg-gray-500"
      default: return "bg-gray-400"
    }
  }

  if (timelineData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] text-muted-foreground">
        <p>No skills data available for timeline</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-semibold">Skills Acquisition Timeline</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your learning journey over the years
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

        {timelineData.map(({ year, skills: yearSkills }, yearIndex) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
            className="mb-12 last:mb-0"
          >
            {/* Year marker */}
            <div className="flex items-center mb-6">
              <div className="flex items-center md:w-1/2 md:pr-8 md:justify-end">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-md">
                  <Calendar className="h-4 w-4" />
                  {year}
                </div>
              </div>
              <div className="hidden md:block w-1/2" />
            </div>

            {/* Skills for this year */}
            <div className="ml-12 md:ml-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              {yearSkills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: skillIndex % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                  className={skillIndex % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}
                >
                  <Card className="hover:shadow-lg transition-shadow relative overflow-hidden">
                    {/* Timeline marker dot */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-background ${getUsageFrequencyColor(skill.usageFrequency)} shadow-md ${skillIndex % 2 === 0 ? "-right-[42px] md:-left-[42px] md:right-auto" : "-left-[42px] md:-right-[42px] md:left-auto"}`} />

                    <CardContent className="p-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold text-lg">{skill.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {new Date(skill.acquiredDate).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs whitespace-nowrap">
                            {skill.level}
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {skill.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{ borderColor: getCategoryColor(skill.category, 'dark') }}
                          >
                            {skill.category}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getUsageFrequencyColor(skill.usageFrequency)} text-white border-none`}
                          >
                            {skill.usageFrequency}
                          </Badge>
                        </div>

                        {/* Proficiency bar */}
                        <div className="mt-2">
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}%` }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 text-right">
                            {skill.proficiency}% proficiency
                          </p>
                        </div>

                        {skill.projectIds.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Used in {skill.projectIds.length} project{skill.projectIds.length > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-semibold mb-3">Usage Frequency Legend</h4>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-muted-foreground">Weekly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-xs text-muted-foreground">Monthly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span className="text-xs text-muted-foreground">Occasionally</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
