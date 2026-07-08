import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Package, Truck, CheckCircle2, Clock, XCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orders, type OrderStatus } from "@/lib/mock-data";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

const timeline: { status: OrderStatus; icon: typeof Package; label: string }[] = [
  { status: "pending", icon: Clock, label: "Order placed" },
  { status: "processing", icon: Package, label: "Processing" },
  { status: "packed", icon: Package, label: "Packed" },
  { status: "shipped", icon: Truck, label: "Shipped" },
  { status: "delivered", icon: CheckCircle2, label: "Delivered" },
];

function OrdersPage() {
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const filtered = orders.filter(
    (o) => (tab === "all" || o.status === tab) && (o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <>
      <PageHeader title="Orders" description={`${orders.length} orders`} actions={<Button>Create order</Button>} />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="packed">Packed</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="returned">Returned</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="card-elevated p-4">
        <div className="mb-4 relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders…" className="pl-9" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-3 pl-2 font-medium">Order</th>
                <th className="py-3 font-medium">Customer</th>
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium">Items</th>
                <th className="py-3 font-medium">Payment</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 pr-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((o) => (
                <Sheet key={o.id}>
                  <SheetTrigger asChild>
                    <tr className="cursor-pointer hover:bg-muted/40">
                      <td className="py-3 pl-2 font-mono text-xs">{o.id}</td>
                      <td className="py-3">
                        <p className="font-medium">{o.customer}</p>
                        <p className="text-xs text-muted-foreground">{o.email}</p>
                      </td>
                      <td className="py-3 text-muted-foreground">{o.date}</td>
                      <td className="py-3">{o.items}</td>
                      <td className="py-3"><StatusBadge status={o.payment} /></td>
                      <td className="py-3"><StatusBadge status={o.status} /></td>
                      <td className="py-3 pr-2 text-right font-semibold">${o.total}</td>
                    </tr>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>{o.id}</SheetTitle>
                      <SheetDescription>Placed on {o.date}</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div className="rounded-lg border p-4">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">Customer</p>
                        <p className="mt-1 font-medium">{o.customer}</p>
                        <p className="text-sm text-muted-foreground">{o.email}</p>
                      </div>
                      <div>
                        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">Timeline</p>
                        <div className="space-y-3">
                          {timeline.map((t, i) => {
                            const idx = timeline.findIndex((x) => x.status === o.status);
                            const done = idx >= 0 && i <= idx;
                            return (
                              <div key={t.status} className="flex items-center gap-3">
                                <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${done ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
                                  <t.icon className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className={`text-sm ${done ? "font-medium" : "text-muted-foreground"}`}>{t.label}</p>
                                </div>
                                {done && <CheckCircle2 className="h-4 w-4 text-success" />}
                              </div>
                            );
                          })}
                          {(o.status === "returned" || o.status === "cancelled") && (
                            <div className="flex items-center gap-3">
                              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-destructive/15 text-destructive"><XCircle className="h-4 w-4" /></div>
                              <p className="text-sm font-medium capitalize">{o.status}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Items</span><span>{o.items}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Payment</span><StatusBadge status={o.payment} />
                        </div>
                        <div className="mt-3 border-t pt-3 flex items-center justify-between">
                          <span className="font-semibold">Total</span><span className="font-display text-2xl">${o.total}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">Print invoice</Button>
                        <Button className="flex-1">Update status</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
