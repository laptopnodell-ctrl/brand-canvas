import { createFileRoute } from "@tanstack/react-router";
import { Star, Truck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { suppliers } from "@/lib/mock-data";

export const Route = createFileRoute("/suppliers")({ component: SuppliersPage });

function SuppliersPage() {
  return (
    <>
      <PageHeader title="Suppliers" description={`${suppliers.length} active partners`} actions={<Button><Truck className="mr-1.5 h-4 w-4"/>Add supplier</Button>} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((s) => (
          <div key={s.id} className="card-elevated p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-display text-xl">{s.name}</h3>
                <p className="truncate text-xs text-muted-foreground">{s.contact} · {s.email}</p>
              </div>
              <StatusBadge status={s.status} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t pt-4">
              <div><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Products</p><p className="mt-1 font-display text-xl">{s.products}</p></div>
              <div><p className="text-[11px] uppercase tracking-wider text-muted-foreground">Orders</p><p className="mt-1 font-display text-xl">{s.totalOrders}</p></div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Rating</p>
                <p className="mt-1 flex items-center gap-1 font-display text-xl">{s.rating}<Star className="h-4 w-4 fill-warning text-warning"/></p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Outstanding</p>
                <p className={`text-sm font-semibold ${s.outstanding > 0 ? "text-warning" : "text-success"}`}>${s.outstanding.toLocaleString()}</p>
              </div>
              <Button variant="outline" size="sm">View details</Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
