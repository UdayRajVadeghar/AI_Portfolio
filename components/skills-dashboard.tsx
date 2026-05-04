"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { skillsData } from "@/lib/skills-data"
import { projectsData } from "@/lib/projects-data"
import { useSkillsFilter } from "@/hooks/use-skills-filter"
import ViewModeTabs, { type ViewMode } from "./skills/view-mode-tabs"
import FilterControls from "./skills/filter-controls"
import GridView from "./skills/grid-view"
import RadarChartView from "./skills/radar-chart-view"
import DependencyGraphView from "./skills/dependency-graph-view"
import TimelineView from "./skills/timeline-view"
import ProjectsBySkillView from "./skills/projects-by-skill-view"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function SkillsDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [showFilters, setShowFilters] = useState(false)

  const {
    searchQuery,
    selectedCategories,
    selectedLevels,
    filteredSkills,
    hasActiveFilters,
    setSearchQuery,
    toggleCategory,
    toggleLevel,
    clearFilters,
  } = useSkillsFilter(skillsData)

  // Use filtered skills for grid and radar views, but full data for timeline and projects
  const viewSkills = (viewMode === "timeline" || viewMode === "projects") ? skillsData : filteredSkills

  const handleProjectClick = (projectId: string) => {
    // Scroll to projects section
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="skills-dashboard" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Skills & Expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            >
              Explore my technical skills through interactive visualizations
            </motion.p>

            {/* Stats badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              <Badge variant="outline">{skillsData.length} Total Skills</Badge>
              <Badge variant="outline">{projectsData.length} Projects</Badge>
              <Badge variant="outline">
                {skillsData.filter(s => s.level === "Expert").length} Expert Level
              </Badge>
            </motion.div>
          </div>

          {/* View mode tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ViewModeTabs activeMode={viewMode} onModeChange={setViewMode} />
          </motion.div>

          {/* Filter controls (only for grid and radar views) */}
          {(viewMode === "grid" || viewMode === "radar" || viewMode === "graph") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">Filters</h3>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="text-xs">
                      {filteredSkills.length} / {skillsData.length} skills
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                >
                  {showFilters ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Show
                    </>
                  )}
                </Button>
              </div>

              <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
                <FilterControls
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategories={selectedCategories}
                  onToggleCategory={toggleCategory}
                  selectedLevels={selectedLevels}
                  onToggleLevel={toggleLevel}
                  onClearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                />
              </div>
            </motion.div>
          )}

          {/* View content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === "grid" && (
                <GridView
                  skills={filteredSkills}
                  projects={projectsData}
                  onProjectClick={handleProjectClick}
                />
              )}

              {viewMode === "radar" && (
                <RadarChartView skills={filteredSkills} />
              )}

              {viewMode === "graph" && (
                <DependencyGraphView skills={filteredSkills} />
              )}

              {viewMode === "timeline" && (
                <TimelineView skills={viewSkills} />
              )}

              {viewMode === "projects" && (
                <ProjectsBySkillView
                  skills={skillsData}
                  projects={projectsData}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
