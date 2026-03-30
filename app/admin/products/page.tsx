import { Suspense } from "react"
import { Package, Plus } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { ProductsList, ProductsListSkeleton } from "@/components/admin/products-list"
import { connect_to_db } from "@/lib/mongodb"

async function get_products_admin() {
  const db = await connect_to_db()
  const products = await db.collection("products").find({}).toArray()
  return products.map((p) => ({
    id: p._id.toString(),
    name: p.name as string,
    image: p.image as string,
    version: (p.version as string) || "1.0.0",
    status: (p.status as string) || "Active",
  }))
}

async function ProductsContent() {
  const products = await get_products_admin()
  return <ProductsList initialProducts={products} />
}

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="md:ml-48 min-h-screen p-4 md:p-6 pt-20 md:pt-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Package className="h-5 w-5" />
            <span className="font-semibold uppercase">Products</span>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Product</span>
          </Button>
        </div>

        <Suspense fallback={<ProductsListSkeleton />}>
          <ProductsContent />
        </Suspense>
      </main>
    </div>
  )
}
