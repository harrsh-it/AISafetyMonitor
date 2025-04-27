"use client"

import { useState } from "react"
import { IncidentList } from "@/components/incident-list"
import { ReportForm } from "@/components/report-form"
import { FilterControls } from "@/components/filter-controls"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data
const initialIncidents = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description:
      "Algorithm consistently favored certain demographics in job recommendations, leading to unequal opportunity distribution across different user groups. The issue was identified through an internal audit of recommendation patterns.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description:
      "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description:
    "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
 
]

export type Incident = {
  id: number
  title: string
  description: string
  severity: "Low" | "Medium" | "High"
  reported_at: string
}

export type SortOrder = "newest" | "oldest"
export type SeverityFilter = "All" | "Low" | "Medium" | "High"

export function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents)
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("All")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const [expandedIncidentId, setExpandedIncidentId] = useState<number | null>(null)

  // Filter incidents by severity
  const filteredIncidents = incidents.filter(
    (incident) => severityFilter === "All" || incident.severity === severityFilter,
  )

  // Sort incidents by date
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime()
    const dateB = new Date(b.reported_at).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  // Add new incident
  const handleAddIncident = (newIncident: Omit<Incident, "id" | "reported_at">) => {
    const now = new Date().toISOString()
    const id = Math.max(0, ...incidents.map((inc) => inc.id)) + 1

    setIncidents([
      ...incidents,
      {
        ...newIncident,
        id,
        reported_at: now,
      },
    ])
  }

  // Toggle expanded incident
  const toggleExpandIncident = (id: number) => {
    setExpandedIncidentId(expandedIncidentId === id ? null : id)
  }

  return (
    <div className="space-y-8 ">
      <Card>
        <CardHeader>
          <CardTitle>AI Safety Incident Dashboard</CardTitle>
          <CardDescription>Track and manage AI safety incidents across various systems and platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <FilterControls 
            severityFilter={severityFilter}
            setSeverityFilter={setSeverityFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="incidents">
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="incidents">Incident List</TabsTrigger>
          <TabsTrigger value="report">Report New Incident</TabsTrigger>
        </TabsList>
        <TabsContent value="incidents" className="mt-4">
          <IncidentList
            incidents={sortedIncidents}
            expandedIncidentId={expandedIncidentId}
            toggleExpandIncident={toggleExpandIncident}
          />
        </TabsContent>
        <TabsContent value="report" className="mt-4">
          <ReportForm onSubmit={handleAddIncident} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
