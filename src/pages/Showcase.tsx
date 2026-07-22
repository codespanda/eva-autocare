import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  ExternalLink,
  Github,
  BookOpen,
  Code2,
  Palette,
  Smartphone,
  Zap,
  BarChart3,
  LayoutTemplate,
  Users,
  Briefcase,
  Wrench,
  Sparkles,
  Calendar,
  ClipboardList,
  UserCog,
  Car,
  Package,
  Receipt,
  Star as StarIcon,
  Settings as SettingsIcon,
  LogIn,
} from "lucide-react";
import { AutoCareLogo } from "@/components/AutoCareLogo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LIVE_URL = "https://codespanda.github.io/eva-autocare/";
const REPO_URL = "https://github.com/codespanda/eva-autocare";

const WHO_FOR = [
  "Developers building a custom auto-service or garage admin for a client",
  "Agencies creating vehicle service management portals",
  "Startups building an auto-care SaaS or fleet management platform",
  "Freelancers wanting a solid, customisable free starter",
  "Teams replacing spreadsheets with a modern React service-center UI",
];

const GALLERY = [
  { icon: LayoutTemplate, label: "Dashboard" },
  { icon: Calendar, label: "Appointments" },
  { icon: Users, label: "Customers" },
  { icon: Receipt, label: "Invoices & Billing" },
  { icon: Car, label: "Vehicles" },
  { icon: SettingsIcon, label: "Settings" },
];

const WHY = [
  { icon: Code2, title: "TypeScript-First", description: "Every component, page and data fixture is fully typed. Clean, predictable code that scales with your team." },
  { icon: Palette, title: "Pixel-Perfect UI", description: "Tailwind CSS design tokens with a real, working light and dark theme toggle." },
  { icon: Smartphone, title: "Fully Responsive", description: "Off-canvas drawer sidebar on mobile, always-visible sidebar on desktop — no separate mobile build." },
  { icon: Zap, title: "Vite-Powered Builds", description: "Sub-second HMR during development and an optimized production bundle." },
  { icon: BarChart3, title: "Recharts Data Viz", description: "Trend, donut and bar charts across every module — revenue, ratings, inventory, work orders." },
  { icon: LayoutTemplate, title: "Reusable Form Dialogs", description: "One generic form-dialog pattern wired to every Add / New button in the app." },
];

const MODULES = [
  { icon: LayoutTemplate, title: "Dashboard", description: "Appointment, revenue, technician and inventory stats with trend charts." },
  { icon: Calendar, title: "Appointments", description: "Status tabs, search, filters, and a full booking table with pagination." },
  { icon: ClipboardList, title: "Service Requests", description: "Priority-driven intake queue with technician assignment." },
  { icon: Users, title: "Customers", description: "Searchable directory with a detailed customer activity panel." },
  { icon: Car, title: "Vehicles", description: "Fleet directory with owner, insurance and service history detail." },
  { icon: Wrench, title: "Work Orders", description: "Full job lifecycle with a live status timeline." },
  { icon: Package, title: "Inventory", description: "Stock levels, suppliers and reorder alerts with a detail panel." },
  { icon: UserCog, title: "Technicians", description: "Skill levels, workload and performance tracking." },
  { icon: Receipt, title: "Invoices & Billing", description: "Line-item invoicing, payment history and status tracking." },
  { icon: BarChart3, title: "Reports", description: "Revenue, service and technician analytics with donut and bar charts." },
  { icon: StarIcon, title: "Reviews & Ratings", description: "Rating distribution, trends and top-rated technicians." },
  { icon: SettingsIcon, title: "Settings", description: "11 tabs covering business profile, branches, users, billing and more." },
  { icon: LogIn, title: "Auth screens", description: "Sign in and sign up pages outside the dashboard shell." },
];

const TECH_STACK = ["React", "Vite", "TypeScript", "Tailwind CSS", "shadcn/ui", "radix-ui", "React Router", "Recharts"];

const STEPS = [
  { step: "01", title: "Clone the repo", code: `git clone ${REPO_URL}.git` },
  { step: "02", title: "Install dependencies", code: "npm install" },
  { step: "03", title: "Start the dev server", code: "npm run dev" },
  { step: "04", title: "Open in browser", code: "http://localhost:5173/" },
];

const FAQS = [
  {
    q: "Can I use Eva AutoCare in commercial projects?",
    a: "Yes. It's released under the MIT License. Use it in client work, SaaS products, white-label builds, and commercial applications with no attribution required.",
  },
  {
    q: "Is it suitable for shops other than a full multi-branch service center?",
    a: "Absolutely. While designed around a multi-branch operation, the modules (appointments, vehicles, invoices, inventory) apply just as well to independent garages and single-location workshops. Rename labels and trim modules to fit your domain.",
  },
  {
    q: "Does it include a real backend or database?",
    a: "No — it's a UI-only demo. Every list and detail page is driven by static TypeScript fixtures under src/lib/mock-data.ts, with no persistence or API layer. Wiring up your own backend is on you.",
  },
  {
    q: "How is it different from other admin dashboard templates?",
    a: "Eva AutoCare is purpose-built for automotive service workflows — appointments, work orders, technician skill tracking, vehicle history and parts inventory — that a general-purpose admin dashboard doesn't touch.",
  },
];

