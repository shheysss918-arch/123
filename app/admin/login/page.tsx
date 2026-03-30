"use client"

import { useState } from "react"
import { ShieldCheck, Lock, User, Terminal } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isForging, setIsForging] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    if (!username || !password) return toast.error("ACCESS_DENIED: MISSING_IDENTITY_HASH")
    
    setIsForging(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (data.status === 'ok') {
        toast.success("SESSION_ESTABLISHED // COMMAND_CENTER_AUTHORIZED")
        localStorage.setItem('is_admin_mode', 'true')
        router.push('/admin')
      } else {
        toast.error("INVALID_CREDENTIALS // IDENTITY_MISMATCH")
      }
    } catch (e) {
      toast.error("RELAY_FAILURE // PACKET_LOSS_CRITICAL")
    } finally {
      setIsForging(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <Card className="w-full max-w-md border-border bg-card shadow-2xl relative overflow-hidden p-8 border-t-2 border-t-primary">
        <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary border border-border">
                <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tighter text-foreground">Access Terminal</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1 font-bold">Authorized Operators Only</p>
        </div>

        <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-[10px] text-muted-foreground uppercase tracking-widest pl-1 font-bold">Identity</Label>
                <div className="relative group">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="OPERATOR_ID" 
                      className="pl-10 border-border bg-secondary/50 focus:border-primary/50 transition-all rounded-none h-11 uppercase font-mono text-xs tracking-widest" 
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-[10px] text-muted-foreground uppercase tracking-widest pl-1 font-bold">Cipher</Label>
                <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="pl-10 border-border bg-secondary/50 focus:border-primary/50 transition-all rounded-none h-11 tracking-widest" 
                    />
                </div>
            </div>

            <Button 
                onClick={handleLogin}
                disabled={isForging}
                className="w-full h-12 bg-primary text-black font-black uppercase tracking-[0.2em] rounded-none hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50"
            >
                {isForging ? (
                    <div className="flex items-center gap-2 animate-pulse">
                        <Terminal className="h-4 w-4" />
                        INITIATING...
                    </div>
                ) : "ESTABLISH_SESSION"}
            </Button>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex justify-between items-center text-[9px] text-muted-foreground font-mono uppercase">
            <span>Security Node: 1.0-PROD</span>
            <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" />
                D-RELAY ACTIVE
            </span>
        </div>
      </Card>
    </div>
  )
}
