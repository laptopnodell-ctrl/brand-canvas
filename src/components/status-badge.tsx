import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  pending: "bg-warning/15 text-warning border-warning/30",
  processing: "bg-info/15 text-info border-info/30",
  packed: "bg-info/15 text-info border-info/30",
  shipped: "bg-chart-1/15 text-chart-1 border-chart-1/30",
  delivered: "bg-success/15 text-success border-success/30",
  returned: "bg-muted text-muted-foreground border-border",
  cancelled: "bg-destructive/10 text-destructive border-destructive/30",
  paid: "bg-success/15 text-success border-success/30",
  refunded: "bg-muted text-muted-foreground border-border",
  active: "bg-success/15 text-success border-success/30",
  draft: "bg-muted text-muted-foreground border-border",
  archived: "bg-muted text-muted-foreground border-border",
  "on-leave": "bg-warning/15 text-warning border-warning/30",
  inactive: "bg-muted text-muted-foreground border-border",
  paused: "bg-warning/15 text-warning border-warning/30",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize",
      map[status] ?? "bg-muted text-muted-foreground border-border",
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
