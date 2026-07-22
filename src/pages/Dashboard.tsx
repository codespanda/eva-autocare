import { useState } from "react";
import {
  CalendarCheck,
  Clock,
  IndianRupee,
  Star,
  CalendarPlus,
  Wrench,
  UserPlus,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  appointments,
  avatarUrl,
  revenueSummary,
  serviceOverview,
  technicians,
  workOrders,
} from "@/lib/mock-data";
import { AddAppointmentDialog } from "@/components/forms/AddAppointmentDialog";
import { AddWorkOrderDialog } from "@/components/forms/AddWorkOrderDialog";
import { AddCustomerDialog } from "@/components/forms/AddCustomerDialog";
import { AddInvoiceDialog } from "@/components/forms/AddInvoiceDialog";

const STATS = [
  { icon: CalendarCheck, label: "Total Appointments", value: 28, trend: { value: "12% vs Yesterday", direction: "up" as const } },
  { icon: Wrench, label: "Completed Jobs", value: 18, trend: { value: "8% vs Yesterday", direction: "up" as const } },
  { icon: Clock, label: "In Progress", value: 7, trend: { value: "2% vs Yesterday", direction: "down" as const } },
  { icon: IndianRupee, label: "Today's Revenue", value: "₹48,750", trend: { value: "15% vs Yesterday", direction: "up" as const } },
  { icon: Star, label: "Avg. Rating", value: 4.7, trend: { value: "0.3 vs Yesterday", direction: "up" as const } },
];

type QuickActionKey = "appointment" | "workOrder" | "customer" | "invoice";

const QUICK_ACTIONS: { icon: typeof CalendarPlus; label: string; key: QuickActionKey }[] = [
  { icon: CalendarPlus, label: "New Appointment", key: "appointment" },
  { icon: Wrench, label: "Create Work Order", key: "workOrder" },
  { icon: UserPlus, label: "Add Customer", key: "customer" },
  { icon: FileText, label: "Generate Invoice", key: "invoice" },
];

export function Dashboard() {
  const [openDialog, setOpenDialog] = useState<QuickActionKey | null>(null);

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Service Overview</CardTitle>
            <select className="rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </CardHeader>
          <CardContent className="pl-0 pr-2 sm:pr-4">
            <div className="h-64 w-full sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={serviceOverview} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid hsl(var(--border))",
                      fontSize: 12,
                      background: "hsl(var(--popover))",
                    }}
                  />
                  <Line type="monotone" dataKey="appointments" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Appointments" />
                  <Line type="monotone" dataKey="completed" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} name="Completed" />
                  <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Revenue (₹K)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <LegendDot color="#3b82f6" label="Appointments" />
              <LegendDot color="#22c55e" label="Completed" />
              <LegendDot color="#f59e0b" label="Revenue (₹K)" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Upcoming Appointments</CardTitle>
            <a href="/appointments" className="text-xs font-semibold text-primary hover:underline">
              View All
            </a>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {appointments.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <div className="w-16 shrink-0 text-xs font-semibold text-muted-foreground">{a.time}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{a.customer.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.service}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Recent Work Orders</CardTitle>
            <a href="/work-orders" className="text-xs font-semibold text-primary hover:underline">
              View All
            </a>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {workOrders.slice(0, 5).map((wo) => (
              <div key={wo.id} className="flex items-center gap-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-primary">{wo.id}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {wo.customer.name} • {wo.service}
                  </p>
                </div>
                <span className="w-16 shrink-0 text-right text-sm font-medium tabular-nums">
                  ₹{wo.total.toLocaleString("en-IN")}
                </span>
                <div className="flex w-28 shrink-0 justify-end">
                  <StatusBadge status={wo.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Technicians Status</CardTitle>
            <a href="/technicians" className="text-xs font-semibold text-primary hover:underline">
              View All
            </a>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {technicians.map((t) => (
              <div key={t.name} className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={avatarUrl(t.avatarSeed)} alt={t.name} />
                  <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                </div>
                <div className="w-24 shrink-0">
                  <Progress value={t.load} className="h-1.5" />
                </div>
                <span className="w-10 shrink-0 text-right text-xs font-semibold text-muted-foreground">
                  {t.load}%
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Inventory Summary</CardTitle>
            <a href="/inventory" className="text-xs font-semibold text-primary hover:underline">
              View All
            </a>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm">
            <SummaryRow label="Total Items" value="256" />
            <SummaryRow label="Low Stock Items" value="18" valueClassName="text-amber-600" />
            <SummaryRow label="Out of Stock" value="5" valueClassName="text-red-600" />
            <SummaryRow label="Total Value" value="₹2,45,000" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Revenue Summary</CardTitle>
            <select className="rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium">
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹6,45,300</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-emerald-600">
              ↑ 18% vs Last Month
            </p>
            <div className="mt-3 h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueSummary}>
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={() => setOpenDialog(action.key)}
                className="flex flex-col items-center gap-2 rounded-xl border bg-muted/30 p-4 text-center transition-colors hover:bg-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <action.icon className="h-5 w-5" />
                </span>
                <span className="text-xs font-medium leading-tight">{action.label}</span>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <AddAppointmentDialog open={openDialog === "appointment"} onOpenChange={(o) => setOpenDialog(o ? "appointment" : null)} />
      <AddWorkOrderDialog open={openDialog === "workOrder"} onOpenChange={(o) => setOpenDialog(o ? "workOrder" : null)} />
      <AddCustomerDialog open={openDialog === "customer"} onOpenChange={(o) => setOpenDialog(o ? "customer" : null)} />
      <AddInvoiceDialog open={openDialog === "invoice"} onOpenChange={(o) => setOpenDialog(o ? "invoice" : null)} />
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function SummaryRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-semibold ${valueClassName ?? ""}`}>{value}</span>
    </div>
  );
}
