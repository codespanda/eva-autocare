import { AlertTriangle, Box, Lock, Phone, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { InventoryItem } from "@/lib/mock-data";

const STATUS_STYLES: Record<InventoryItem["status"], string> = {
  "In Stock": "bg-emerald-50 text-emerald-700",
  "Low Stock": "bg-amber-50 text-amber-700",
  "Out of Stock": "bg-red-50 text-red-700",
};

export function InventoryDetailPanel({ item }: { item: InventoryItem }) {
  const stockLevel = Math.min(100, Math.round((item.onHand / (item.reorderLevel * 2)) * 100));

  return (
    <div className="flex flex-col gap-6 p-5 sm:p-6">
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border bg-muted text-6xl">
        {item.emoji}
        <Badge variant="secondary" className={`absolute right-3 top-3 ${STATUS_STYLES[item.status]}`}>
          {item.status}
        </Badge>
      </div>

      <div>
        <h3 className="text-base font-bold">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="font-semibold">{item.brand}</span>
          <span className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" />
            {item.rating}
          </span>
          <span className="text-muted-foreground">({item.reviews} reviews)</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <Row label="SKU" value={item.sku} />
        <Row label="Category" value={item.category} />
        <Row label="Unit Price" value={`₹${item.unitPrice.toLocaleString("en-IN")}`} />
        <Row label="Total Value" value={`₹${(item.unitPrice * item.stockQty).toLocaleString("en-IN")}`} />
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold">Stock Overview</h4>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <StatTile icon={Box} label="On Hand" value={String(item.onHand)} tone="text-blue-600 bg-blue-50" />
          <StatTile icon={Lock} label="Reserved" value={String(item.reserved)} tone="text-violet-600 bg-violet-50" />
          <StatTile icon={AlertTriangle} label="Reorder Level" value={String(item.reorderLevel)} tone="text-amber-600 bg-amber-50" />
        </div>
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-medium">Stock Level</span>
            <span className="text-muted-foreground">{stockLevel}%</span>
          </div>
          <Progress value={stockLevel} className="h-2" />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold">Supplier Information</h4>
        <div className="mt-3 flex flex-col gap-2.5 text-sm">
          <p className="font-medium">{item.supplier.name}</p>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0" />
            {item.supplier.contact}
          </div>
          <Row label="Last Purchase" value={item.supplier.lastPurchase} />
          <Row label="Next Order" value={item.supplier.nextOrder} />
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Recent Activity</h4>
          <button className="text-xs font-semibold text-primary hover:underline">View All</button>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {item.recentActivity.map((a, i) => (
            <div key={i} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium">{a.label}</p>
                <p className="text-xs text-muted-foreground">{a.date}</p>
              </div>
              <span
                className={`shrink-0 text-sm font-semibold ${
                  a.delta.startsWith("+") ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {a.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Edit Item
        </Button>
        <Button className="flex-1">View History</Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Box;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-lg border p-2.5 text-center">
      <span className={`mx-auto flex h-8 w-8 items-center justify-center rounded-lg ${tone}`}>
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-1.5 text-sm font-bold">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
