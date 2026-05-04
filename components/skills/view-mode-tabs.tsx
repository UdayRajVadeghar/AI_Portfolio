"use client"

import { LayoutGrid, Radar, Network, Clock, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ViewMode = "grid" | "radar" | "graph" | "timeline" | "projects"

const viewModes = [
  { id: "grid" as const, label: "Grid", icon: LayoutGrid },
  { id: "radar" as const, label: "Radar", icon: Radar },
  { id: "graph" as const, label: "Graph", icon: Network },
  { id: "timeline" as const, label: "Timeline", icon: Clock },
  { id: "projects" as const, label: "Projects", icon: Folder },
]

interface ViewModeTabsProps {
  activeMode: ViewMode
  onModeChange: (mode: ViewMode) => void
}

export default function ViewModeTabs({ activeMode, onModeChange }: ViewModeTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {viewModes.map(mode => {
        const Icon = mode.icon
        return (
          <Button
            key={mode.id}
            variant={activeMode === mode.id ? "default" : "outline"}
            onClick={() => onModeChange(mode.id)}
            className={cn(
              "flex items-center gap-2 transition-all",
              activeMode === mode.id && "shadow-md"
            )}
            size="sm"
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{mode.label}</span>
          </Button>
        )
      })}
    </div>
  )
}
