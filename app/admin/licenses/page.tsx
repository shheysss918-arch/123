"use client"

import { useState, useEffect } from "react"
import { Key as KeyIcon, Download, Plus, Trash2, Clock, CheckCircle, XCircle } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function AdminLicensesPage() {
  const [product, setProduct] = useState("")
  const [days, setDays] = useState("30")
  const [amount, setAmount] = useState("1")
  const [generatedKeys, setGeneratedKeys] = useState<string[]>([])
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => {
      if (Array.isArray(data)) setProducts(data)
    }).catch(e => console.error(e))
  }, [])

  const handleGenerate = async () => {
    if (!product) return toast.error("Select a target production branch.")
    
    try {
      const res = await fetch('/api/admin/licenses/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, days, amount })
      })
      const data = await res.json()
      if (data.status === 'ok') {
        setGeneratedKeys(data.keys)
        toast.success(`Successfully forged ${data.keys.length} entitlements.`)
      }
    } catch (e) {
      toast.error("Cryptographic foundry relay failure.")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Identity key localized to clipboard.")
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <div className="mb-8 flex items-center gap-3 text-primary">
          <KeyIcon className="h-6 w-6" />
          <h1 className="text-2xl font-bold uppercase tracking-tighter">Terminal: Key Forge</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Generation Params */}
          <Card className="border-border bg-card p-6 lg:col-span-1">
            <div className="mb-6 flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs">
              <Plus className="h-4 w-4" />
              Forge Dispatch
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] text-muted-foreground uppercase tracking-widest">Branch</Label>
                <Select onValueChange={setProduct}>
                  <SelectTrigger className="border-border bg-secondary">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {products.map(p => (
                      <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] text-muted-foreground uppercase tracking-widest">Duration (Days)</Label>
                <Input type="number" value={days} onChange={e => setDays(e.target.value)} className="border-border bg-secondary" />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] text-muted-foreground uppercase tracking-widest">Quantity</Label>
                <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="border-border bg-secondary" />
              </div>

              <Button onClick={handleGenerate} className="w-full bg-primary text-black font-bold hover:bg-primary/90 mt-4 rounded-none h-12 uppercase tracking-widest">
                Initiate Key Forging
              </Button>
            </div>
          </Card>

          {/* Results Area */}
          <Card className="border-border bg-card p-6 lg:col-span-2">
             <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-xs">
                  <Download className="h-4 w-4" />
                  Harvested Entitlements
                </div>
                {generatedKeys.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(generatedKeys.join('\n'))} className="text-[10px] uppercase tracking-widest border border-border">Copy All</Button>
                )}
             </div>

             <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {generatedKeys.length === 0 ? (
                  <div className="py-20 text-center text-muted-foreground italic text-sm">
                    Awaiting dispatch instructions...
                  </div>
                ) : (
                  generatedKeys.map((k, i) => (
                    <div key={i} className="flex items-center justify-between bg-secondary/30 border border-border p-3 group hover:border-primary/50 transition-colors">
                      <span className="font-mono text-sm tracking-widest">{k}</span>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(k)} className="opacity-0 group-hover:opacity-100 text-[10px] uppercase">Copy</Button>
                    </div>
                  ))
                )}
             </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
