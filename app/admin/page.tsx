import { ShieldCheck, UserMinus, FileText, TrendingUp, AlertTriangle, Users, Key, Gamepad2 } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card } from "@/components/ui/card"
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
      { title: "Global Cheats", value: total_modules.toString(), icon: Gamepad2 },
      { title: "Security Alerts", value: recent_logs.length.toString(), icon: AlertTriangle },
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
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <div className="mb-10 flex items-center justify-between">
            <div className="flex items-center gap-3 text-primary">
                <ShieldCheck className="h-7 w-7" />
                <h1 className="text-2xl font-bold uppercase tracking-tighter">Terminal // Admin Center</h1>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
                System Status: Nominal
            </div>
        </div>

        {/* Global Metrics - Unified Style */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {overview.stats.map((stat, i) => (
            <StatCard
              key={i}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Security Logs */}
          <Card className="lg:col-span-2 border-border bg-background p-6">
            <div className="mb-6 flex items-center gap-2 border-b border-border pb-4">
                <AlertTriangle className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <span className="text-xs font-bold uppercase tracking-widest text-foreground">Security Sentinel // Recent Intel</span>
            </div>

            <div className="space-y-4">
                {overview.logs.length === 0 ? (
                    <div className="py-20 text-center text-muted-foreground italic text-xs uppercase tracking-widest">No critical events recorded in this cycle.</div>
                ) : (
                    overview.logs.map((log) => (
                        <div key={log.id} className="flex items-start justify-between border-b border-border/50 pb-3 group hover:bg-secondary/20 p-2 transition-colors">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className={`h-1.5 w-1.5 rounded-full ${log.severity === 'high' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-primary'}`} />
                                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">{log.event}</span>
                                    <span className="text-[10px] text-muted-foreground font-mono">[{log.user}]</span>
                                </div>
                                <div className="text-[10px] text-muted-foreground pl-3.5 italic">{log.detail}</div>
                            </div>
                            <div className="text-[9px] text-muted-foreground font-mono uppercase">{log.time}</div>
                        </div>
                    ))
                )}
            </div>
          </Card>

          {/* Infrastructure Context */}
          <Card className="border-border bg-background p-6 h-fit">
            <div className="mb-6 flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs">
                QUICK DEPLOY
            </div>
            <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-md border border-border bg-background hover:bg-primary/5 transition-colors group">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Wipe Shared HWIDs</span>
                    <AlertTriangle className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-md border border-border bg-background hover:bg-primary/5 transition-colors group">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Global Compensation</span>
                    <TrendingUp className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-md border border-border bg-background hover:bg-primary/5 transition-colors group">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Cycle Hashes</span>
                    <ShieldCheck className="h-3 w-3 text-muted-foreground group-hover:text-primary" />
                </button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
