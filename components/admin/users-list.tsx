"use client"

import { useState } from "react"
import { Users as UsersIcon, Clock, Ban, Edit, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

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

interface UsersListProps {
  initialUsers: UserData[]
}

export function UsersList({ initialUsers }: UsersListProps) {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toLowerCase().includes(search.toLowerCase())
  )

  const handleBan = async (userId: string, username: string) => {
    // In a real app, this would call an API
    setUsers(users.filter((u) => u.id !== userId))
    toast.success(`${username} has been banned`)
  }

  return (
    <Card className="border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-border p-4">
        <div className="flex items-center gap-2 text-primary">
          <UsersIcon className="h-5 w-5" />
          <span className="font-semibold uppercase">Users</span>
          <span className="text-sm text-muted-foreground">({filteredUsers.length})</span>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="divide-y divide-border">
        {filteredUsers.length === 0 ? (
          <p className="p-6 text-center text-muted-foreground">No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{user.username}</h3>
                    <span className="text-xs text-muted-foreground">#{user.id.slice(-6)}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="hidden sm:inline">HWID: {user.hwid}</span>
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
                  <Button variant="outline" size="sm" className="gap-1 hidden sm:flex">
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="icon" className="sm:hidden">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <ConfirmDialog
                    title={`Ban ${user.username}?`}
                    description="This will immediately revoke their access to all products. This action cannot be undone."
                    confirmText="Ban User"
                    variant="destructive"
                    onConfirm={() => handleBan(user.id, user.username)}
                  >
                    <Button variant="destructive" size="sm" className="gap-1 hidden sm:flex">
                      <Ban className="h-3 w-3" />
                      Ban
                    </Button>
                  </ConfirmDialog>
                  <ConfirmDialog
                    title={`Ban ${user.username}?`}
                    description="This will immediately revoke their access. This action cannot be undone."
                    confirmText="Ban"
                    variant="destructive"
                    onConfirm={() => handleBan(user.id, user.username)}
                  >
                    <Button variant="destructive" size="icon" className="sm:hidden">
                      <Ban className="h-4 w-4" />
                    </Button>
                  </ConfirmDialog>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

export function UsersListSkeleton() {
  return (
    <Card className="border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-9 w-64" />
      </div>

      <div className="divide-y divide-border">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
