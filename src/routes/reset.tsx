import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset")({ component: Reset });

function Reset() {
  return (
    <AuthLayout title="Set a new password" subtitle="Choose a strong password to secure your account." footer={<Link to="/login" className="underline underline-offset-4">Back to sign in</Link>}>
      <form className="space-y-4">
        <div className="space-y-1.5"><Label>New password</Label><Input type="password"/></div>
        <div className="space-y-1.5"><Label>Confirm password</Label><Input type="password"/></div>
        <Button className="w-full">Update password</Button>
      </form>
    </AuthLayout>
  );
}
