import { createFileRoute } from "@tanstack/react-router";
import { UserCog } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/employees")({ component: EmployeesPage });

const roleColors: Record<string, string> = {
  Owner: "bg-violet-500/15 text-violet-500",
  Manager: "bg-info/15 text-info",
  "Inventory Staff": "bg-chart-2/15 text-chart-2",
  Accountant: "bg-warning/15 text-warning",
  "Marketing Team": "bg-chart-4/15 text-chart-4",
};

function EmployeesPage() {
  return (
    <>
      <PageHeader title="Employees" description={`${employees.length} team members`} actions={<Button><UserCog className="mr-1.5 h-4 w-4"/>Invite member</Button>} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {employees.map((e) => (
          <div key={e.id} className="card-elevated p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground font-semibold">{e.avatar}</div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{e.name}</p>
                <p className="truncate text-xs text-muted-foreground">{e.email}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${roleColors[e.role]}`}>{e.role}</span>
                  <StatusBadge status={e.status} />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
              <span>Joined {e.joined}</span>
              <Button variant="ghost" size="sm" className="h-7 -mr-2">Manage</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 card-elevated p-5">
        <h3 className="mb-4 text-sm font-semibold">Recent Activity</h3>
        <ul className="space-y-3">
          {[
            { who: "Daniel Osei", what: "approved 3 restock requests", when: "2h ago" },
            { who: "Mika Larsen", what: "updated inventory for 14 SKUs", when: "5h ago" },
            { who: "Priya Shah", what: "generated Q3 financial report", when: "yesterday" },
            { who: "Omar Farouk", what: "launched autumn campaign", when: "2d ago" },
          ].map((a, i) => (
            <li key={i} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-chart-1" />
              <p className="text-sm flex-1"><span className="font-medium">{a.who}</span> <span className="text-muted-foreground">{a.what}</span></p>
              <span className="shrink-0 text-xs text-muted-foreground">{a.when}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
