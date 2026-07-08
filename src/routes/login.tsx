import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Atelier OS workspace." footer={<>Don't have an account? <Link to="/login" className="text-foreground underline underline-offset-4">Contact sales</Link></>}>
      <form className="space-y-4" onSubmit={(e)=>{e.preventDefault(); nav({to:"/"});}}>
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="you@brand.co" required/></div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label>Password</Label>
            <Link to="/forgot" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</Link>
          </div>
          <div className="relative">
            <Input type={show ? "text" : "password"} placeholder="••••••••" required className="pr-10"/>
            <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {show ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
            </button>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked/> Remember me for 30 days</label>
        <Button type="submit" className="w-full">Sign in</Button>
        <div className="relative py-2 text-center text-xs text-muted-foreground">
          <span className="relative z-10 bg-background px-2">or continue with</span>
          <div className="absolute left-0 right-0 top-1/2 border-t"/>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" type="button">Google</Button>
          <Button variant="outline" type="button">Apple</Button>
        </div>
      </form>
    </AuthLayout>
  );
}
