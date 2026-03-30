"use client"

import { useState } from "react"
import { Trash2, Edit, ExternalLink, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

interface ProductData {
  id: string
  name: string
  image: string
  version: string
  status: string
}

interface ProductsListProps {
  initialProducts: ProductData[]
}

export function ProductsList({ initialProducts }: ProductsListProps) {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState("")

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (productId: string, productName: string) => {
    setProducts(products.filter((p) => p.id !== productId))
    toast.success(`${productName} has been deleted`)
  }

  return (
    <Card className="border-border bg-card overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border p-4">
        <span className="font-semibold uppercase text-foreground">
          Products ({filteredProducts.length})
        </span>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="divide-y divide-border">
        {filteredProducts.length === 0 ? (
          <p className="p-6 text-center text-muted-foreground">No products found</p>
        ) : (
          filteredProducts.map((p) => (
            <div key={p.id} className="p-4 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md border border-border overflow-hidden bg-secondary flex-shrink-0">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">v{p.version}</span>
                      <span className="hidden sm:inline">|</span>
                      <span className="hidden sm:inline">{p.status}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="hidden sm:flex">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <ConfirmDialog
                    title={`Delete ${p.name}?`}
                    description="This will permanently delete this product and revoke access for all users. This action cannot be undone."
                    confirmText="Delete Product"
                    variant="destructive"
                    onConfirm={() => handleDelete(p.id, p.name)}
                  >
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </ConfirmDialog>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}

export function ProductsListSkeleton() {
  return (
    <Card className="border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-border p-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-9 w-64" />
      </div>

      <div className="divide-y divide-border">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
                <Skeleton className="h-9 w-9" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
