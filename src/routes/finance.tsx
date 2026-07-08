import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, TrendingUp, TrendingDown, FileText } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { revenueTrend, categoryRevenue } from "@/lib/mock-data";

export const Route = createFileRoute("/finance")({ component: FinancePage });

function FinancePage() {
  const totalRev = revenueTrend.reduce((s, r) => s + r.revenue, 0);
  const totalExp = revenueTrend.reduce((s, r) => s + r.expenses, 0);
  const profit = totalRev - totalExp;

  return (
    <>
      <PageHeader
        title="Finance"
        description="Revenue, expenses, and profitability at a glance"
        actions={<><Button variant="outline"><FileText className="mr-1.5 h-4 w-4"/>Export PDF</Button><Button variant="outline">Export Excel</Button></>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={"$" + totalRev.toLocaleString()} delta={14.2} icon={DollarSign} tone="success" />
        <StatCard label="Total Expenses" value={"$" + totalExp.toLocaleString()} delta={6.4} icon={TrendingDown} tone="warning" />
        <StatCard label="Net Profit" value={"$" + profit.toLocaleString()} delta={22.8} icon={TrendingUp} tone="success" />
        <StatCard label="Profit Margin" value={`${Math.round((profit / totalRev) * 100)}%`} delta={3.1} icon={TrendingUp} tone="info" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card-elevated p-5">
          <h3 className="text-sm font-semibold">Revenue vs Expenses</h3>
          <p className="text-xs text-muted-foreground">Last 12 months</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v)=>`$${v/1000}k`} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="revenue" fill="var(--color-chart-2)" radius={[4,4,0,0]} />
                <Bar dataKey="expenses" fill="var(--color-chart-4)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-5">
          <h3 className="text-sm font-semibold">Monthly Profit</h3>
          <p className="text-xs text-muted-foreground">Revenue minus expenses</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend.map(r=>({month:r.month, profit:r.revenue-r.expenses}))}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v)=>`$${v/1000}k`} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="profit" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 card-elevated p-5">
        <h3 className="mb-4 text-sm font-semibold">Category-wise Revenue</h3>
        <div className="space-y-3">
          {categoryRevenue.map((c, i) => {
            const max = Math.max(...categoryRevenue.map(x=>x.revenue));
            return (
              <div key={c.category}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{c.category}</span>
                  <span className="font-medium">${c.revenue.toLocaleString()}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${(c.revenue/max)*100}%`, background: `var(--color-chart-${(i%5)+1})` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
