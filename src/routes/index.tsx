import { createFileRoute, Link } from "@tanstack/react-router";
import {
  DollarSign, ShoppingCart, Users, Package, AlertTriangle, Clock, TrendingUp, UserCog,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { kpis, orders, products, revenueTrend, categoryRevenue, notifications } from "@/lib/mock-data";

export const Route = createFileRoute("/")({ component: Dashboard });

const fmt = (n: number) => "$" + n.toLocaleString();

function Dashboard() {
  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
  const recentOrders = orders.slice(0, 6);
  const lowStock = products.filter((p) => p.stock < 40).slice(0, 5);
  const chartColors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-chart-1)"];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back, Alexandra. Here's what's happening across your brand today."
        actions={<><Button variant="outline">Export</Button><Button>New order</Button></>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={fmt(kpis.totalRevenue)} delta={12.4} icon={DollarSign} tone="success" />
        <StatCard label="Monthly Revenue" value={fmt(kpis.monthlyRevenue)} delta={8.2} icon={TrendingUp} tone="info" />
        <StatCard label="Total Orders" value={kpis.totalOrders.toLocaleString()} delta={4.1} icon={ShoppingCart} />
        <StatCard label="Total Customers" value={kpis.totalCustomers.toLocaleString()} delta={6.8} icon={Users} />
        <StatCard label="Total Products" value={kpis.totalProducts.toString()} delta={2.1} icon={Package} />
        <StatCard label="Low Stock Alerts" value={kpis.lowStock.toString()} delta={-3.4} icon={AlertTriangle} tone="warning" />
        <StatCard label="Pending Orders" value={kpis.pendingOrders.toString()} delta={-1.2} icon={Clock} tone="warning" />
        <StatCard label="Total Employees" value={kpis.totalEmployees.toString()} delta={0} icon={UserCog} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card-elevated p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Revenue Trend</h3>
              <p className="text-xs text-muted-foreground">Revenue vs expenses over the past 12 months</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-1" />Revenue</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-chart-4" />Expenses</span>
            </div>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.4} /><stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-chart-4)" stopOpacity={0.3} /><stop offset="95%" stopColor="var(--color-chart-4)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#rev)" />
                <Area type="monotone" dataKey="expenses" stroke="var(--color-chart-4)" strokeWidth={2} fill="url(#exp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-5">
          <h3 className="text-sm font-semibold">Category Revenue</h3>
          <p className="text-xs text-muted-foreground">This year</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryRevenue} dataKey="revenue" nameKey="category" innerRadius={50} outerRadius={80} paddingAngle={2}>
                  {categoryRevenue.map((_, i) => <Cell key={i} fill={chartColors[i % chartColors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
            {categoryRevenue.map((c, i) => (
              <div key={c.category} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: chartColors[i % chartColors.length] }} />
                <span className="truncate text-muted-foreground">{c.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card-elevated p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Recent Orders</h3>
              <p className="text-xs text-muted-foreground">Latest transactions across all channels</p>
            </div>
            <Button asChild variant="ghost" size="sm"><Link to="/orders">View all</Link></Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 pr-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-muted/50">
                    <td className="py-3 font-mono text-xs">{o.id}</td>
                    <td className="py-3">{o.customer}</td>
                    <td className="py-3"><StatusBadge status={o.status} /></td>
                    <td className="py-3 pr-2 text-right font-medium">{fmt(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-elevated p-5">
          <h3 className="text-sm font-semibold">Top Selling</h3>
          <p className="text-xs text-muted-foreground">Best performers this month</p>
          <div className="mt-4 space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-xs font-semibold">{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sold} sold · {fmt(p.price)}</p>
                </div>
                <div className="text-right text-xs font-medium text-success">+{Math.round(p.sold / 20)}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card-elevated p-5">
          <h3 className="text-sm font-semibold">Monthly Orders</h3>
          <p className="text-xs text-muted-foreground">Order volume by month</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="orders" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Inventory Alerts</h3>
              <p className="text-xs text-muted-foreground">Items requiring attention</p>
            </div>
            <Button asChild variant="ghost" size="sm"><Link to="/inventory">Manage</Link></Button>
          </div>
          <div className="space-y-3">
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-lg border border-warning/30 bg-warning/5 px-3 py-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sku} · {p.category}</p>
                </div>
                <span className="text-sm font-semibold text-warning">{p.stock} left</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 card-elevated p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Recent Activity</h3>
            <p className="text-xs text-muted-foreground">Latest events across your business</p>
          </div>
          <Button asChild variant="ghost" size="sm"><Link to="/notifications">View all</Link></Button>
        </div>
        <ul className="space-y-3">
          {notifications.slice(0, 5).map((n) => (
            <li key={n.id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-chart-1" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.description}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{n.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
