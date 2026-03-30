"use client"

import { useState, useEffect } from "react"
import { Key as KeyIcon, Copy, Plus } from "lucide-react"
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
    if (!product) return toast.error("Please select a product")
    
    try {
      const res = await fetch('/api/admin/licenses/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, days, amount })
      })
      const data = await res.json()
      if (data.status === 'ok') {
        setGeneratedKeys(data.keys)
        toast.success(`Generated ${data.keys.length} license keys`)
      }
    } catch (e) {
      toast.error("Failed to generate licenses")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Generate Licenses */}
          <Card className="border-border bg-card p-6 lg:col-span-1">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Plus className="h-5 w-5" />
              <span className="font-semibold uppercase">Generate Licenses</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Product</Label>
                <Select onValueChange={setProduct}>
                  <SelectTrigger className="border-border bg-secondary">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map(p => (
                      <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Duration (Days)</Label>
                <Input type="number" value={days} onChange={e => setDays(e.target.value)} className="border-border bg-secondary" />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Quantity</Label>
                <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="border-border bg-secondary" />
              </div>

              <Button onClick={handleGenerate} className="w-full">
                Generate Keys
              </Button>
            </div>
          </Card>

          {/* Generated Keys */}
          <Card className="border-border bg-card p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary">
                <KeyIcon className="h-5 w-5" />
                <span className="font-semibold uppercase">Generated Keys</span>
              </div>
              {generatedKeys.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedKeys.join('\n'))} className="gap-1">
                  <Copy className="h-3 w-3" />
                  Copy All
                </Button>
              )}
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {generatedKeys.length === 0 ? (
                <p className="py-8 text-center text-muted-foreground">
                  No keys generated yet
                </p>
              ) : (
                generatedKeys.map((k, i) => (
                  <div key={i} className="flex items-center justify-between rounded-md border border-border bg-secondary/50 p-3 group hover:border-primary/50 transition-colors">
                    <span className="font-mono text-sm">{k}</span>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(k)} className="opacity-0 group-hover:opacity-100">
                      <Copy className="h-3 w-3" />
                    </Button>
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
