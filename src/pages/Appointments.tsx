import { useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Filter,
  MoreVertical,
  Plus,
  Search,
  XCircle,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Pagination } from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { appointments, avatarUrl, type Status } from "@/lib/mock-data";
import { AddAppointmentDialog } from "@/components/forms/AddAppointmentDialog";

const STATS = [
  { icon: CalendarCheck, label: "Total Appointments", value: appointments.length, trend: { value: "12% vs Yesterday", direction: "up" as const } },
  { icon: CheckCircle2, label: "Completed", value: appointments.filter((a) => a.status === "Completed").length, trend: { value: "8% vs Yesterday", direction: "up" as const } },
  { icon: Clock, label: "Pending", value: appointments.filter((a) => a.status === "Pending").length, trend: { value: "3% vs Yesterday", direction: "down" as const } },
  { icon: CalendarCheck, label: "Confirmed", value: appointments.filter((a) => a.status === "Confirmed").length, trend: { value: "15% vs Yesterday", direction: "up" as const } },
  { icon: XCircle, label: "Cancelled", value: appointments.filter((a) => a.status === "Cancelled").length, trend: { value: "5% vs Yesterday", direction: "down" as const } },
];

const TABS: { label: string; value: Status | "All" }[] = [
  { label: "All Appointments", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

const PAGE_SIZE = 5;

export function Appointments() {
  const [tab, setTab] = useState<Status | "All">("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesTab = tab === "All" || a.status === tab;
      const matchesSearch =
        search.trim() === "" ||
        a.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        a.vehicleLabel.toLowerCase().includes(search.toLowerCase()) ||
        a.id.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [tab, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <Card>
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs
              value={tab}
              onValueChange={(v) => {
                setTab(v as Status | "All");
                setPage(1);
              }}
            >
              <TabsList className="flex-wrap justify-start">
                {TABS.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>
                    {t.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button variant="outline" className="justify-start gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="gap-2" onClick={() => setAddOpen(true)}>
                <Plus className="h-4 w-4" />
                New Appointment
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search appointments, customer, vehicle..."
              className="pl-9"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Appointment ID</TableHead>
              <TableHead>Customer & Vehicle</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((a) => (
              <TableRow key={a.id}>
                <TableCell>
                  <p className="font-semibold text-primary">{a.id}</p>
                  <p className="text-xs text-muted-foreground">Booking ID: {a.bookingId}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarImage src={avatarUrl(a.customer.avatarSeed)} alt={a.customer.name} />
                      <AvatarFallback>{a.customer.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{a.customer.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {a.vehiclePlate} • {a.vehicleFuel}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{a.service}</p>
                  <span className="mt-0.5 inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                    {a.serviceTag}
                  </span>
                </TableCell>
                <TableCell>
                  <p>{a.date}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{a.technician}</p>
                  <p className="text-xs text-muted-foreground">{a.technicianRole}</p>
                </TableCell>
                <TableCell>
                  <StatusBadge status={a.status} />
                </TableCell>
                <TableCell className="font-semibold">₹{a.amount.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More actions">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {paged.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalLabel={`Showing ${paged.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to ${
            (page - 1) * PAGE_SIZE + paged.length
          } of ${filtered.length} appointments`}
        />
      </Card>

      <AddAppointmentDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
