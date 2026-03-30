import { Users, Key, Gamepad2, AlertTriangle, RefreshCw, Gift, Shield } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { connect_to_db } from "@/lib/mongodb"

async function get_admin_overview() {
  const db = await connect_to_db();
  const total_users = await db.collection('users').countDocuments();
  const total_licenses_used = await db.collection('licenses').countDocuments({ used: true });
  const total_modules = await db.collection('products').countDocuments();
  const recent_logs = await db.collection('event_logs').find({}).sort({ timestamp: -1 }).limit(10).toArray();

  return {
    stats: [
      { title: "Total Users", value: total_users.toString(), icon: Users },
      { title: "Active Licenses", value: total_licenses_used.toString(), icon: Key },
      { title: "Products", value: total_modules.toString(), icon: Gamepad2 },
      { title: "Recent Events", value: recent_logs.length.toString(), icon: AlertTriangle },
    ],
    logs: recent_logs.map(log => ({
      id: log._id.toString(),
      event: log.event as string || 'Unknown Event',
      user: log.username as string || 'System',
      detail: log.details as string || 'N/A',
      time: new Date(log.timestamp).toLocaleString(),
      severity: log.severity || 'low'
    }))
  };
}

export default async function AdminDashboardPage() {
  const overview = await get_admin_overview();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {overview.stats.map((stat, i) => (
            <StatCard
              key={i}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 border-border bg-card p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold uppercase">Recent Activity</span>
            </div>

            <div className="space-y-3">
              {overview.logs.length === 0 ? (
                <p className="text-muted-foreground py-8 text-center">No recent activity</p>
              ) : (
                overview.logs.map((log) => (
                  <div key={log.id} className="flex items-start justify-between border-b border-border pb-3 last:border-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${log.severity === 'high' ? 'bg-red-500' : 'bg-primary'}`} />
                        <span className="text-sm font-medium text-foreground">{log.event}</span>
                        <span className="text-xs text-muted-foreground">({log.user})</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-4">{log.detail}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.time}</span>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border bg-card p-6 h-fit">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <span className="font-semibold uppercase">Quick Actions</span>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <RefreshCw className="h-4 w-4" />
                Reset All HWIDs
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Gift className="h-4 w-4" />
                Add Compensation
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Shield className="h-4 w-4" />
                Refresh Security
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
