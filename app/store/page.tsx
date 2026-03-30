import { Star } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card } from "@/components/ui/card"
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
              className="overflow-hidden border-border bg-card hover:border-primary/50 transition-colors cursor-pointer group"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={product.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground uppercase">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Version <span className="text-primary">{product.version || "1.0.0"}</span>
                  </p>
                </div>
                <StarRating rating={product.rating || 5} />
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
