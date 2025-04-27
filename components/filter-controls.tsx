"use client"

import type { SeverityFilter, SortOrder } from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownAZ, ArrowUpAZ } from "lucide-react"

interface FilterControlsProps {
  severityFilter: SeverityFilter
  setSeverityFilter: (filter: SeverityFilter) => void
  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void
}

export function FilterControls({ severityFilter, setSeverityFilter, sortOrder, setSortOrder }: FilterControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex flex-col sm:flex-row gap-36 items-start sm:items-center">
        <div className="flex flex-col gap-1">
          <label htmlFor="severity-filter" className="text-sm font-medium">
            Severity
          </label>
          <Select value={severityFilter} onValueChange={(value) => setSeverityFilter(value as SeverityFilter)}>
            <SelectTrigger id="severity-filter" className="w-[140px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Severities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="sort-order" className="text-sm font-medium">
            Sort by Date
          </label>
          <div className="flex gap-2">
            <Button
              variant={sortOrder === "newest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortOrder("newest")}
              className="flex items-center gap-1"
            >
              <ArrowDownAZ className="h-4 w-4" />
              Newest
            </Button>
            <Button
              variant={sortOrder === "oldest" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortOrder("oldest")}
              className="flex items-center gap-1"
            >
              <ArrowUpAZ className="h-4 w-4" />
              Oldest
            </Button>
          </div>
        </div>
      </div>

      <div className="text-lg text-muted-foreground">
        Result : Showing {severityFilter === "All" ? "all" : severityFilter} incidents,{" "}
        {sortOrder === "newest" ? "newest first" : "oldest first"}
      </div>
    </div>
  )
}
