import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AutoCareLogo } from "@/components/AutoCareLogo";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface TrustBadge {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface AuthLayoutProps {
  heading: string;
  subheading: string;
  features: Feature[];
  trustBadges: TrustBadge[];
  children: ReactNode;
}

export function AuthLayout({ heading, subheading, features, trustBadges, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#eef2f9] dark:bg-background">
      <div className="relative grid grid-cols-1 lg:grid-cols-[44%_56%]">
        <div className="relative hidden flex-col overflow-hidden bg-[#0b1220] px-8 py-10 text-white lg:flex xl:px-12">
          <div className="flex items-center gap-2.5">
            <AutoCareLogo className="h-12 w-12 shrink-0" />
            <div className="leading-tight">
              <p className="text-xl font-bold">
                Eva <span className="text-primary">AutoCare</span>
              </p>
              <p className="text-xs text-white/60">Service Agency Portal</p>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-3xl font-extrabold leading-tight xl:text-4xl">{heading}</h1>
            <p className="mt-3 max-w-sm text-sm text-white/70">{subheading}</p>
          </div>

          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1200&auto=format&fit=crop"
              alt="Mechanic servicing a car on a lift in a garage"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,#0b1220_0%,rgba(11,18,32,0.85)_18%,rgba(11,18,32,0.35)_45%,transparent_70%)]" />
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#0b1220] to-transparent" />
          </div>

          <ul className="-mt-6 flex flex-col relative z-10">
            {features.map((f, i) => (
              <li
                key={f.title}
                className={`flex items-start gap-3 py-3 ${i !== features.length - 1 ? "border-b border-white/10" : ""}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/90">
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-xs text-white/60">{f.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-auto pt-8 text-xs text-white/50">
            © {new Date().getFullYear()} Eva <span className="font-semibold text-primary">AutoCare</span>. All
            rights reserved.
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center px-4 py-10 sm:px-8 lg:px-10 xl:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(hsl(var(--foreground)/0.15)_1px,transparent_1px)] [background-size:18px_18px]"
            aria-hidden
          />
          <div className="relative z-10 flex lg:hidden w-full max-w-md flex-col items-center gap-2 pb-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0b1220]">
              <AutoCareLogo className="h-11 w-11" />
            </span>
            <p className="text-lg font-bold">
              Eva <span className="text-primary">AutoCare</span>
            </p>
          </div>
          <div className="relative z-10 w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl sm:p-8">
            {children}
          </div>
        </div>
      </div>

      <div className="border-t bg-background">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-start gap-2.5">
              <b.icon className="mt-0.5 h-5 w-5 shrink-0 text-foreground" />
              <div>
                <p className="text-sm font-semibold">{b.title}</p>
                <p className="text-xs text-muted-foreground">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
