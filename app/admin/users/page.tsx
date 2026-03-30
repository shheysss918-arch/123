import { Suspense } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { UsersList, UsersListSkeleton } from "@/components/admin/users-list"
import { connect_to_db } from "@/lib/mongodb"

interface UserSub {
  product: string
  days_left: number
}

interface UserData {
  id: string
  username: string
  hwid: string
  subscriptions: UserSub[]
}

async function get_users(): Promise<UserData[]> {
  const db = await connect_to_db()
  const users = await db.collection("users").find({}).toArray()
  const subs = await db.collection("subscriptions").find({}).toArray()

  return users.map((user) => {
    const user_subs = subs.filter((s) => s.uid === user._id.toString())
    return {
      id: user._id.toString(),
      username: (user.username as string) || "Unknown",
      hwid: (user.hwid as string) || "Not Set",
      subscriptions: user_subs.map((s) => ({
        product: s.plan as string,
        days_left: Math.max(0, Math.ceil(((s.end_date as number) - Date.now()) / 86400000)),
      })),
    }
  })
}

async function UsersContent() {
  const users = await get_users()
  return <UsersList initialUsers={users} />
}

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="md:ml-48 min-h-screen p-4 md:p-6 pt-20 md:pt-6">
        <Suspense fallback={<UsersListSkeleton />}>
          <UsersContent />
        </Suspense>
      </main>
    </div>
  )
}