function SectionLabel({ children }: { children: string }) {
  return <p className="text-xs font-bold uppercase tracking-widest text-primary">{children}</p>;
}

export function Showcase() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <AutoCareLogo className="h-9 w-9" />
            <span className="text-base font-bold">
              Eva <span className="text-primary">AutoCare</span>
            </span>
          </Link>
          <div className="hidden items-center gap-2 sm:flex">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            </Button>
            <Button asChild size="sm" className="gap-1.5">
              <a href={LIVE_URL} target="_blank" rel="noreferrer">
                Live Preview
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">New</Badge>
            <Badge variant="secondary">Automotive / Service Center Admin</Badge>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">Free</Badge>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">Eva AutoCare</h1>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
            A full auto-service admin dashboard covering appointments, service requests, customers,
            vehicles, work orders, inventory, technicians, invoicing, reports and reviews across
            production-ready pages — built with React, Vite, Tailwind CSS, and TypeScript.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              5.0
            </span>
            <span>·</span>
            <span>MIT License</span>
            <span>·</span>
            <span>Updated July 2026</span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <a href={LIVE_URL} target="_blank" rel="noreferrer">
                Live Preview
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href={`${REPO_URL}#readme`} target="_blank" rel="noreferrer">
                <BookOpen className="h-4 w-4" />
                Documentation
              </a>
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">codespanda.github.io/eva-autocare</p>
        </section>

        {/* What is it */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">What is Eva AutoCare?</h2>
              <p className="mt-4 text-muted-foreground">
                Eva AutoCare is a free, open-source React auto-service admin dashboard — appointments,
                service requests, customers, vehicles, work orders, technicians, inventory, invoicing
                and reviews, plus a fully-tabbed settings area. You get a fully wired application —
                real navigation, working page layouts, and realistic mock data across every module
                from day one.
              </p>
              <p className="mt-4 text-muted-foreground">
                Built with Tailwind CSS and a clean design system you can retheme in minutes, with a
                working dark mode toggle out of the box. Whether you're building a custom garage or
                service-center admin for a client, launching an auto-care SaaS product, or prototyping
                a fleet management app, Eva AutoCare gives you a production-ready foundation instantly.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold">Who is it for?</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {WHO_FOR.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">See it in action</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A tour of the key modules — every page is production-ready and fully responsive.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {GALLERY.map((g) => (
              <a
                key={g.label}
                href={LIVE_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-xl border bg-muted/40 transition-colors hover:border-primary hover:bg-accent"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <g.icon className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold">{g.label}</span>
              </a>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <a href={LIVE_URL} target="_blank" rel="noreferrer">
                Explore all
              </a>
            </Button>
          </div>
        </section>

        {/* Why */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <SectionLabel>Why Eva AutoCare</SectionLabel>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Built for real automotive service projects</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {WHY.map((w) => (
                <Card key={w.title}>
                  <CardContent className="flex flex-col gap-3 p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <w.icon className="h-5 w-5" />
                    </span>
                    <p className="font-semibold">{w.title}</p>
                    <p className="text-sm text-muted-foreground">{w.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionLabel>What's included</SectionLabel>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{MODULES.length} fully built modules</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Every module ships with working layouts, realistic sample data, and full responsiveness.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <Card key={m.title}>
                <CardContent className="flex items-start gap-3 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <m.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{m.title}</p>
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">Live</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16">
            <SectionLabel>Tech stack</SectionLabel>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Built with modern tools</h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {TECH_STACK.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium shadow-sm"
                >
                  <Briefcase className="h-4 w-4 text-primary" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Docs */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <SectionLabel>Documentation</SectionLabel>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Get running in 2 minutes</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Node.js 18+ required. No paid tools, no account sign-ups.</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.step} className="rounded-xl border p-5">
                <span className="text-xs font-bold text-primary">{s.step}</span>
                <p className="mt-1 font-semibold">{s.title}</p>
                <code className="mt-3 block overflow-x-auto rounded-md bg-muted px-3 py-2 text-xs">{s.code}</code>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button asChild variant="outline">
              <a href={`${REPO_URL}#readme`} target="_blank" rel="noreferrer">
                View Documentation
              </a>
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Common questions</h2>
            <Accordion type="single" collapsible className="mt-6 w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to build?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Eva AutoCare is completely free and open-source. Clone it, customise it, and ship it.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <a href={LIVE_URL} target="_blank" rel="noreferrer">
                Live Preview
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                <Star className="h-4 w-4" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Eva AutoCare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
