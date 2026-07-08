import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your workspace and preferences" />

      <Tabs defaultValue="company">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="card-elevated p-6 space-y-5 max-w-2xl">
          <div className="space-y-1.5"><Label>Company name</Label><Input defaultValue="Atelier Noir Studio"/></div>
          <div className="space-y-1.5"><Label>Email</Label><Input type="email" defaultValue="hello@ateliernoir.co"/></div>
          <div className="space-y-1.5"><Label>Address</Label><Textarea rows={3} defaultValue="12 Rue de Turenne, 75003 Paris, France"/></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Currency</Label><Input defaultValue="USD"/></div>
            <div className="space-y-1.5"><Label>Timezone</Label><Input defaultValue="Europe/Paris"/></div>
          </div>
          <Button onClick={()=>toast.success("Settings saved")}>Save changes</Button>
        </TabsContent>

        <TabsContent value="branding" className="card-elevated p-6 space-y-5 max-w-2xl">
          <div className="space-y-1.5"><Label>Brand logo</Label>
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-2xl">A</div>
              <Button variant="outline">Upload logo</Button>
            </div>
          </div>
          <div className="space-y-1.5"><Label>Primary color</Label><Input defaultValue="#0F172A"/></div>
          <div className="space-y-1.5"><Label>Tagline</Label><Input defaultValue="Timeless craft, modern edge."/></div>
          <Button onClick={()=>toast.success("Branding updated")}>Save changes</Button>
        </TabsContent>

        <TabsContent value="preferences" className="card-elevated p-6 space-y-5 max-w-2xl">
          {[
            {label:"Compact mode", desc:"Reduce spacing across tables and lists"},
            {label:"Show onboarding tips", desc:"Display helpful hints in the dashboard"},
            {label:"Enable keyboard shortcuts", desc:"Navigate faster with ⌘K"},
          ].map((p,i)=>(
            <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div><p className="font-medium">{p.label}</p><p className="text-xs text-muted-foreground">{p.desc}</p></div>
              <Switch defaultChecked={i!==0}/>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="notifications" className="card-elevated p-6 space-y-5 max-w-2xl">
          {["Order updates","Low stock alerts","Weekly reports","Marketing campaigns"].map((n,i)=>(
            <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <p className="font-medium">{n}</p><Switch defaultChecked={i<3}/>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="security" className="card-elevated p-6 space-y-5 max-w-2xl">
          <div className="space-y-1.5"><Label>Current password</Label><Input type="password" placeholder="••••••••"/></div>
          <div className="space-y-1.5"><Label>New password</Label><Input type="password"/></div>
          <div className="flex items-center justify-between border-t pt-4">
            <div><p className="font-medium">Two-factor authentication</p><p className="text-xs text-muted-foreground">Add an extra layer of security</p></div>
            <Switch defaultChecked/>
          </div>
          <Button onClick={()=>toast.success("Security updated")}>Update password</Button>
        </TabsContent>
      </Tabs>
    </>
  );
}
