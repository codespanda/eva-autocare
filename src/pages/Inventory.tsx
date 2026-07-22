import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Boxes,
  CheckCircle2,
  Download,
  Filter,
  IndianRupee,
  MoreVertical,
  Plus,
  Search,
  XCircle,
} from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Pagination } from "@/components/Pagination";
import { InventoryDetailPanel } from "@/components/InventoryDetailPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { inventoryItems, type InventoryItem } from "@/lib/mock-data";
import { useMediaQuery } from "@/lib/use-media-query";
import { AddInventoryItemDialog } from "@/components/forms/AddInventoryItemDialog";

const STATUS_STYLES: Record<InventoryItem["status"], string> = {
  "In Stock": "bg-emerald-50 text-emerald-700",
  "Low Stock": "bg-amber-50 text-amber-700",
  "Out of Stock": "bg-red-50 text-red-700",
};

const totalValue = inventoryItems.reduce((sum, i) => sum + i.unitPrice * i.stockQty, 0);

const STATS = [
  { icon: Boxes, label: "Total Items", value: inventoryItems.length, trend: { value: "12% vs Last Month", direction: "up" as const } },
  { icon: CheckCircle2, label: "In Stock", value: inventoryItems.filter((i) => i.status === "In Stock").length, trend: { value: "8% vs Last Month", direction: "up" as const } },
  { icon: AlertTriangle, label: "Low Stock", value: inventoryItems.filter((i) => i.status === "Low Stock").length, trend: { value: "5% vs Last Month", direction: "up" as const } },
  { icon: XCircle, label: "Out of Stock", value: inventoryItems.filter((i) => i.status === "Out of Stock").length, trend: { value: "3% vs Last Month", direction: "up" as const } },
  { icon: IndianRupee, label: "Total Value", value: `₹${totalValue.toLocaleString("en-IN")}`, trend: { value: "16% vs Last Month", direction: "up" as const } },
];

const TABS = [
  { label: "All Items", value: "All" },
  { label: "Low Stock", value: "Low Stock" },
  { label: "Out of Stock", value: "Out of Stock" },
  { label: "Categories", value: "Categories" },
  { label: "Suppliers", value: "Suppliers" },
];

const PAGE_SIZE = 5;

export function Inventory() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<InventoryItem | null>(inventoryItems[0]);
  const [addOpen, setAddOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const filtered = useMemo(() => {
    return inventoryItems.filter((i) => {
      const matchesTab =
        tab === "All" || tab === "Categories" || tab === "Suppliers" || i.status === tab;
      const matchesSearch =
        search.trim() === "" ||
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.sku.toLowerCase().includes(search.toLowerCase()) ||
        i.category.toLowerCase().includes(search.toLowerCase());
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

      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex flex-col gap-4 p-4 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <Tabs
                value={tab}
                onValueChange={(v) => {
                  setTab(v);
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
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button className="gap-2" onClick={() => setAddOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search items by name, SKU, category..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <Button variant="outline" className="justify-start gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item / Part</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Qty</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.map((item) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(item)}
                  data-state={selected?.id === item.id ? "selected" : undefined}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-lg">
                        {item.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{item.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{item.subtitle}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.sku}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-accent text-accent-foreground">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className={item.stockQty === 0 ? "font-semibold text-red-600" : "font-medium"}>
                    {item.stockQty}
                  </TableCell>
                  <TableCell>₹{item.unitPrice.toLocaleString("en-IN")}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={STATUS_STYLES[item.status]}>
                      {item.status}
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
            } of ${filtered.length} items`}
          />
        </Card>

        <Card className="hidden self-start xl:block">
          {selected && <InventoryDetailPanel item={selected} />}
        </Card>
      </div>

      <Sheet
        open={!isDesktop && !!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-md">
          <VisuallyHidden>
            <SheetTitle>Item Details</SheetTitle>
          </VisuallyHidden>
          {selected && <InventoryDetailPanel item={selected} />}
        </SheetContent>
      </Sheet>

      <AddInventoryItemDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
