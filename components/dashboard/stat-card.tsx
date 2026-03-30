import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-md border border-border bg-background px-5 py-4">
      <div className="flex h-12 w-12 items-center justify-center">
        <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
          {title}
        </p>
        <p className="text-lg font-medium text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}
