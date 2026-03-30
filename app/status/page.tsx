import { Info, Snowflake } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type CheatStatus = "UNDETECTED" | "DETECTED" | "UPDATING" | "TESTING"

interface Cheat {
  id: string
  name: string
  status: CheatStatus
  lastUpdate: string
  frozen?: boolean
}

const cheats: Cheat[] = [
  { id: "1", name: "XDefiant", status: "UNDETECTED", lastUpdate: "12/04/2025, 14:37" },
  { id: "2", name: "Rainbow Six Siege Lite", status: "UPDATING", lastUpdate: "28/10/2025, 23:02", frozen: true },
  { id: "3", name: "Rainbow Six Siege Full", status: "UPDATING", lastUpdate: "28/10/2025, 23:05", frozen: true },
  { id: "4", name: "Marvel Rivals", status: "UNDETECTED", lastUpdate: "27/03/2026, 21:15" },
  { id: "5", name: "Dead by Daylight", status: "UNDETECTED", lastUpdate: "19/03/2026, 19:07" },
  { id: "6", name: "DayZ Standalone", status: "UNDETECTED", lastUpdate: "28/10/2025, 23:16" },
  { id: "7", name: "Apex Legends Lite", status: "UPDATING", lastUpdate: "08/04/2025, 21:28", frozen: true },
  { id: "8", name: "Battleye HWID Spoofer", status: "UNDETECTED", lastUpdate: "N/A" },
]

const statusInfo = [
  { status: "UNDETECTED", color: "bg-green-600", description: "cheat is online and safe to use" },
  { status: "DETECTED", color: "bg-red-600", description: "cheat is offline due to detection" },
  { status: "UPDATING", color: "bg-yellow-600", description: "cheat is offline due to a game update and is currently being updated" },
  { status: "TESTING", color: "bg-blue-600", description: "cheat is online and is open for testing while it may be unsafe or partially functional / unstable" },
]

function StatusBadge({ status }: { status: CheatStatus }) {
  const colorMap: Record<CheatStatus, string> = {
    UNDETECTED: "bg-green-600 hover:bg-green-600",
    DETECTED: "bg-red-600 hover:bg-red-600",
    UPDATING: "bg-yellow-600 hover:bg-yellow-600",
    TESTING: "bg-blue-600 hover:bg-blue-600",
  }

  return (
    <Badge className={`${colorMap[status]} text-xs font-medium text-white`}>
      {status}
    </Badge>
  )
}

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-48 min-h-screen space-y-6 p-6">
        {/* Information Card */}
        <Card className="border-border bg-card p-6">
          <div className="mb-4 flex items-center gap-2 text-foreground">
            <Info className="h-5 w-5" />
            <span className="font-semibold">INFORMATION</span>
          </div>

          <div className="space-y-2">
            {statusInfo.map((info) => (
              <div key={info.status} className="flex items-center gap-3">
                <Badge className={`${info.color} text-xs font-medium text-white`}>
                  {info.status}
                </Badge>
                <span className="text-sm text-foreground">- {info.description}</span>
              </div>
            ))}
          </div>

          <p className="mt-4 flex items-center gap-2 text-foreground">
            If a cheat is frozen it will have a snowflake next to it
            <Snowflake className="h-4 w-4" />
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            {"Note: When a cheat is marked as undetected it does not mean you can't get banned from manual reports from raging!"}
          </p>
        </Card>

        {/* Status Table */}
        <Card className="border-border bg-card">
          <div className="grid grid-cols-3 border-b border-border px-6 py-4">
            <span className="font-semibold text-foreground">Name</span>
            <span className="font-semibold text-foreground">Status</span>
            <span className="font-semibold text-foreground">Last Cheat Update</span>
          </div>

          <div className="divide-y divide-border">
            {cheats.map((cheat) => (
              <div key={cheat.id} className="grid grid-cols-3 px-6 py-4">
                <span className="flex items-center gap-2 text-foreground">
                  {cheat.name}
                  {cheat.frozen && <Snowflake className="h-4 w-4 text-muted-foreground" />}
                </span>
                <div>
                  <StatusBadge status={cheat.status} />
                </div>
                <span className="text-foreground">{cheat.lastUpdate}</span>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
