"use client"

import { useMemo } from "react"
import { useTheme } from "next-themes"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts'
import type { Skill, SkillCategory } from "@/lib/skills-data"
import { getChartColors } from "@/lib/chart-theme"
import { Card, CardContent } from "@/components/ui/card"

interface RadarChartViewProps {
  skills: Skill[]
}

export default function RadarChartView({ skills }: RadarChartViewProps) {
  const { theme } = useTheme()
  const chartColors = getChartColors(theme as 'light' | 'dark' || 'dark')

  // Transform skills data for radar chart - group by category and calculate average proficiency
  const chartData = useMemo(() => {
    const categoryGroups: Record<SkillCategory, Skill[]> = {
      "Frontend": [],
      "Backend": [],
      "Database": [],
      "Cloud & DevOps": [],
      "Tools & Methodologies": [],
      "Agentic AI": [],
    }

    skills.forEach(skill => {
      if (categoryGroups[skill.category]) {
        categoryGroups[skill.category].push(skill)
      }
    })

    return Object.entries(categoryGroups)
      .filter(([_, skills]) => skills.length > 0)
      .map(([category, categorySkills]) => {
        const avgProficiency = categorySkills.reduce((sum, skill) => sum + skill.proficiency, 0) / categorySkills.length
        return {
          category,
          proficiency: Math.round(avgProficiency),
          skillCount: categorySkills.length,
          fullMark: 100
        }
      })
  }, [skills])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{data.category}</p>
          <p className="text-sm text-muted-foreground">
            Avg Proficiency: <span className="font-medium text-foreground">{data.proficiency}%</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Skills: <span className="font-medium text-foreground">{data.skillCount}</span>
          </p>
        </div>
      )
    }
    return null
  }

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] text-muted-foreground">
        <p>No skills data available for radar chart</p>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Skills Proficiency Radar</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Average proficiency across all skill categories
          </p>
        </div>

        <div className="w-full h-[500px] md:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart
              data={chartData}
              margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
            >
              <PolarGrid
                stroke={chartColors.grid}
                strokeDasharray="3 3"
              />
              <PolarAngleAxis
                dataKey="category"
                tick={{
                  fill: chartColors.text,
                  fontSize: 13,
                  fontWeight: 500
                }}
                tickLine={false}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Proficiency"
                dataKey="proficiency"
                stroke={chartColors.primary}
                fill={chartColors.primary}
                fillOpacity={0.6}
                strokeWidth={2}
                animationDuration={1000}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  color: chartColors.text,
                  paddingTop: '20px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Stats summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {chartData.map(item => (
            <div key={item.category} className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-2xl font-bold" style={{ color: chartColors.categoryColors[item.category] }}>
                {item.proficiency}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
              <p className="text-xs text-muted-foreground">{item.skillCount} skills</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
