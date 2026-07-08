import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/page-header";
import { revenueTrend, products, customers } from "@/lib/mock-data";

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

function AnalyticsPage() {
  const topProducts = [...products].sort((a,b)=>b.sold-a.sold).slice(0,8);
  return (
    <>
      <PageHeader title="Analytics" description="Deep insights across sales, products, inventory, and customers" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card-elevated p-5">
          <h3 className="text-sm font-semibold">Sales Analytics</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend}>
                <defs><linearGradient id="s1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.4}/><stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false}/>
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ background:"var(--color-popover)", border:"1px solid var(--color-border)", borderRadius:8, fontSize:12 }}/>
                <Area type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" fill="url(#s1)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-5">
          <h3 className="text-sm font-semibold">Product Performance</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{left:80}}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false}/>
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis type="category" dataKey="name" stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} width={100}/>
                <Tooltip contentStyle={{ background:"var(--color-popover)", border:"1px solid var(--color-border)", borderRadius:8, fontSize:12 }}/>
                <Bar dataKey="sold" fill="var(--color-chart-2)" radius={[0,4,4,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-5">
          <h3 className="text-sm font-semibold">Order Volume Trend</h3>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false}/>
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ background:"var(--color-popover)", border:"1px solid var(--color-border)", borderRadius:8, fontSize:12 }}/>
                <Line type="monotone" dataKey="orders" stroke="var(--color-chart-3)" strokeWidth={2.5} dot={{r:3}}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-elevated p-5">
          <h3 className="text-sm font-semibold">Customer Segments</h3>
          <div className="mt-4 space-y-3">
            {(["Platinum","Gold","Silver","Bronze"] as const).map(tier=>{
              const count = customers.filter(c=>c.tier===tier).length;
              const pct = (count/customers.length)*100;
              return (
                <div key={tier}>
                  <div className="mb-1 flex justify-between text-sm"><span>{tier}</span><span className="text-muted-foreground">{count} customers</span></div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-chart-1 rounded-full" style={{width:`${pct}%`}}/>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
