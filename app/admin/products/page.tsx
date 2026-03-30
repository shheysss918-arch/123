import { Package, Plus, Trash2, Edit, ExternalLink, Activity } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { connect_to_db } from "@/lib/mongodb"

async function get_products_admin() {
  const db = await connect_to_db();
  return await db.collection('products').find({}).toArray();
}

export default async function AdminProductsPage() {
  const products = await get_products_admin();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-primary">
                <Package className="h-5 w-5" />
                <h1 className="text-sm font-semibold uppercase tracking-wide">Module Manifest // Branch Control</h1>
            </div>
            <button className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[10px] font-black text-black uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 border border-primary/20">
                <Plus className="h-3 w-3" />
                Register New Branch
            </button>
        </div>

        {/* Unified List View (CLEAN STYLE) */}
        <div className="rounded-md border border-border bg-background overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <Activity className="h-4 w-4 text-primary" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-primary">Active Modules</h2>
            </div>

            <div className="divide-y divide-border">
                {products.length === 0 ? (
                    <div className="px-5 py-20 text-center text-muted-foreground italic text-sm">No active development branches registered in the manifest.</div>
                ) : products.map((p) => (
                    <div key={p._id.toString()} className="px-5 py-4 hover:bg-secondary/20 transition-colors">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 border border-border overflow-hidden bg-secondary">
                                    <img src={p.image} className="h-full w-full object-cover grayscale opacity-50" />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-base font-semibold text-foreground uppercase tracking-tight">{p.name}</h3>
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase">
                                        <span className="text-primary font-black">v{p.version || '1.0.0'}</span>
                                        <span className="text-muted-foreground">| {p.status || 'Active'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pr-2">
                                <button className="p-2 border border-border hover:bg-primary hover:text-black transition-colors rounded"><Edit className="h-3 w-3" /></button>
                                <button className="p-2 border border-border hover:bg-primary hover:text-black transition-colors rounded"><ExternalLink className="h-3 w-3" /></button>
                                <button className="p-2 border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded"><Trash2 className="h-3 w-3" /></button>
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
