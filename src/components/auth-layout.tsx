import type { ReactNode } from "react";

export function AuthLayout({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-10 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{background:"radial-gradient(circle at 20% 20%, oklch(0.5 0.2 260) 0%, transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.4 0.18 300) 0%, transparent 50%)"}} />
        <div className="relative flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-foreground text-primary font-display text-lg">A</div>
          <span className="font-semibold tracking-tight">Atelier OS</span>
        </div>
        <div className="relative space-y-6 max-w-md">
          <h2 className="font-display text-5xl leading-[1.05]">Run your brand from a single command center.</h2>
          <p className="text-primary-foreground/70">Inventory, orders, customers, finance, and AI-powered insights — designed for modern clothing brands.</p>
          <div className="flex items-center gap-3 pt-4 border-t border-primary-foreground/15">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/10 font-medium">EM</div>
            <div>
              <p className="text-sm font-medium">"Cut our ops time in half."</p>
              <p className="text-xs text-primary-foreground/60">Elena M. · Founder, Maison Rue</p>
            </div>
          </div>
        </div>
        <div className="relative text-xs text-primary-foreground/50">© 2026 Atelier OS · v1.0</div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground font-display text-lg">A</div>
            <span className="font-semibold tracking-tight">Atelier OS</span>
          </div>
          <h1 className="font-display text-4xl leading-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted-foreground text-center">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
