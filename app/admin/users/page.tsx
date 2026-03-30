import { Users as UsersIcon, ShieldAlert, Clock, Ban } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { connect_to_db } from "@/lib/mongodb"

interface UserSub {
  product: string;
  days_left: number;
}

interface UserData {
  id: string;
  username: string;
  hwid: string;
  subscriptions: UserSub[];
}

async function get_users(): Promise<UserData[]> {
  const db = await connect_to_db();
  const users = await db.collection('users').find({}).toArray();
  const subs  = await db.collection('subscriptions').find({}).toArray();
  
  return users.map(user => {
    const user_subs = subs.filter(s => s.uid === user._id.toString());
    return {
      id: user._id.toString(),
      username: (user.username as string) || 'OPERATOR_ID',
      hwid: (user.hwid as string) || 'GENESIS_ID',
      subscriptions: user_subs.map(s => ({
        product: s.plan as string,
        days_left: Math.max(0, Math.ceil(((s.end_date as number) - Date.now()) / 86400000))
      }))
    };
  });
}

export default async function AdminUsersPage() {
  const users = await get_users();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-primary">
                <UsersIcon className="h-5 w-5" />
                <h1 className="text-sm font-semibold uppercase tracking-wide">Registry // User Command</h1>
            </div>
        </div>

        {/* Unified List View (CLEAN STYLE) */}
        <div className="rounded-md border border-border bg-background overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <ShieldAlert className="h-4 w-4 text-primary" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-primary">Identity Manifest</h2>
            </div>

            <div className="divide-y divide-border">
                {users.length === 0 ? (
                    <div className="px-5 py-20 text-center text-muted-foreground italic text-sm">Awaiting registry entries...</div>
                ) : users.map((user) => (
                    <div key={user.id} className="px-5 py-4 hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-semibold text-foreground">{user.username}</h3>
                                    <span className="text-[10px] text-muted-foreground font-mono px-1.5 py-0.5 border border-border bg-secondary">ID: {user.id}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5"><ShieldAlert className="h-3 w-3" /> HWID: {user.hwid}</span>
                                    <div className="flex gap-2">
                                        {user.subscriptions.map((sub, i) => (
                                            <span key={i} className="flex items-center gap-1 text-[10px] text-primary uppercase font-bold">
                                                <Clock className="h-2 w-2" /> {sub.product}: {sub.days_left}d
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="rounded px-3 py-1.5 text-[10px] font-bold uppercase border border-border bg-secondary hover:bg-primary transition-colors hover:text-black">Edit</button>
                                <button className="rounded px-3 py-1.5 text-[10px] font-bold uppercase border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-colors">Ban</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  )
}
