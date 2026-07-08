import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { products } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/products")({ component: ProductsPage });

function ProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const cats = ["all", ...Array.from(new Set(products.map((p) => p.category)))];
  const filtered = products.filter(
    (p) => (cat === "all" || p.category === cat) && (p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        title="Products"
        description={`${products.length} products across your catalog`}
        actions={
          <Dialog>
            <DialogTrigger asChild><Button><Plus className="mr-1.5 h-4 w-4" />Add product</Button></DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add new product</DialogTitle>
                <DialogDescription>Create a new product for your catalog.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="col-span-2 space-y-1.5"><Label>Product name</Label><Input placeholder="Wool Overcoat" /></div>
                <div className="space-y-1.5"><Label>SKU</Label><Input placeholder="SKU-00001" /></div>
                <div className="space-y-1.5"><Label>Category</Label><Input placeholder="Outerwear" /></div>
                <div className="space-y-1.5"><Label>Price</Label><Input type="number" placeholder="199" /></div>
                <div className="space-y-1.5"><Label>Cost</Label><Input type="number" placeholder="80" /></div>
                <div className="col-span-2 space-y-1.5"><Label>Description</Label><Textarea placeholder="Product description…" rows={3} /></div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success("Product created")}>Create product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="card-elevated p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or SKU…" className="pl-9" />
          </div>
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>{cats.map((c) => <SelectItem key={c} value={c}>{c === "all" ? "All categories" : c}</SelectItem>)}</SelectContent>
          </Select>
          <Button variant="outline"><Filter className="mr-1.5 h-4 w-4" />More filters</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-3 pl-2 font-medium">Product</th>
                <th className="py-3 font-medium">SKU</th>
                <th className="py-3 font-medium">Category</th>
                <th className="py-3 font-medium">Price</th>
                <th className="py-3 font-medium">Stock</th>
                <th className="py-3 font-medium">Sold</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 pr-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40">
                  <td className="py-3 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-secondary text-xs font-medium text-secondary-foreground">{p.name.slice(0, 2).toUpperCase()}</div>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{p.sku}</td>
                  <td className="py-3">{p.category}</td>
                  <td className="py-3 font-medium">${p.price}</td>
                  <td className="py-3">
                    <span className={p.stock < 40 ? "text-warning font-medium" : ""}>{p.stock}</span>
                  </td>
                  <td className="py-3 text-muted-foreground">{p.sold}</td>
                  <td className="py-3"><StatusBadge status={p.status} /></td>
                  <td className="py-3 pr-2 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit className="mr-2 h-3.5 w-3.5" />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-3.5 w-3.5" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {filtered.length} of {products.length}</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </>
  );
}
