export type Theme = 'light' | 'dark'

export interface ChartColors {
  background: string
  text: string
  grid: string
  primary: string
  categoryColors: Record<string, string>
}

export function getChartColors(theme: Theme = 'dark'): ChartColors {
  return {
    background: theme === 'dark' ? 'hsl(20 14.3% 4.1%)' : 'hsl(0 0% 100%)',
    text: theme === 'dark' ? 'hsl(0 0% 95%)' : 'hsl(240 10% 3.9%)',
    grid: theme === 'dark' ? 'hsl(240 3.7% 15.9%)' : 'hsl(240 5.9% 90%)',
    primary: 'hsl(15 63% 60%)',
    categoryColors: {
      'Frontend': '#3b82f6',        // blue
      'Backend': '#22c55e',          // green
      'Database': '#f59e0b',         // amber
      'Cloud & DevOps': '#a855f7',   // purple
      'Tools & Methodologies': '#f43f5e', // rose
      'Agentic AI': '#06b6d4',       // cyan
    }
  }
}

export function getCategoryColor(category: string, theme: Theme = 'dark'): string {
  const colors = getChartColors(theme)
  return colors.categoryColors[category] || colors.primary
}

// Skill level colors
export const skillLevelColors = {
  'Beginner': '#3b82f6',      // blue
  'Intermediate': '#22c55e',  // green
  'Advanced': '#f59e0b',      // amber
  'Expert': '#ef4444',        // red
}

export function getSkillLevelColor(level: string): string {
  return skillLevelColors[level as keyof typeof skillLevelColors] || skillLevelColors['Beginner']
}
