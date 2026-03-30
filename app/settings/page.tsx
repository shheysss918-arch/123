"use client"

import { useState } from "react"
import { PlusSquare, User, CreditCard } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleUpdatePassword = () => {
    // Handle password update logic here
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="md:ml-48 min-h-screen p-4 md:p-6 pt-20 md:pt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Update Password Card */}
          <Card className="border-border bg-card p-6">
            <div className="mb-6 flex items-center gap-2 text-primary">
              <PlusSquare className="h-5 w-5" />
              <span className="font-semibold uppercase">Update Password</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-foreground">
                  Current Password
                </Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="border-border bg-secondary text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-foreground">
                  Password
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border-border bg-secondary text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-foreground">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-border bg-secondary text-foreground"
                />
              </div>

              <Button
                onClick={handleUpdatePassword}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Update
              </Button>
            </div>
          </Card>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Information Card */}
            <Card className="border-border bg-card p-6">
              <div className="mb-6 flex items-center gap-2 text-primary">
                <User className="h-5 w-5" />
                <span className="font-semibold uppercase">Information</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Username</span>
                  <span className="text-foreground">fgsdfg</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Email</span>
                  <span className="text-foreground">sja374653@gmail.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Registered</span>
                  <span className="text-foreground">3/29/2026, 4:54:05 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Discord</span>
                  <span className="text-muted-foreground">Not Linked</span>
                </div>
              </div>
            </Card>

            {/* Subscriptions Card */}
            <Card className="border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <CreditCard className="h-5 w-5" />
                <span className="font-semibold uppercase">Subscriptions</span>
              </div>

              <p className="text-muted-foreground">No subscriptions</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
