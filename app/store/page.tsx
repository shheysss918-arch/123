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
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  )
}

export default async function StorePage() {
  const products = await get_products();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="ml-48 min-h-screen p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product._id.toString()}
              className="cursor-pointer overflow-hidden border-border bg-card transition-colors hover:border-primary group"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <img
                  src={product.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
              </div>
              <div className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-semibold text-foreground uppercase tracking-wider">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Version <span className="text-primary">{product.version || '1.0.0'}</span>
                  </p>
                </div>
                <StarRating rating={5} />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
