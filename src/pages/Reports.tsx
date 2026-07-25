import { useState } from "react";
import {
  ClipboardList,
  IndianRupee,
  Package,
  Settings as SettingsIcon,
  Sliders,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
  Wrench,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatCard } from "@/components/StatCard";
import { DonutChart } from "@/components/DonutChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  avatarUrl,
  revenueByServiceType,
  revenueOverview,
  revenueTrend,
  reportsCenter,
  topPerformingTechnicians,
  topServicesByRevenue,
  workOrderStatusBreakdown,
} from "@/lib/mock-data";

const STATS = [
  { icon: IndianRupee, label: "Total Revenue", value: "₹18,45,600", trend: { value: "16% vs 01 Apr - 24 Apr 2025", direction: "up" as const } },
  { icon: ClipboardList, label: "Total Work Orders", value: "1,256", trend: { value: "14% vs 01 Apr - 24 Apr 2025", direction: "up" as const } },
  { icon: Wrench, label: "Completed Orders", value: "1,024", trend: { value: "18% vs 01 Apr - 24 Apr 2025", direction: "up" as const } },
  { icon: TrendingUp, label: "Average Order Value", value: "₹3,215", trend: { value: "10% vs 01 Apr - 24 Apr 2025", direction: "up" as const } },
  { icon: Users, label: "Customer Retention", value: "72%", trend: { value: "5% vs 01 Apr - 24 Apr 2025", direction: "up" as const } },
];

const REPORT_TABS = ["Overview", "Service", "Financial", "Customers", "Technicians", "Inventory", "Performance"];

const CENTER_ICONS: Record<string, typeof ClipboardList> = {
  clipboard: ClipboardList,
  wallet: Wallet,
  users: Users,
  package: Package,
  "user-cog": UserCog,
  settings: SettingsIcon,
};

export function Reports() {
  const [tab, setTab] = useState("Overview");

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex-wrap justify-start">
            {REPORT_TABS.map((t) => (
              <TabsTrigger key={t} value={t}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Button variant="outline" className="gap-2 self-start sm:self-auto">
          <Sliders className="h-4 w-4" />
          Customize Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-1.5">
              Revenue Overview
              <span className="text-xs font-normal text-muted-foreground">ⓘ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹18,45,600</p>
            <p className="mt-0.5 text-xs font-medium text-emerald-600">↑ 16% vs 01 Apr - 24 Apr 2025</p>
            <div className="mt-3 h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueOverview} margin={{ left: -20, right: 5, top: 5, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12, background: "hsl(var(--popover))" }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fill="url(#revFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Order Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center xl:flex-col 2xl:flex-row">
            <DonutChart
              data={workOrderStatusBreakdown}
              centerLabel="Total"
              centerValue="1,256"
            />
            <div className="flex flex-col gap-2.5 text-sm">
              {workOrderStatusBreakdown.map((s) => (
                <div key={s.name} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                  <p className="min-w-0">
                    <span className="font-medium">{s.name}</span>{" "}
                    <span className="whitespace-nowrap text-muted-foreground">
                      {s.value.toLocaleString("en-IN")} ({s.pct}%)
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <a href="#" className="block px-6 pb-5 text-sm font-semibold text-primary hover:underline">
            View full report →
          </a>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Service Type</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center xl:flex-col 2xl:flex-row">
            <DonutChart
              data={revenueByServiceType}
              centerLabel="Total"
              centerValue="₹18.45 Lakh"
            />
            <div className="flex flex-col gap-2.5 text-sm">
              {revenueByServiceType.map((s) => (
                <div key={s.name} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                  <p className="min-w-0">
                    <span className="font-medium">{s.name}</span>{" "}
                    <span className="whitespace-nowrap text-muted-foreground">
                      ₹{s.value.toLocaleString("en-IN")} ({s.pct}%)
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <a href="#" className="block px-6 pb-5 text-sm font-semibold text-primary hover:underline">
            View full report →
          </a>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Top Performing Technicians</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full table-fixed text-sm">
              <colgroup>
                <col className="w-auto" />
                <col className="w-16" />
                <col className="w-20" />
                <col className="w-14" />
              </colgroup>
              <thead>
                <tr className="text-left text-xs uppercase text-muted-foreground">
                  <th className="pb-2 pr-1 font-medium">Technician</th>
                  <th className="pb-2 pr-1 font-medium">Orders</th>
                  <th className="pb-2 pr-1 font-medium">Revenue</th>
                  <th className="pb-2 font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingTechnicians.map((t) => (
                  <tr key={t.name} className="border-t">
                    <td className="py-2.5 pr-1">
                      <div className="flex min-w-0 items-center gap-2">
                        <Avatar className="h-7 w-7 shrink-0">
                          <AvatarImage src={avatarUrl(t.avatarSeed)} alt={t.name} />
                          <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="truncate font-medium">{t.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-1 text-xs">
                      {t.completed}<span className="text-muted-foreground">/{t.workOrders}</span>
                    </td>
                    <td className="py-2.5 pr-1 text-xs font-medium">
                      ₹{(t.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="py-2.5 text-xs font-medium">{t.rating}★</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a href="#" className="mt-4 block text-sm font-semibold text-primary hover:underline">
              View full report →
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Revenue Trend</CardTitle>
            <select className="rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium">
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueTrend} margin={{ left: -20, right: 5, top: 5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12, background: "hsl(var(--popover))" }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <a href="#" className="mt-2 block text-sm font-semibold text-primary hover:underline">
              View full report →
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Services by Revenue</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[280px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase text-muted-foreground">
                  <th className="pb-2 font-medium">Service</th>
                  <th className="pb-2 font-medium">Work Orders</th>
                  <th className="pb-2 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topServicesByRevenue.map((s) => (
                  <tr key={s.service} className="border-t">
                    <td className="py-2.5 pr-2 font-medium">{s.service}</td>
                    <td className="py-2.5 pr-2">{s.workOrders}</td>
                    <td className="py-2.5 font-medium">₹{s.revenue.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a href="#" className="mt-4 block text-sm font-semibold text-primary hover:underline">
              View full report →
            </a>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-1 space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Reports Center</CardTitle>
            <p className="text-sm text-muted-foreground">Detailed insights and analytics for better decision making.</p>
          </div>
          <Button variant="outline" className="self-start sm:self-auto">
            View All Reports
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {reportsCenter.map((r) => {
            const Icon = CENTER_ICONS[r.icon];
            return (
              <button
                key={r.title}
                className="flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors hover:bg-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{r.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{r.description}</p>
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
