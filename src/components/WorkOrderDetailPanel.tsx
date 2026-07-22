import type { ReactNode } from "react";
import { Car, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import type { WorkOrder } from "@/lib/mock-data";

export function WorkOrderDetailPanel({ order }: { order: WorkOrder }) {
  return (
    <div className="flex flex-col gap-6 p-5 sm:p-6">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold">{order.id}</h3>
          <StatusBadge status={order.status} />
        </div>
        <p className="text-xs text-muted-foreground">
          Created on {order.createdOn}, {order.createdTime}
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border p-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Car className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate font-medium">{order.vehicleLabel}</p>
          <p className="truncate text-xs text-muted-foreground">
            {order.vehiclePlate} • {order.vehicleYear}
          </p>
          <p className="truncate text-xs text-muted-foreground">VIN: {order.vin}</p>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold">Customer</h4>
        <div className="mt-3 flex flex-col gap-2.5 text-sm">
          <p className="font-medium">{order.customer.name}</p>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0" />
            {order.customer.phone}
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{order.customer.email}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold">Summary</h4>
        <div className="mt-3 flex flex-col gap-3 text-sm">
          <Row label="Service">
            <div className="text-right">
              <p className="font-medium">{order.service}</p>
              <Badge variant="secondary" className="mt-1 bg-accent text-accent-foreground">
                {order.serviceTag}
              </Badge>
            </div>
          </Row>
          <Row label="Assigned To">
            <div className="text-right">
              <p className="font-medium">{order.technician}</p>
              <p className="text-xs text-muted-foreground">{order.technicianRole}</p>
            </div>
          </Row>
          <Row label="Priority">
            <PriorityBadge priority={order.priority} />
          </Row>
          <Row label="Status">
            <StatusBadge status={order.status} />
          </Row>
          <Row label="Payment Status">
            <Badge
              variant="secondary"
              className={
                order.paymentStatus === "Paid"
                  ? "bg-emerald-50 text-emerald-700"
                  : order.paymentStatus === "Partial"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-red-50 text-red-700"
              }
            >
              {order.paymentStatus}
            </Badge>
          </Row>
          <Row label="Total Amount">
            <span className="font-bold">₹{order.total.toLocaleString("en-IN")}</span>
          </Row>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold">Work Order Timeline</h4>
        <div className="mt-4 flex flex-col gap-5">
          {order.timeline.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    step.done ? "bg-emerald-500" : "bg-muted-foreground/30"
                  )}
                />
                {i < order.timeline.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-border" />}
              </div>
              <div className="pb-1">
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Edit
        </Button>
        <Button className="flex-1">View Details</Button>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}
