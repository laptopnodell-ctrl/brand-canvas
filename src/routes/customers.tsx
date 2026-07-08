import { createFileRoute } from "@tanstack/react-router";
import { Users, UserPlus, Crown, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { customers } from "@/lib/mock-data";

export const Route = createFileRoute("/customers")({ component: CustomersPage });

const tierColor: Record<string, string> = {
  Bronze: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  Silver: "bg-slate-500/15 text-slate-500",
  Gold: "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400",
  Platinum: "bg-violet-500/15 text-violet-500",
};

function CustomersPage() {
  const top = [...customers].sort((a, b) => b.spent - a.spent).slice(0, 5);
  const newCust = customers.slice(-5).reverse();

  return (
    <>
      <PageHeader title="Customers" description={`${customers.length} customers · ${customers.filter(c=>c.orders>3).length} returning`} actions={<Button>Add customer</Button>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Customers" value={customers.length.toString()} delta={12.4} icon={Users} />
        <StatCard label="New This Month" value="47" delta={18.2} icon={UserPlus} tone="success" />
        <StatCard label="Returning" value={customers.filter(c => c.orders > 3).length.toString()} delta={7.1} icon={TrendingUp} tone="info" />
        <StatCard label="Platinum Tier" value={customers.filter(c => c.tier === "Platinum").length.toString()} delta={24} icon={Crown} tone="warning" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card-elevated p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold">All Customers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 font-medium">Customer</th>
                  <th className="py-2 font-medium">Tier</th>
                  <th className="py-2 font-medium">Orders</th>
                  <th className="py-2 font-medium">Spent</th>
                  <th className="py-2 font-medium">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-muted/40">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                          {c.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{c.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3"><span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${tierColor[c.tier]}`}>{c.tier}</span></td>
                    <td className="py-3">{c.orders}</td>
                    <td className="py-3 font-medium">${c.spent.toLocaleString()}</td>
                    <td className="py-3 text-muted-foreground">{c.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-elevated p-5">
            <h3 className="text-sm font-semibold">Top Customers</h3>
            <div className="mt-4 space-y-3">
              {top.map((c, i) => (
                <div key={c.id} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-secondary text-xs font-semibold">{i+1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.orders} orders</p>
                  </div>
                  <span className="text-sm font-semibold">${c.spent.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-elevated p-5">
            <h3 className="text-sm font-semibold">Recently Added</h3>
            <div className="mt-4 space-y-3">
              {newCust.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    {c.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
