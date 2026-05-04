"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { SkillLevel, SkillCategory } from "@/lib/skills-data"
import { cn } from "@/lib/utils"

const categories: { id: SkillCategory; label: string; icon: string }[] = [
  { id: "Frontend", label: "Frontend", icon: "🎨" },
  { id: "Backend", label: "Backend", icon: "⚙️" },
  { id: "Database", label: "Database", icon: "💾" },
  { id: "Cloud & DevOps", label: "Cloud & DevOps", icon: "☁️" },
  { id: "Tools & Methodologies", label: "Tools", icon: "🛠️" },
]

const levels: SkillLevel[] = ["Beginner", "Intermediate", "Advanced", "Expert"]

interface FilterControlsProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  selectedCategories: SkillCategory[]
  onToggleCategory: (category: SkillCategory) => void
  selectedLevels: SkillLevel[]
  onToggleLevel: (level: SkillLevel) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export default function FilterControls({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onToggleCategory,
  selectedLevels,
  onToggleLevel,
  onClearFilters,
  hasActiveFilters,
}: FilterControlsProps) {
  return (
    <div className="space-y-4 p-4 md:p-6 bg-muted/30 rounded-lg border">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div>
        <h4 className="font-medium mb-2 text-sm">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Badge
              key={cat.id}
              variant={selectedCategories.includes(cat.id) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all hover:scale-105",
                selectedCategories.includes(cat.id) && "shadow-sm"
              )}
              onClick={() => onToggleCategory(cat.id)}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Level filters */}
      <div>
        <h4 className="font-medium mb-2 text-sm">Proficiency Level</h4>
        <div className="flex flex-wrap gap-2">
          {levels.map(level => (
            <Button
              key={level}
              variant={selectedLevels.includes(level) ? "default" : "outline"}
              size="sm"
              onClick={() => onToggleLevel(level)}
              className="transition-all"
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <div className="pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
