import type { Skill } from './skills-data'

export interface GraphNode {
  id: string
  name: string
  category: string
  proficiency: number
  level: string
  color: string
  val: number // node size
}

export interface GraphLink {
  source: string
  target: string
  value: number
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

const categoryColors: Record<string, string> = {
  'Frontend': '#3b82f6',
  'Backend': '#22c55e',
  'Database': '#f59e0b',
  'Cloud & DevOps': '#a855f7',
  'Tools & Methodologies': '#f43f5e',
  'Agentic AI': '#06b6d4',
}

export function transformSkillsToGraphData(skills: Skill[]): GraphData {
  // Create nodes from skills
  const nodes: GraphNode[] = skills.map(skill => ({
    id: skill.id,
    name: skill.name,
    category: skill.category,
    proficiency: skill.proficiency,
    level: skill.level,
    color: categoryColors[skill.category] || '#888888',
    val: skill.proficiency / 10 // Node size based on proficiency
  }))

  // Create links from related skills
  const links: GraphLink[] = []
  const processedPairs = new Set<string>()

  skills.forEach(skill => {
    skill.relatedSkills.forEach(relatedId => {
      // Create a unique key for this pair (sorted to avoid A-B and B-A duplicates)
      const pairKey = [skill.id, relatedId].sort().join('-')

      if (!processedPairs.has(pairKey)) {
        processedPairs.add(pairKey)
        links.push({
          source: skill.id,
          target: relatedId,
          value: 1
        })
      }
    })
  })

  return { nodes, links }
}

// Calculate statistics for the graph
export function calculateGraphStats(graphData: GraphData) {
  const totalNodes = graphData.nodes.length
  const totalLinks = graphData.links.length
  const avgProficiency = graphData.nodes.reduce((sum, node) => sum + node.proficiency, 0) / totalNodes

  // Find most connected skill
  const connections = new Map<string, number>()
  graphData.links.forEach(link => {
    connections.set(link.source, (connections.get(link.source) || 0) + 1)
    connections.set(link.target, (connections.get(link.target) || 0) + 1)
  })

  const mostConnected = Array.from(connections.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => ({
      skill: graphData.nodes.find(n => n.id === id),
      connections: count
    }))

  return {
    totalNodes,
    totalLinks,
    avgProficiency: Math.round(avgProficiency),
    mostConnected
  }
}
