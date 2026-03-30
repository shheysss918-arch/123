"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, Activity, HelpCircle, Settings, LogOut, Users, Package, Key as KeyIcon, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Store", href: "/store", icon: ShoppingCart },
  { name: "Status", href: "/status", icon: Activity },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
  { name: "Admin Home", href: "/admin", icon: Settings, admin: true },
  { name: "Users", href: "/admin/users", icon: Users, admin: true },
  { name: "Products", href: "/admin/products", icon: Package, admin: true },
  { name: "Licenses", href: "/admin/licenses", icon: KeyIcon, admin: true },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('is_admin_mode')
    if (stored === 'true') setIsAdmin(true)
  }, [])

  const toggleAdmin = () => {
    const next = !isAdmin
    setIsAdmin(next)
    localStorage.setItem('is_admin_mode', next.toString())
  }

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-48 flex-col border-r border-border bg-background">
      <div className="p-6">
        <div 
          onClick={(e) => { if(e.detail === 2) toggleAdmin() }} 
          className="text-2xl font-bold text-foreground cursor-pointer select-none active:scale-95 transition-transform"
        >
          LC
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Navigation</div>
        {navItems.filter(i => !i.admin).map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}

        {isAdmin && (
          <>
            <div className="mt-6 px-3 py-2 text-[10px] font-bold text-primary uppercase tracking-widest">Administration</div>
            {navItems.filter(i => i.admin).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </>
        )}
      </nav>

      <div className="border-t border-border p-3 space-y-2">
        {!isAdmin && (
          <Link href="/admin/login" className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase opacity-20 hover:opacity-100 transition-opacity">
            <Lock className="h-3 w-3" />
            Access Terminal
          </Link>
        )}
        <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
