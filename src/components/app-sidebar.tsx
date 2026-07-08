import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Package, Warehouse, ShoppingCart, Users, UserCog,
  Truck, Wallet, BarChart3, Sparkles, Bell, Settings,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";

const main = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Products", url: "/products", icon: Package },
  { title: "Inventory", url: "/inventory", icon: Warehouse },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Customers", url: "/customers", icon: Users },
];

const business = [
  { title: "Employees", url: "/employees", icon: UserCog },
  { title: "Suppliers", url: "/suppliers", icon: Truck },
  { title: "Finance", url: "/finance", icon: Wallet },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const system = [
  { title: "AI Advisor", url: "/ai-advisor", icon: Sparkles },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname.startsWith(url));

  const renderGroup = (label: string, items: typeof main) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isActive(item.url)} className="data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium">
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b py-4">
        <div className="flex items-center gap-2.5 px-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-display text-lg leading-none">A</span>
          </div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-semibold tracking-tight">Atelier OS</span>
            <span className="truncate text-[11px] text-muted-foreground">Brand Management</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-1">
        {renderGroup("Overview", main)}
        {renderGroup("Business", business)}
        {renderGroup("System", system)}
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 group-data-[collapsible=icon]:justify-center">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">AR</div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate text-xs font-medium">Alexandra Reyes</span>
            <span className="truncate text-[11px] text-muted-foreground">Owner</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
