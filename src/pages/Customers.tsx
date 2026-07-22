import { useMemo, useState } from "react";
import { Filter, MoreVertical, Plus, RefreshCcw, Search, UserPlus, Users } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Pagination } from "@/components/Pagination";
import { CustomerDetailPanel } from "@/components/CustomerDetailPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { customers, avatarUrl, type Customer } from "@/lib/mock-data";
import { AddCustomerDialog } from "@/components/forms/AddCustomerDialog";

const STATS = [
  { icon: Users, label: "Total Customers", value: customers.length, trend: { value: "15% vs Last Month", direction: "up" as const } },
  { icon: UserPlus, label: "New Customers", value: 28, trend: { value: "12% vs Last Month", direction: "up" as const } },
  { icon: Users, label: "Active Customers", value: customers.filter((c) => c.status !== "Inactive").length, trend: { value: "18% vs Last Month", direction: "up" as const } },
  { icon: RefreshCcw, label: "Returning Customers", value: 152, trend: { value: "10% vs Last Month", direction: "up" as const } },
];

const STATUS_STYLES: Record<Customer["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700",
  VIP: "bg-violet-50 text-violet-700",
  Inactive: "bg-slate-100 text-slate-600",
};

const PAGE_SIZE = 5;

export function Customers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo(() => {
    return customers.filter(
      (c) =>
        search.trim() === "" ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
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
                placeholder="Search customers..."
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
                Add Customer
              </Button>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Vehicles</TableHead>
              <TableHead>Total Bookings</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paged.map((c) => (
              <TableRow key={c.id} className="cursor-pointer" onClick={() => setSelected(c)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarImage src={avatarUrl(c.avatarSeed)} alt={c.name} />
                      <AvatarFallback>{c.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{c.name}</p>
                      <p className="truncate text-xs text-muted-foreground">ID: {c.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p>{c.phone}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                </TableCell>
                <TableCell>
                  <p>{c.vehicles}</p>
                  <button
                    className="text-xs font-semibold text-primary hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(c);
                    }}
                  >
                    View
                  </button>
                </TableCell>
                <TableCell>{c.totalBookings}</TableCell>
                <TableCell className="font-semibold">₹{c.totalSpent.toLocaleString("en-IN")}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={STATUS_STYLES[c.status]}>
                    {c.status}
                  </Badge>
                </TableCell>
                <TableCell>{c.lastVisit}</TableCell>
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
          } of ${filtered.length} customers`}
        />
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-md">
          <VisuallyHidden>
            <SheetTitle>Customer Details</SheetTitle>
          </VisuallyHidden>
          {selected && <CustomerDetailPanel customer={selected} />}
        </SheetContent>
      </Sheet>

      <AddCustomerDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
