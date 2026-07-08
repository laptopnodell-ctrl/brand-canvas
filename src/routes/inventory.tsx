import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Package, TrendingUp, Warehouse } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { products, revenueTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/inventory")({ component: InventoryPage });

function InventoryPage() {
  const totalUnits = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock < 40);
  const outOfStock = products.filter((p) => p.stock === 0);
  const healthy = products.filter((p) => p.stock >= 100).length;

  return (
    <>
      <PageHeader
        title="Inventory"
        description="Real-time stock levels and inventory health"
        actions={<><Button variant="outline">Export CSV</Button><Button>Restock request</Button></>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Units" value={totalUnits.toLocaleString()} delta={5.2} icon={Package} />
        <StatCard label="Warehouses" value="3" icon={Warehouse} />
        <StatCard label="Low Stock" value={lowStock.length.toString()} delta={-8.1} icon={AlertTriangle} tone="warning" />
        <StatCard label="Inventory Value" value={"$" + (totalUnits * 85).toLocaleString()} delta={4.4} icon={TrendingUp} tone="success" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card-elevated p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold">Inventory Trend</h3>
          <p className="text-xs text-muted-foreground">Units held over time</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend.map((r) => ({ month: r.month, units: Math.round(r.revenue / 12) }))}>
                <defs><linearGradient id="inv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-chart-2)" stopOpacity={0.5} /><stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="units" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#inv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-5">
          <h3 className="text-sm font-semibold">Health</h3>
          <div className="mt-5 space-y-4">
            <div>
              <div className="flex justify-between text-xs"><span>Healthy stock</span><span className="font-medium">{healthy}</span></div>
              <Progress value={(healthy / products.length) * 100} className="mt-1.5 h-2" />
            </div>
            <div>
              <div className="flex justify-between text-xs"><span className="text-warning">Low stock</span><span className="font-medium">{lowStock.length}</span></div>
              <Progress value={(lowStock.length / products.length) * 100} className="mt-1.5 h-2 [&>div]:bg-warning" />
            </div>
            <div>
              <div className="flex justify-between text-xs"><span className="text-destructive">Out of stock</span><span className="font-medium">{outOfStock.length}</span></div>
              <Progress value={(outOfStock.length / products.length) * 100} className="mt-1.5 h-2 [&>div]:bg-destructive" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 card-elevated p-5">
        <h3 className="mb-4 text-sm font-semibold">Stock Levels</h3>
        <div className="space-y-3">
          {products.map((p) => {
            const pct = Math.min(100, (p.stock / 200) * 100);
            const tone = p.stock < 40 ? "warning" : p.stock < 100 ? "info" : "success";
            return (
              <div key={p.id} className="flex items-center gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <span className="ml-2 shrink-0 text-xs text-muted-foreground">{p.sku}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3">
                    <Progress value={pct} className={`h-1.5 flex-1 [&>div]:bg-${tone === "success" ? "success" : tone === "warning" ? "warning" : "info"}`} />
                    <span className="w-16 shrink-0 text-right text-xs font-medium">{p.stock} / 200</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
