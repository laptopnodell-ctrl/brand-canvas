import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot")({ component: Forgot });

function Forgot() {
  return (
    <AuthLayout title="Reset your password" subtitle="We'll send you a reset link." footer={<Link to="/login" className="underline underline-offset-4">Back to sign in</Link>}>
      <form className="space-y-4">
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="you@brand.co"/></div>
        <Button className="w-full">Send reset link</Button>
      </form>
    </AuthLayout>
  );
}
