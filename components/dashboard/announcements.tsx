import { Megaphone } from "lucide-react"

interface Announcement {
  id: string
  title: string
  description: string | React.ReactNode
  date: string
}

interface AnnouncementsProps {
  announcements: Announcement[]
}

export function Announcements({ announcements }: AnnouncementsProps) {
  return (
    <div className="rounded-md border border-border bg-background">
      <div className="flex items-center gap-2 border-b border-border px-5 py-3">
        <Megaphone className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
          Announcements
        </h2>
      </div>

      <div className="divide-y divide-border">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground">
                  {announcement.title}
                </h3>
                <div className="mt-1 text-sm text-muted-foreground">
                  {announcement.description}
                </div>
              </div>
              <time className="shrink-0 text-sm text-muted-foreground">
                {announcement.date}
              </time>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
