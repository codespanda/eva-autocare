import { useMemo, useState } from "react";
import { Filter, MoreVertical, Plus, Search, UserCog, UserCheck, UserX, Wrench, CalendarClock } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Pagination } from "@/components/Pagination";
import { TechnicianDetailPanel } from "@/components/TechnicianDetailPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { technicianDirectory, avatarUrl, type TechnicianProfile } from "@/lib/mock-data";
import { AddTechnicianDialog } from "@/components/forms/AddTechnicianDialog";

const STATS = [
  { icon: UserCog, label: "Total Technicians", value: technicianDirectory.length, trend: { value: "12% vs Last Month", direction: "up" as const } },
  { icon: UserCheck, label: "Active", value: technicianDirectory.filter((t) => t.status === "Active").length, trend: { value: "10% vs Last Month", direction: "up" as const } },
  { icon: Wrench, label: "On Duty", value: technicianDirectory.filter((t) => t.onDuty === "On Duty").length, trend: { value: "15% vs Last Month", direction: "up" as const } },
  { icon: CalendarClock, label: "On Leave", value: technicianDirectory.filter((t) => t.onDuty === "On Leave").length, trend: { value: "25% vs Last Month", direction: "down" as const } },
  { icon: UserX, label: "Inactive", value: technicianDirectory.filter((t) => t.status === "Inactive").length, trend: { value: "40% vs Last Month", direction: "down" as const } },
];

const DUTY_STYLES: Record<string, string> = {
  "On Duty": "text-emerald-600",
  "On Break": "text-amber-600",
  "On Leave": "text-red-600",
  "-": "text-muted-foreground",
};

const PAGE_SIZE = 5;

export function Technicians() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<TechnicianProfile | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo(() => {
    return technicianDirectory.filter(
      (t) =>
        search.trim() === "" ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
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
                placeholder="Search technician name, skill..."
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
                Add Technician
              </Button>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Technician</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>On Duty</TableHead>
              <TableHead>Workload</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((t) => (
              <TableRow key={t.id} className="cursor-pointer" onClick={() => setSelected(t)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarImage src={avatarUrl(t.avatarSeed)} alt={t.name} />
                      <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{t.name}</p>
                      <p className="truncate text-xs text-muted-foreground">ID: {t.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex max-w-[220px] flex-wrap gap-1">
                    {t.skills.map((s) => (
                      <Badge key={s} variant="secondary" className="bg-blue-50 text-blue-700">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <p>{t.phone}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.email}</p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={t.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}
                  >
                    {t.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className={`flex items-center gap-1.5 font-medium ${DUTY_STYLES[t.onDuty]}`}>
                    {t.onDuty !== "-" && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                    {t.onDuty}
                  </span>
                  {t.onDutyNote && <p className="text-xs text-muted-foreground">{t.onDutyNote}</p>}
                </TableCell>
                <TableCell>
                  <p className="mb-1 text-xs font-medium">
                    {t.workload} / {t.workloadMax}
                  </p>
                  <Progress value={(t.workload / t.workloadMax) * 100} className="h-1.5 w-20" />
                </TableCell>
                <TableCell className="font-semibold">{t.rating} ★</TableCell>
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
          } of ${filtered.length} technicians`}
        />
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-md">
          <VisuallyHidden>
            <SheetTitle>Technician Details</SheetTitle>
          </VisuallyHidden>
          {selected && <TechnicianDetailPanel tech={selected} />}
        </SheetContent>
      </Sheet>

      <AddTechnicianDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
