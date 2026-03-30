import { Package, Plus, Trash2, Edit, ExternalLink } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { connect_to_db } from "@/lib/mongodb"

async function get_products_admin() {
  const db = await connect_to_db();
  return await db.collection('products').find({}).toArray();
}

export default async function AdminProductsPage() {
  const products = await get_products_admin();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Package className="h-5 w-5" />
            <span className="font-semibold uppercase">Products</span>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        <Card className="border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {products.length === 0 ? (
              <p className="p-6 text-center text-muted-foreground">No products found</p>
            ) : products.map((p) => (
              <div key={p._id.toString()} className="p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md border border-border overflow-hidden bg-secondary">
                      <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{p.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">v{p.version || '1.0.0'}</span>
                        <span>|</span>
                        <span>{p.status || 'Active'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
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
