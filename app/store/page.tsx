import { Star } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { connect_to_db } from "@/lib/mongodb"

async function get_products() {
  const db = await connect_to_db();
  return await db.collection('products').find({}).toArray();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    undetected: "bg-emerald-500",
    updating: "bg-yellow-500",
    detected: "bg-red-500",
  }
  return (
    <span className={`h-2 w-2 rounded-full ${colors[status] || colors.undetected}`} />
  )
}

export default async function StorePage() {
  const products = await get_products();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="md:ml-48 min-h-screen p-4 md:p-6 pt-20 md:pt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product._id.toString()}
              className="overflow-hidden border-border bg-card hover:border-primary/50 transition-colors group"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={product.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground uppercase">{product.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <StatusDot status={product.status || "undetected"} />
                      <span className="capitalize">{product.status || "undetected"}</span>
                      <span className="text-border">|</span>
                      <span>v{product.version || "1.0.0"}</span>
                    </div>
                  </div>
                  <StarRating rating={product.rating || 5} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-foreground">
                    <span className="text-xl font-bold">${product.price || "19.99"}</span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <Button size="sm">Purchase</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No products available</p>
        )}
      </main>
    </div>
  )
}
