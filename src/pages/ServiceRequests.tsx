import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Wrench,
  XCircle,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
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
import { serviceRequests, avatarUrl, type Status } from "@/lib/mock-data";
import { AddServiceRequestDialog } from "@/components/forms/AddServiceRequestDialog";

const STATS = [
  { icon: ClipboardList, label: "Total Requests", value: serviceRequests.length, trend: { value: "18% vs Yesterday", direction: "up" as const } },
  { icon: Clock, label: "Pending", value: serviceRequests.filter((r) => r.status === "Pending").length, trend: { value: "5% vs Yesterday", direction: "up" as const } },
  { icon: Wrench, label: "In Progress", value: serviceRequests.filter((r) => r.status === "In Progress").length, trend: { value: "8% vs Yesterday", direction: "up" as const } },
  { icon: CheckCircle2, label: "Completed", value: serviceRequests.filter((r) => r.status === "Completed").length, trend: { value: "12% vs Yesterday", direction: "up" as const } },
  { icon: XCircle, label: "Cancelled", value: serviceRequests.filter((r) => r.status === "Cancelled").length, trend: { value: "10% vs Yesterday", direction: "down" as const } },
];

const TABS: { label: string; value: Status | "All" }[] = [
  { label: "All Requests", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
  { label: "Cancelled", value: "Cancelled" },
];

const PAGE_SIZE = 5;

export function ServiceRequests() {
  const [tab, setTab] = useState<Status | "All">("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo(() => {
    return serviceRequests.filter((r) => {
      const matchesTab = tab === "All" || r.status === tab;
      const matchesSearch =
        search.trim() === "" ||
        r.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        r.vehicleLabel.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase());
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
                New Service Request
              </Button>
            </div>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by request ID, customer, vehicle, service..."
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
              <TableHead>Request ID</TableHead>
              <TableHead>Customer & Vehicle</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <p className="font-semibold text-primary">{r.id}</p>
                  <p className="text-xs text-muted-foreground">Created: {r.createdOn}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarImage src={avatarUrl(r.customer.avatarSeed)} alt={r.customer.name} />
                      <AvatarFallback>{r.customer.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{r.customer.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.vehiclePlate} • {r.vehicleFuel}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{r.service}</p>
                  <span className="mt-0.5 inline-block rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                    {r.serviceTag}
                  </span>
                </TableCell>
                <TableCell>
                  <PriorityBadge priority={r.priority} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={r.status} />
                </TableCell>
                <TableCell>
                  <p>{r.date}</p>
                  <p className="text-xs text-muted-foreground">{r.time}</p>
                </TableCell>
                <TableCell>
                  {r.assignedTo ? (
                    <>
                      <p className="font-medium">{r.assignedTo}</p>
                      <p className="text-xs text-muted-foreground">{r.assignedRole}</p>
                    </>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
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
                  No service requests found.
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
          } of ${filtered.length} requests`}
        />
      </Card>

      <AddServiceRequestDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
