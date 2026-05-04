import { useState, useMemo } from 'react'
import type { Skill, SkillLevel, SkillCategory } from '@/lib/skills-data'

export interface SkillsFilterState {
  searchQuery: string
  selectedCategories: SkillCategory[]
  selectedLevels: SkillLevel[]
}

export function useSkillsFilter(skills: Skill[]) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<SkillCategory[]>([])
  const [selectedLevels, setSelectedLevels] = useState<SkillLevel[]>([])

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(skill.category)

      // Level filter
      const matchesLevel =
        selectedLevels.length === 0 ||
        selectedLevels.includes(skill.level)

      return matchesSearch && matchesCategory && matchesLevel
    })
  }, [skills, searchQuery, selectedCategories, selectedLevels])

  const toggleCategory = (category: SkillCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleLevel = (level: SkillLevel) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedLevels([])
  }

  const hasActiveFilters = searchQuery !== "" || selectedCategories.length > 0 || selectedLevels.length > 0

  return {
    // State
    searchQuery,
    selectedCategories,
    selectedLevels,
    filteredSkills,
    hasActiveFilters,

    // Actions
    setSearchQuery,
    setSelectedCategories,
    setSelectedLevels,
    toggleCategory,
    toggleLevel,
    clearFilters,
  }
}
