import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/two-factor")({ component: TwoFactor });

function TwoFactor() {
  const nav = useNavigate();
  return (
    <AuthLayout title="Two-factor authentication" subtitle="Enter the 6-digit code from your authenticator app." footer={<Link to="/login" className="underline underline-offset-4">Use another method</Link>}>
      <form className="space-y-6" onSubmit={(e)=>{e.preventDefault(); nav({to:"/"});}}>
        <div className="flex justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {[0,1,2,3,4,5].map(i=><InputOTPSlot key={i} index={i}/>)}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" className="w-full">Verify and continue</Button>
        <p className="text-center text-xs text-muted-foreground">Didn't receive a code? <button type="button" className="text-foreground underline underline-offset-4">Resend</button></p>
      </form>
    </AuthLayout>
  );
}
