import { Users, Key, Gamepad2, Plus, LucideIcon } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StatCard } from "@/components/dashboard/stat-card"
import { Announcements } from "@/components/dashboard/announcements"
import { RedeemModal } from "@/components/dashboard/redeem-modal"
import { Button } from "@/components/ui/button"
import { connect_to_db } from "@/lib/mongodb"

interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
}

async function get_stats(): Promise<StatItem[]> {
  const db = await connect_to_db();
  const user_count = await db.collection('users').countDocuments();
  const sub_count = await db.collection('subscriptions').countDocuments();
  const module_count = await db.collection('products').countDocuments();

  return [
    { title: "Users", value: user_count.toString(), icon: Users },
    { title: "Licenses", value: sub_count.toString(), icon: Key },
    { title: "Cheats", value: module_count.toString(), icon: Gamepad2 },
  ];
}

const announcements = [
  {
    id: "1",
    title: "Dead by Daylight Cheat Updated",
    description: "Dead by Daylight cheat has been updated for the latest game version.",
    date: "18/03/2026, 21:55",
  },
  {
    id: "2",
    title: "Dead by Daylight Cheat Released",
    description: "Dead by Daylight Cheat Released",
    date: "12/03/2026, 18:16",
  },
];

export default async function DashboardPage() {
  const stats = await get_stats();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <div className="flex items-center justify-end pb-6">
          <RedeemModal>
            <Button variant="ghost" className="gap-2 text-foreground hover:text-primary border border-border/50">
              <Plus className="h-4 w-4" />
              Redeem a License
            </Button>
          </RedeemModal>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="mt-6">
          <Announcements announcements={announcements} />
        </div>
      </main>
    </div>
  )
}
