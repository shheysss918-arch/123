"use client"

import { useState } from "react"
import { Key, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RedeemModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [license, setLicense] = useState("")

  const handleRedeem = () => {
    // Handle redeem logic here
    setOpen(false)
    setLicense("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Key className="h-5 w-5" />
            REDEEM A LICENSE
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="license" className="text-foreground">
              License
            </Label>
            <Input
              id="license"
              placeholder="0000-XXXX-0000-XXXX-0000"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="border-border bg-secondary text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button
            onClick={handleRedeem}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Redeem
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function DashboardActions() {
  return (
    <div className="flex items-center justify-end pb-6">
      <RedeemModal>
        <Button variant="ghost" className="gap-2 text-foreground hover:text-primary border border-border/50">
          <Plus className="h-4 w-4" />
          Redeem a License
        </Button>
      </RedeemModal>
    </div>
  )
}
