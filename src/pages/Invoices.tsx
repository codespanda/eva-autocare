import { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarRange,
  CheckCircle2,
  Clock,
  Filter,
  IndianRupee,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Pagination } from "@/components/Pagination";
import { InvoiceDetailPanel } from "@/components/InvoiceDetailPanel";
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
import { invoices, type Invoice } from "@/lib/mock-data";
import { AddInvoiceDialog } from "@/components/forms/AddInvoiceDialog";
import { useMediaQuery } from "@/lib/use-media-query";

const STATUS_STYLES: Record<Invoice["status"], string> = {
  Paid: "bg-emerald-50 text-emerald-700",
  Sent: "bg-blue-50 text-blue-700",
  Overdue: "bg-red-50 text-red-700",
  Draft: "bg-slate-100 text-slate-600",
};

const PAYMENT_STYLES: Record<Invoice["paymentStatus"], string> = {
  Paid: "bg-emerald-50 text-emerald-700",
  Unpaid: "bg-red-50 text-red-700",
  Partial: "bg-amber-50 text-amber-700",
};

const totalRevenue = invoices.reduce((sum, i) => sum + i.totalAmount, 0);

const STATS = [
  { icon: CalendarRange, label: "Total Invoices", value: 256, trend: { value: "18% vs Last Month", direction: "up" as const } },
  { icon: CheckCircle2, label: "Paid Invoices", value: invoices.filter((i) => i.status === "Paid").length, trend: { value: "22% vs Last Month", direction: "up" as const } },
  { icon: Clock, label: "Pending Invoices", value: invoices.filter((i) => i.status === "Sent").length, trend: { value: "12% vs Last Month", direction: "down" as const } },
  { icon: AlertCircle, label: "Overdue Invoices", value: invoices.filter((i) => i.status === "Overdue").length, trend: { value: "8% vs Last Month", direction: "down" as const } },
  { icon: IndianRupee, label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, trend: { value: "16% vs Last Month", direction: "up" as const } },
];

const PAGE_SIZE = 5;

export function Invoices() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Invoice | null>(invoices[3]);
  const [addOpen, setAddOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const filtered = useMemo(() => {
    return invoices.filter(
      (i) =>
        search.trim() === "" ||
        i.id.toLowerCase().includes(search.toLowerCase()) ||
        i.customer.name.toLowerCase().includes(search.toLowerCase()) ||
        i.vehicleLabel.toLowerCase().includes(search.toLowerCase())
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

      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search invoice no., customer, vehicle..."
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
                New Invoice
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No.</TableHead>
                <TableHead>Customer & Vehicle</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((inv) => (
                <TableRow
                  key={inv.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(inv)}
                  data-state={selected?.id === inv.id ? "selected" : undefined}
                >
                  <TableCell className="font-semibold text-primary">{inv.id}</TableCell>
                  <TableCell>
                    <p className="font-medium">{inv.customer.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {inv.vehicleLabel} • {inv.vehiclePlate}
                    </p>
                  </TableCell>
                  <TableCell>{inv.invoiceDate}</TableCell>
                  <TableCell>{inv.dueDate}</TableCell>
                  <TableCell className="font-semibold">₹{inv.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={STATUS_STYLES[inv.status]}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={PAYMENT_STYLES[inv.paymentStatus]}>
                      {inv.paymentStatus}
                    </Badge>
                  </TableCell>
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
            } of ${filtered.length} invoices`}
          />
        </Card>

        <Card className="hidden self-start xl:block">
          {selected && <InvoiceDetailPanel invoice={selected} />}
        </Card>
      </div>

      <Sheet open={!isDesktop && !!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-md">
          <VisuallyHidden>
            <SheetTitle>Invoice Details</SheetTitle>
          </VisuallyHidden>
          {selected && <InvoiceDetailPanel invoice={selected} />}
        </SheetContent>
      </Sheet>

      <AddInvoiceDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
