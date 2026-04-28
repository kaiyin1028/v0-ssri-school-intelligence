"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Brain, 
  Search, 
  GitCompare, 
  FileText, 
  BookOpen, 
  Settings,
  LayoutDashboard,
  Menu,
  ChevronDown,
  User,
  School as SchoolIcon,
  Shield,
  Radar,
  Target,
  Briefcase,
  ClipboardList,
  Database,
  FileSearch,
  Calculator,
  Package,
  Home
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { NAV_ITEMS, AI_NEEDS_NAV_ITEMS, ADMIN_NAV_ITEMS } from "@/lib/constants"
import type { UserRole } from "@/lib/types"
import { useState } from "react"

const iconMap: Record<string, React.ElementType> = {
  Home: Home,
  Search: Search,
  GitCompare: GitCompare,
  FileText: FileText,
  BookOpen: BookOpen,
  LayoutDashboard: LayoutDashboard,
  Radar: Radar,
  Target: Target,
  Briefcase: Briefcase,
  ClipboardList: ClipboardList,
  Database: Database,
  FileSearch: FileSearch,
  Calculator: Calculator,
  Brain: Brain,
  Package: Package
}

const roleConfig: Record<UserRole, { label: string; icon: React.ElementType; color: string }> = {
  Parent: { label: "家長視角", icon: User, color: "text-sky-600" },
  School: { label: "學校視角", icon: SchoolIcon, color: "text-emerald-600" },
  Analyst: { label: "分析員視角", icon: Shield, color: "text-amber-600" }
}

export function Header() {
  const pathname = usePathname()
  const [currentRole, setCurrentRole] = useState<UserRole>("Parent")
  const isAdmin = pathname.startsWith("/admin")

  const allNavItems = [...NAV_ITEMS, ...AI_NEEDS_NAV_ITEMS, ...(isAdmin ? ADMIN_NAV_ITEMS : [])]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-foreground">SSRI 學校智能分析平台</div>
            <div className="text-xs text-muted-foreground">School Social Responsibility Intelligence</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {allNavItems.slice(0, 8).map((item) => {
            const Icon = iconMap[item.icon] || Brain
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2",
                    isActive && "bg-primary/10 text-primary hover:bg-primary/15"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Role Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden gap-2 sm:flex">
                {(() => {
                  const RoleIcon = roleConfig[currentRole].icon
                  return <RoleIcon className={cn("h-4 w-4", roleConfig[currentRole].color)} />
                })()}
                <span className="hidden lg:inline">{roleConfig[currentRole].label}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>切換視角</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(roleConfig) as UserRole[]).map((role) => {
                const RoleIcon = roleConfig[role].icon
                return (
                  <DropdownMenuItem
                    key={role}
                    onClick={() => setCurrentRole(role)}
                    className={cn(currentRole === role && "bg-accent")}
                  >
                    <RoleIcon className={cn("mr-2 h-4 w-4", roleConfig[role].color)} />
                    {roleConfig[role].label}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
              <span className="sr-only">設定</span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">選單</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-2 px-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Brain className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-semibold">SSRI 平台</span>
                </div>
                <nav className="flex flex-col gap-1">
                  <p className="mb-1 px-2 text-xs font-medium text-muted-foreground">總覽</p>
                  {NAV_ITEMS.map((item) => {
                    const Icon = iconMap[item.icon] || Brain
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3",
                            isActive && "bg-primary/10 text-primary"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Button>
                      </Link>
                    )
                  })}
                  <p className="mb-1 mt-3 px-2 text-xs font-medium text-muted-foreground">AI 教育需求</p>
                  {AI_NEEDS_NAV_ITEMS.map((item) => {
                    const Icon = iconMap[item.icon] || Brain
                    const isActive = pathname === item.href
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3",
                            isActive && "bg-primary/10 text-primary"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </Button>
                      </Link>
                    )
                  })}
                  {isAdmin && (
                    <>
                      <p className="mb-1 mt-3 px-2 text-xs font-medium text-muted-foreground">內部管理</p>
                      {ADMIN_NAV_ITEMS.map((item) => {
                        const Icon = iconMap[item.icon] || Brain
                        const isActive = pathname === item.href
                        return (
                          <Link key={item.href} href={item.href}>
                            <Button
                              variant={isActive ? "secondary" : "ghost"}
                              className={cn(
                                "w-full justify-start gap-3",
                                isActive && "bg-primary/10 text-primary"
                              )}
                            >
                              <Icon className="h-4 w-4" />
                              {item.label}
                            </Button>
                          </Link>
                        )
                      })}
                    </>
                  )}
                </nav>
                <div className="border-t pt-4">
                  <p className="mb-2 px-2 text-xs font-medium text-muted-foreground">切換視角</p>
                  {(Object.keys(roleConfig) as UserRole[]).map((role) => {
                    const RoleIcon = roleConfig[role].icon
                    return (
                      <Button
                        key={role}
                        variant={currentRole === role ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3"
                        onClick={() => setCurrentRole(role)}
                      >
                        <RoleIcon className={cn("h-4 w-4", roleConfig[role].color)} />
                        {roleConfig[role].label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
