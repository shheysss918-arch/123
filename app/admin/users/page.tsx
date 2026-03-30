import { Users as UsersIcon, Clock, Ban, Edit } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
      username: (user.username as string) || 'Unknown',
      hwid: (user.hwid as string) || 'Not Set',
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
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <Card className="border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border p-4">
            <UsersIcon className="h-5 w-5 text-primary" />
            <span className="font-semibold uppercase text-foreground">Users</span>
          </div>

          <div className="divide-y divide-border">
            {users.length === 0 ? (
              <p className="p-6 text-center text-muted-foreground">No users found</p>
            ) : users.map((user) => (
              <div key={user.id} className="p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{user.username}</h3>
                      <span className="text-xs text-muted-foreground">#{user.id.slice(-6)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>HWID: {user.hwid}</span>
                      {user.subscriptions.length > 0 && (
                        <div className="flex gap-2">
                          {user.subscriptions.map((sub, i) => (
                            <span key={i} className="flex items-center gap-1 text-primary">
                              <Clock className="h-3 w-3" />
                              {sub.product}: {sub.days_left}d
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="gap-1">
                      <Ban className="h-3 w-3" />
                      Ban
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  )
}
