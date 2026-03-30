import { Star, ShoppingCart, Check, Zap, Shield, Eye } from "lucide-react"
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
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    undetected: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    updating: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    detected: "bg-red-500/10 text-red-500 border-red-500/20",
  }
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${statusStyles[status] || statusStyles.undetected}`}>
      {status}
    </span>
  )
}

export default async function StorePage() {
  const products = await get_products();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="md:ml-48 min-h-screen p-4 md:p-6 pt-20 md:pt-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Store</h1>
          <p className="text-muted-foreground">Browse our available products</p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product._id.toString()}
              className="overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group"
            >
              {/* Image Section */}
              <div className="aspect-[16/10] w-full overflow-hidden relative">
                <img
                  src={product.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <StatusBadge status={product.status || "undetected"} />
                </div>

                {/* Version Badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-mono bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-muted-foreground">
                    v{product.version || "1.0.0"}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 space-y-4">
                {/* Title & Rating */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {product.description || "Premium gaming enhancement"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <StarRating rating={product.rating || 5} />
                    <span className="text-[10px] text-muted-foreground">{product.reviews || 128} reviews</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 text-primary" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Zap className="h-3 w-3 text-primary" />
                    <span>Fast Updates</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Check className="h-3 w-3 text-primary" />
                    <span>24/7 Support</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground">
                      ${product.price || "19.99"}
                    </span>
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button className="gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground">No products available</h3>
            <p className="text-muted-foreground">Check back soon for new releases</p>
          </div>
        )}
      </main>
    </div>
  )
}
