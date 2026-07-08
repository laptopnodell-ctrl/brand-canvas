import { createFileRoute } from "@tanstack/react-router";
import { Bell, Package, ShoppingCart, UserCog, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({ component: NotificationsPage });

const iconMap = { inventory: Package, order: ShoppingCart, employee: UserCog, finance: DollarSign };
const priorityColor = {
  high: "bg-destructive/10 text-destructive border-destructive/30",
  medium: "bg-warning/10 text-warning border-warning/30",
  low: "bg-info/10 text-info border-info/30",
} as const;

function NotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" description={`${notifications.filter(n=>!n.read).length} unread`} actions={<Button variant="outline">Mark all as read</Button>} />

      <div className="card-elevated divide-y">
        {notifications.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <div key={n.id} className={cn("flex items-start gap-4 p-4", !n.read && "bg-accent/20")}>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary"><Icon className="h-4 w-4"/></div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className={cn("text-sm", !n.read && "font-medium")}>{n.title}</p>
                  <span className={cn("rounded-full border px-1.5 py-0.5 text-[10px] font-medium capitalize", priorityColor[n.priority])}>{n.priority}</span>
                  {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-chart-1" />}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.description}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
