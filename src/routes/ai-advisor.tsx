import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Send, TrendingUp, Package, Users, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { aiInsights } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/ai-advisor")({ component: AIAdvisorPage });

const icons = { Inventory: Package, Merchandising: TrendingUp, Finance: DollarSign, Marketing: Users };
const impactColor: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/30",
  Medium: "bg-warning/10 text-warning border-warning/30",
  Low: "bg-info/10 text-info border-info/30",
};

function AIAdvisorPage() {
  const [messages, setMessages] = useState<{role:"user"|"assistant"; text:string}[]>([
    { role: "assistant", text: "Hi Alexandra — I've analyzed your last 90 days of sales, inventory, and customer data. Ask me anything about your brand, or explore the insights below." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m)=>[...m, {role:"user", text:input}]);
    const q = input;
    setInput("");
    setTimeout(()=>{
      setMessages((m)=>[...m, {role:"assistant", text:`Based on your data, here's what I recommend regarding "${q}": prioritize restocking your top 3 SKUs and consider a 15% markdown on slow-movers. This is a UI placeholder — real AI wires up later.`}]);
    }, 600);
  };

  return (
    <>
      <PageHeader title="AI Business Advisor" description="Data-driven recommendations for your brand" actions={<span className="inline-flex items-center gap-1.5 rounded-full border border-chart-1/30 bg-chart-1/10 px-2.5 py-1 text-xs text-chart-1"><Sparkles className="h-3 w-3"/>Preview</span>} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card-elevated p-0 lg:col-span-2 flex flex-col overflow-hidden" style={{minHeight:"640px"}}>
          <div className="border-b px-5 py-3">
            <h3 className="text-sm font-semibold">Chat with your advisor</h3>
            <p className="text-xs text-muted-foreground">Powered by placeholder — Antigravity integration pending</p>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex items-start gap-3"}>
                {m.role === "assistant" && (
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Sparkles className="h-4 w-4"/></div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.role==="user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-secondary-foreground rounded-tl-md"}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="border-t p-3">
            <form onSubmit={(e)=>{e.preventDefault(); send();}} className="flex gap-2">
              <Input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask about revenue, inventory, or customers…" className="flex-1" />
              <Button type="submit" size="icon"><Send className="h-4 w-4"/></Button>
            </form>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Recommendations</h3>
          {aiInsights.map((ins, i) => {
            const Icon = icons[ins.tag as keyof typeof icons] ?? Sparkles;
            return (
              <div key={i} className="card-elevated p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary"><Icon className="h-4 w-4"/></div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${impactColor[ins.impact]}`}>{ins.impact} impact</span>
                </div>
                <p className="mt-3 font-medium text-sm">{ins.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{ins.description}</p>
                <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 -ml-2 text-xs" onClick={()=>toast.success("Action queued")}>Apply →</Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
