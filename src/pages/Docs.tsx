import {
  ArrowUp,
  Check,
  Code2,
  ExternalLink,
  Github,
  LayoutTemplate,
  Moon,
  Palette,
  Sun,
  Zap,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { AutoCareLogo } from "@/components/AutoCareLogo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const LIVE_URL = "https://eva-autocare.codespanda.com/";
const REPO_URL = "https://github.com/codespanda/eva-autocare";

const OVERVIEW_FEATURES = [
  { icon: Zap, title: "React 18 + Vite", description: "Instant HMR in dev and a tiny, fast production build." },
  { icon: Palette, title: "Tailwind + shadcn/ui", description: "Accessible, themeable components built on radix-ui primitives." },
  { icon: LayoutTemplate, title: "Appointments, work orders & billing", description: "Full service flow with bookings, job tracking and invoicing." },
  { icon: Code2, title: "Reports & analytics", description: "Revenue trends, top services, and rating breakdowns, ready for real data." },
];

const SCRIPTS = [
  { command: "npm run dev", description: "Start the Vite dev server with HMR." },
  { command: "npm run build", description: "Type-check and build to dist/." },
  { command: "npm run preview", description: "Serve the production build locally." },
  { command: "npm run lint", description: "Run ESLint across the project." },
];

const ROUTES = [
  { route: "/", description: "Dashboard — appointment, revenue, technician and inventory stats" },
  { route: "/appointments", description: "Booking table with status tabs, search and filters" },
  { route: "/service-requests", description: "Priority-driven intake queue with technician assignment" },
  { route: "/customers", description: "Customer directory with a detailed activity panel" },
  { route: "/vehicles", description: "Fleet directory with owner, insurance and service history" },
  { route: "/work-orders", description: "Full job lifecycle with a live status timeline" },
  { route: "/inventory", description: "Stock levels, suppliers and reorder alerts" },
  { route: "/technicians", description: "Skill levels, workload and performance tracking" },
  { route: "/invoices", description: "Line-item invoicing, payment history and status" },
  { route: "/reports", description: "Revenue, service and technician analytics" },
  { route: "/reviews", description: "Rating distribution, trends and top-rated technicians" },
  { route: "/settings", description: "11 tabs — business profile, branches, users, billing and more" },
  { route: "/signin", description: "Sign in screen" },
  { route: "/signup", description: "Create an account" },
];

const PROJECT_TREE = `src/
├─ App.tsx                # route table
├─ main.tsx                # app entry (HashRouter)
├─ pages/                   # route-level page components
├─ components/
│  ├─ ui/                    # shadcn primitives (Button, Card, Dialog…)
│  ├─ layout/                 # Sidebar, Topbar, DashboardLayout
│  ├─ auth/                    # AuthLayout
│  ├─ forms/                    # Add / New dialog forms
│  ├─ settings/                  # Settings tab components
│  └─ *DetailPanel.tsx            # right-side detail panels
├─ lib/                       # mock-data, theme, utils, hooks
└─ index.css                  # design tokens (CSS custom properties)`;

function CodeBlock({ code, label = "BASH" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-lg border bg-[#0b1220]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">{label}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="text-[11px] font-medium text-white/60 hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-xs text-white/90 sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="text-xs font-bold uppercase tracking-widest text-primary">{children}</p>;
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {n}
      </span>
      <div className="min-w-0 flex-1 pb-8">
        <p className="font-semibold">{title}</p>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

export function Docs() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div id="top" className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0b1220]">
              <AutoCareLogo className="h-6 w-6" />
            </span>
            <span className="text-sm font-bold">
              Eva <span className="text-primary">AutoCare</span>
            </span>
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleTheme} aria-label="Toggle dark mode">
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <a href={REPO_URL} target="_blank" rel="noreferrer">
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            </Button>
            <Button asChild size="sm" className="gap-1.5">
              <a href={LIVE_URL} target="_blank" rel="noreferrer">
                Open Dashboard
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16">
        <DocsToc />

        <div className="min-w-0 flex-1">
        {/* Hero */}
        <section>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-extrabold sm:text-3xl">Eva AutoCare</h1>
            <Badge variant="secondary">v1.0 · React + Vite</Badge>
          </div>
          <p className="mt-3 text-lg font-medium text-muted-foreground">
            Book, track and bill service jobs in minutes, not months.
          </p>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Everything you need to run Eva AutoCare and build with its component library — an
            auto-service admin dashboard built on React 18, Vite, Tailwind CSS, and shadcn/ui.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <a href={LIVE_URL} target="_blank" rel="noreferrer">
                Open the live dashboard
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#quick-start">Read the quick start</a>
            </Button>
          </div>
        </section>

        {/* Overview */}
        <section className="mt-16 scroll-mt-20" id="overview">
          <SectionLabel>Overview</SectionLabel>
          <h2 className="mt-2 text-xl font-bold sm:text-2xl">A production-ready auto-service dashboard starter</h2>
          <p className="mt-3 text-muted-foreground">
            A service-center-ready admin starter with appointments, work orders, customers, vehicles,
            inventory, invoicing, and reports — fully responsive with dark mode.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {OVERVIEW_FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3 rounded-lg border p-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick start */}
        <section className="mt-16 scroll-mt-20" id="quick-start">
          <SectionLabel>Quick start</SectionLabel>
          <h2 className="mt-2 text-xl font-bold sm:text-2xl">Get it running locally</h2>
          <p className="mt-3 text-muted-foreground">
            You'll need Node 18+ (Node 20 recommended) and npm.
          </p>
          <div className="mt-8">
            <Step n={1} title="Get the code">
              <p className="text-sm text-muted-foreground">Clone the repository (or download it as a ZIP).</p>
              <div className="mt-2">
                <CodeBlock code={`git clone ${REPO_URL}.git\ncd eva-autocare`} />
              </div>
            </Step>
            <Step n={2} title="Install dependencies">
              <CodeBlock code="npm install" />
            </Step>
            <Step n={3} title="Start the dev server">
              <p className="text-sm text-muted-foreground">
                Vite serves the app at http://localhost:5173 with hot reload.
              </p>
              <div className="mt-2">
                <CodeBlock code="npm run dev" />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                The <code className="rounded bg-muted px-1 py-0.5">@</code> alias points to{" "}
                <code className="rounded bg-muted px-1 py-0.5">src/</code>, so imports look like{" "}
                <code className="rounded bg-muted px-1 py-0.5">import {"{"} Button {"}"} from '@/components/ui/button'</code>.
              </p>
            </Step>
          </div>
        </section>

        {/* Scripts */}
        <section className="mt-16 scroll-mt-20" id="scripts">
          <SectionLabel>Scripts</SectionLabel>
          <h2 className="mt-2 text-xl font-bold sm:text-2xl">Available commands</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Command</th>
                  <th className="px-4 py-2.5 text-left font-semibold">What it does</th>
                </tr>
              </thead>
              <tbody>
                {SCRIPTS.map((s, i) => (
                  <tr key={s.command} className={i !== SCRIPTS.length - 1 ? "border-b" : ""}>
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs">{s.command}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{s.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Deploy */}
        <section className="mt-16 scroll-mt-20" id="deploy">
          <SectionLabel>Deploy</SectionLabel>
          <h2 className="mt-2 text-xl font-bold sm:text-2xl">Deploy to GitHub Pages</h2>
          <p className="mt-3 text-muted-foreground">
            This project ships with a GitHub Actions workflow that builds and deploys to the{" "}
            <code className="rounded bg-muted px-1 py-0.5">gh-pages</code> branch on every push to main.
          </p>
          <div className="mt-8">
            <Step n={1} title="Hash-based routing on a static host">
              <p className="text-sm text-muted-foreground">
                GitHub Pages has no server-side rewrites, so a hard navigation to a nested route like{" "}
                <code className="rounded bg-muted px-1 py-0.5">/settings</code> would 404 before React
                Router ever sees it. Eva AutoCare uses React Router's{" "}
                <code className="rounded bg-muted px-1 py-0.5">HashRouter</code> instead of{" "}
                <code className="rounded bg-muted px-1 py-0.5">BrowserRouter</code> — every route lives
                after a <code className="rounded bg-muted px-1 py-0.5">#</code>, so the server only ever
                sees a request for <code className="rounded bg-muted px-1 py-0.5">index.html</code>.
              </p>
            </Step>
            <Step n={2} title="Enable Pages">
              <p className="text-sm text-muted-foreground">
                In your repo: <strong>Settings → Pages → Build and deployment → Source</strong>, then
                point it at the <code className="rounded bg-muted px-1 py-0.5">gh-pages</code> branch.
              </p>
            </Step>
            <Step n={3} title="Push">
              <p className="text-sm text-muted-foreground">
                The workflow in <code className="rounded bg-muted px-1 py-0.5">.github/workflows/deploy.yml</code>{" "}
                handles the rest.
              </p>
              <div className="mt-2">
                <CodeBlock code="git push origin main" />
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-sm">
                <Check className="h-4 w-4 text-emerald-600" />
                Live at{" "}
                <a href={LIVE_URL} target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">
                  {LIVE_URL}
                </a>
              </p>
            </Step>
          </div>
        </section>

        {/* Project structure */}
        <section className="mt-16 scroll-mt-20" id="structure">
          <SectionLabel>Project structure</SectionLabel>
          <h2 className="mt-2 text-xl font-bold sm:text-2xl">A quick map of where things live</h2>
          <div className="mt-6">
            <CodeBlock code={PROJECT_TREE} label="TREE" />
          </div>
        </section>

        {/* Pages & Routes */}
        <section className="mt-16 scroll-mt-20" id="routes">
          <SectionLabel>Pages &amp; routes</SectionLabel>
          <h2 className="mt-2 text-xl font-bold sm:text-2xl">Every route and what it renders</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-2.5 text-left font-semibold">Route</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {ROUTES.map((r, i) => (
                  <tr key={r.route} className={i !== ROUTES.length - 1 ? "border-b" : ""}>
                    <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-primary">{r.route}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Using components */}
        <section className="mt-16 scroll-mt-20" id="components">
          <SectionLabel>Using components</SectionLabel>
          <h2 className="mt-2 text-xl font-bold sm:text-2xl">Compose from the UI kit</h2>
          <p className="mt-3 text-muted-foreground">
            Components live under <code className="rounded bg-muted px-1 py-0.5">src/components</code>.
            Import what you need and compose.
          </p>

          <div className="mt-6">
            <p className="text-sm font-semibold">Buttons</p>
            <div className="mt-2">
              <CodeBlock
                label="TSX"
                code={`import { Button } from '@/components/ui/button';

<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost" size="sm">Ghost</Button>`}
              />
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold">StatCard</p>
            <div className="mt-2">
              <CodeBlock
                label="TSX"
                code={`import { StatCard } from '@/components/StatCard';
import { CalendarCheck } from 'lucide-react';

<StatCard
  icon={CalendarCheck}
  label="Total Appointments"
  value={28}
  trend={{ value: '12% vs Yesterday', direction: 'up' }}
/>`}
              />
            </div>
          </div>
        </section>

        {/* Theming */}
        <section className="mt-16 scroll-mt-20" id="theming">
          <SectionLabel>Theming</SectionLabel>
          <h2 className="mt-2 text-xl font-bold sm:text-2xl">Theming &amp; dark mode</h2>
          <p className="mt-3 text-muted-foreground">
            Theming uses Tailwind's <code className="rounded bg-muted px-1 py-0.5">dark</code> class
            strategy. Colors are CSS custom properties defined in the global stylesheet and toggled by
            adding <code className="rounded bg-muted px-1 py-0.5">.dark</code> to the document root.
          </p>
          <div className="mt-4">
            <CodeBlock
              label="CSS"
              code={`:root {
  --primary: 221 83% 53%;   /* blue */
  --background: 0 0% 100%;
  --foreground: 222 20% 12%;
  --sidebar: 224 45% 9%;
}
.dark {
  --primary: 221 83% 60%;
  --background: 222 25% 7%;
  --foreground: 210 20% 96%;
  --sidebar: 224 45% 6%;
}`}
            />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            To change the brand color, update the <code className="rounded bg-muted px-1 py-0.5">--primary</code>{" "}
            values in <code className="rounded bg-muted px-1 py-0.5">src/index.css</code>.
          </p>
        </section>

        <div className="mt-16 flex flex-col items-center gap-4 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">Eva AutoCare · React + Vite template</p>
          <div className="flex items-center gap-4">
            <a
              href="https://codespanda.com/templates/eva-autocare"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              Template overview
            </a>
            <a href="#top" className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowUp className="h-3.5 w-3.5" />
              Back to top
            </a>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}

const TOC_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "quick-start", label: "Quick start" },
  { id: "scripts", label: "Scripts" },
  { id: "deploy", label: "Deploy to GitHub Pages" },
  { id: "structure", label: "Project structure" },
  { id: "routes", label: "Pages & routes" },
  { id: "components", label: "Using components" },
  { id: "theming", label: "Theming & dark mode" },
];

function DocsToc() {
  const [active, setActive] = useState(TOC_SECTIONS[0].id);

  useEffect(() => {
    const elements = TOC_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sticky top-24 hidden h-fit w-52 shrink-0 lg:block">
      <nav className="flex flex-col gap-0.5 border-l">
        {TOC_SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn(
              "-ml-px border-l-2 px-4 py-1.5 text-sm transition-colors",
              active === s.id
                ? "border-primary font-medium text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
