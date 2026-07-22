import { useMemo, useState } from "react";
import { Car, Filter, MoreVertical, Plus, Search, Wrench, XCircle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Pagination } from "@/components/Pagination";
import { VehicleDetailPanel } from "@/components/VehicleDetailPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vehicles, type Vehicle } from "@/lib/mock-data";
import { AddVehicleDialog } from "@/components/forms/AddVehicleDialog";

const STATUS_STYLES: Record<Vehicle["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700",
  "In Service": "bg-blue-50 text-blue-700",
  "Under Maintenance": "bg-amber-50 text-amber-700",
  Inactive: "bg-slate-100 text-slate-600",
};

const STATS = [
  { icon: Car, label: "Total Vehicles", value: vehicles.length, trend: { value: "15% vs Last Month", direction: "up" as const } },
  { icon: Car, label: "Active Vehicles", value: vehicles.filter((v) => v.status === "Active").length, trend: { value: "12% vs Last Month", direction: "up" as const } },
  { icon: Wrench, label: "In Service", value: vehicles.filter((v) => v.status === "In Service").length, trend: { value: "8% vs Last Month", direction: "up" as const } },
  { icon: Wrench, label: "Under Maintenance", value: vehicles.filter((v) => v.status === "Under Maintenance").length, trend: { value: "5% vs Last Month", direction: "down" as const } },
  { icon: XCircle, label: "Inactive Vehicles", value: vehicles.filter((v) => v.status === "Inactive").length, trend: { value: "8% vs Last Month", direction: "down" as const } },
];

const PAGE_SIZE = 5;

export function Vehicles() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo(() => {
    return vehicles.filter(
      (v) =>
        search.trim() === "" ||
        v.model.toLowerCase().includes(search.toLowerCase()) ||
        v.plate.toLowerCase().includes(search.toLowerCase()) ||
        v.owner.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by vehicle, plate number, VIN..."
                className="pl-9"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button variant="outline" className="justify-start gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="gap-2" onClick={() => setAddOpen(true)}>
                <Plus className="h-4 w-4" />
                Add Vehicle
              </Button>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle / Owner</TableHead>
              <TableHead>Vehicle Details</TableHead>
              <TableHead>Plate / VIN</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Service</TableHead>
              <TableHead>Next Service</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((v) => (
              <TableRow key={v.id} className="cursor-pointer" onClick={() => setSelected(v)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Car className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{v.model}</p>
                      <p className="truncate text-xs text-muted-foreground">{v.owner.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{v.owner.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p>
                    {v.type} • {v.fuel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {v.year} • {v.color}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{v.plate}</p>
                  <p className="truncate text-xs text-muted-foreground">VIN: {v.vin}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={STATUS_STYLES[v.status]}>
                    {v.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p>{v.lastService}</p>
                  <p className="text-xs text-muted-foreground">{v.odometer}</p>
                </TableCell>
                <TableCell>{v.nextService}</TableCell>
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
          } of ${filtered.length} vehicles`}
        />
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-md">
          <VisuallyHidden>
            <SheetTitle>Vehicle Details</SheetTitle>
          </VisuallyHidden>
          {selected && <VehicleDetailPanel vehicle={selected} />}
        </SheetContent>
      </Sheet>

      <AddVehicleDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
