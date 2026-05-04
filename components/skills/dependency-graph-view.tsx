"use client"

import { useRef, useMemo, useState, useCallback } from "react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import type { Skill } from "@/lib/skills-data"
import { transformSkillsToGraphData, calculateGraphStats } from "@/lib/graph-transformer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dynamically import ForceGraph2D to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })

interface DependencyGraphViewProps {
  skills: Skill[]
}

export default function DependencyGraphView({ skills }: DependencyGraphViewProps) {
  const { theme } = useTheme()
  const graphRef = useRef<any>()
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set())
  const [highlightLinks, setHighlightLinks] = useState<Set<string>>(new Set())

  const graphData = useMemo(() => transformSkillsToGraphData(skills), [skills])
  const stats = useMemo(() => calculateGraphStats(graphData), [graphData])

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node.id)

    // Highlight connected nodes
    const connectedNodes = new Set<string>()
    const connectedLinks = new Set<string>()

    connectedNodes.add(node.id)

    graphData.links.forEach(link => {
      if (link.source === node.id || (typeof link.source === 'object' && (link.source as any).id === node.id)) {
        const targetId = typeof link.target === 'string' ? link.target : (link.target as any).id
        connectedNodes.add(targetId)
        connectedLinks.add(`${node.id}-${targetId}`)
      }
      if (link.target === node.id || (typeof link.target === 'object' && (link.target as any).id === node.id)) {
        const sourceId = typeof link.source === 'string' ? link.source : (link.source as any).id
        connectedNodes.add(sourceId)
        connectedLinks.add(`${sourceId}-${node.id}`)
      }
    })

    setHighlightNodes(connectedNodes)
    setHighlightLinks(connectedLinks)
  }, [graphData])

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null)
    setHighlightNodes(new Set())
    setHighlightLinks(new Set())
  }, [])

  const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name
    const fontSize = 12 / globalScale
    const isHighlighted = highlightNodes.has(node.id)
    const isSelected = selectedNode === node.id

    ctx.font = `${fontSize}px Sans-Serif`

    // Draw node circle
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI)
    ctx.fillStyle = isSelected ? '#fbbf24' : (isHighlighted || highlightNodes.size === 0 ? node.color : '#666666')
    ctx.fill()

    if (isSelected) {
      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 2 / globalScale
      ctx.stroke()
    }

    // Draw label
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000'
    ctx.fillText(label, node.x, node.y + node.val + fontSize + 2)
  }, [highlightNodes, selectedNode, theme])

  if (graphData.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-[500px] text-muted-foreground">
        <p>No skills data available for dependency graph</p>
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Technology Dependency Graph</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Visualization of skill relationships and technology stacks. Click nodes to explore connections.
          </p>
        </div>

        {/* Graph stats */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline">{stats.totalNodes} Skills</Badge>
          <Badge variant="outline">{stats.totalLinks} Connections</Badge>
          <Badge variant="outline">Avg Proficiency: {stats.avgProficiency}%</Badge>
        </div>

        {/* Selected node info */}
        {selectedNode && (
          <div className="mb-4 p-3 bg-primary/10 rounded-lg border">
            <p className="text-sm">
              <span className="font-semibold">Selected:</span>{" "}
              {graphData.nodes.find(n => n.id === selectedNode)?.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Connected to {highlightNodes.size - 1} skills
            </p>
          </div>
        )}

        <div className="w-full h-[600px] border rounded-lg overflow-hidden bg-muted/10">
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeLabel="name"
            nodeCanvasObject={nodeCanvasObject}
            nodeVal={(node: any) => node.val}
            linkColor={() => theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}
            linkWidth={(link: any) => {
              const sourceId = typeof link.source === 'string' ? link.source : link.source.id
              const targetId = typeof link.target === 'string' ? link.target : link.target.id
              const linkId = `${sourceId}-${targetId}`
              return highlightLinks.has(linkId) || highlightLinks.size === 0 ? 2 : 1
            }}
            backgroundColor={theme === 'dark' ? '#1a1a1a' : '#ffffff'}
            onNodeClick={handleNodeClick}
            onBackgroundClick={handleBackgroundClick}
            cooldownTicks={100}
            onEngineStop={() => {
              if (graphRef.current) {
                graphRef.current.zoomToFit(400)
              }
            }}
          />
        </div>

        {/* Most connected skills */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-3">Most Connected Skills</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {stats.mostConnected.slice(0, 5).map(({ skill, connections }) => (
              skill && (
                <div
                  key={skill.id}
                  className="text-center p-2 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    const node = graphData.nodes.find(n => n.id === skill.id)
                    if (node) handleNodeClick(node)
                  }}
                >
                  <p className="text-lg font-bold" style={{ color: skill.color }}>
                    {connections}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{skill.name}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
