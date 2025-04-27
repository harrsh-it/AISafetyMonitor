"use client"

import type { Incident } from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"

interface IncidentListProps {
  incidents: Incident[]
  expandedIncidentId: number | null
  toggleExpandIncident: (id: number) => void
}

export function IncidentList({ incidents, expandedIncidentId, toggleExpandIncident }: IncidentListProps) {
  if (incidents.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/50">
        <p className="text-muted-foreground">No incidents match your current filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 " id="incident-list">
      {incidents.map((incident) => (
        <Card key={incident.id} className="overflow-hidden">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-2xl">{incident.title}</h3>
                <SeverityBadge severity={incident.severity} />
              </div>
              <p className="text-base text-muted-foreground">Reported: {formatDate(incident.reported_at)}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleExpandIncident(incident.id)}
              aria-expanded={expandedIncidentId === incident.id}
              aria-label={expandedIncidentId === incident.id ? "Collapse details" : "Expand details"}
            >
              {expandedIncidentId === incident.id ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          {expandedIncidentId === incident.id && (
            <CardContent className="p-4 pt-0">
              <div className="text-base mt-2 border-t pt-2">
                <p>{incident.description}</p>
              </div>
            </CardContent>
          )}
          <CardFooter className="p-4 pt-0 flex justify-start">
            <Button variant="outline" size="sm" onClick={() => toggleExpandIncident(incident.id)}>
              {expandedIncidentId === incident.id ? "Hide Details" : "View Details"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function SeverityBadge({ severity }: { severity: string }) {
  const variants = {
    Low: "bg-green-100 text-green-800 hover:bg-green-100",
    Medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    High: "bg-red-100 text-red-800 hover:bg-red-100",
  }

  const variant = severity as keyof typeof variants

  return (
    <Badge className={variants[variant]} variant="outline">
      {severity}
    </Badge>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}
