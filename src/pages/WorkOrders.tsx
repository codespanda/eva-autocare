import { useMemo, useState } from "react";
import {
  CalendarRange,
  CheckCircle2,
  Clock,
  Filter,
  MoreVertical,
  Search,
  Wrench,
  XCircle,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Pagination } from "@/components/Pagination";
import { WorkOrderDetailPanel } from "@/components/WorkOrderDetailPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { workOrders, type Status, type WorkOrder } from "@/lib/mock-data";

const STATS = [
  { icon: CalendarRange, label: "Total Work Orders", value: workOrders.length, trend: { value: "18% vs Last Month", direction: "up" as const } },
  { icon: Clock, label: "Pending", value: workOrders.filter((w) => w.status === "Pending").length, trend: { value: "8% vs Last Month", direction: "up" as const } },
  { icon: Wrench, label: "In Progress", value: workOrders.filter((w) => w.status === "In Progress").length, trend: { value: "12% vs Last Month", direction: "up" as const } },
  { icon: CheckCircle2, label: "Completed", value: workOrders.filter((w) => w.status === "Completed").length, trend: { value: "15% vs Last Month", direction: "up" as const } },
  { icon: XCircle, label: "Cancelled", value: workOrders.filter((w) => w.status === "Cancelled").length, trend: { value: "5% vs Last Month", direction: "down" as const } },
];

const TABS: { label: string; value: Status | "All" }[] = [
  { label: "All Work Orders", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "On Hold", value: "On Hold" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

const PAGE_SIZE = 5;

export function WorkOrders() {
  const [tab, setTab] = useState<Status | "All">("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<WorkOrder | null>(null);

  const filtered = useMemo(() => {
    return workOrders.filter((w) => {
      const matchesTab = tab === "All" || w.status === tab;
      const matchesSearch =
        search.trim() === "" ||
        w.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        w.vehicleLabel.toLowerCase().includes(search.toLowerCase()) ||
        w.id.toLowerCase().includes(search.toLowerCase());
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

            <Button variant="outline" className="justify-start gap-2 lg:self-start">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by WO #, customer, vehicle, VIN..."
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
              <TableHead>WO #</TableHead>
              <TableHead>Customer & Vehicle</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((w) => (
              <TableRow key={w.id} className="cursor-pointer" onClick={() => setSelected(w)}>
                <TableCell>
                  <p className="font-semibold text-primary">{w.id}</p>
                  <p className="text-xs text-muted-foreground">{w.invoiceId}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{w.customer.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {w.vehicleLabel} • {w.vehiclePlate}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{w.service}</p>
                  <span className="mt-0.5 inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                    {w.serviceTag}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={w.status} />
                </TableCell>
                <TableCell>
                  <span
                    className={
                      w.priority === "High"
                        ? "text-red-600"
                        : w.priority === "Medium"
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }
                  >
                    {w.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{w.technician}</p>
                  <p className="text-xs text-muted-foreground">{w.technicianRole}</p>
                </TableCell>
                <TableCell className="font-semibold">₹{w.total.toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label="More actions"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalLabel={`Showing ${paged.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to ${
            (page - 1) * PAGE_SIZE + paged.length
          } of ${filtered.length} work orders`}
        />
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-md">
          <VisuallyHidden>
            <SheetTitle>Work Order Details</SheetTitle>
          </VisuallyHidden>
          {selected && <WorkOrderDetailPanel order={selected} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}
