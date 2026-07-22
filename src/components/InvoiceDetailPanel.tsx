import { ChevronDown, Download, Mail, Phone, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Invoice } from "@/lib/mock-data";

const STATUS_STYLES: Record<Invoice["status"], string> = {
  Paid: "bg-emerald-50 text-emerald-700",
  Sent: "bg-blue-50 text-blue-700",
  Overdue: "bg-red-50 text-red-700",
  Draft: "bg-slate-100 text-slate-600",
};

export function InvoiceDetailPanel({ invoice }: { invoice: Invoice }) {
  return (
    <div className="flex flex-col gap-6 p-5 sm:p-6">
      <div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={STATUS_STYLES[invoice.status]}>
            {invoice.status}
          </Badge>
          <h3 className="text-base font-bold">{invoice.id}</h3>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Invoice Date: {invoice.invoiceDate} • Due Date: {invoice.dueDate}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <p className="text-xs font-semibold text-muted-foreground">Customer</p>
          <p className="mt-1 text-sm font-medium">{invoice.customer.name}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Phone className="h-3 w-3" />
            {invoice.customer.phone}
          </p>
          <p className="truncate text-xs text-muted-foreground">{invoice.customer.email}</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-xs font-semibold text-muted-foreground">Vehicle</p>
          <p className="mt-1 text-sm font-medium">{invoice.vehicleLabel}</p>
          <p className="text-xs text-muted-foreground">{invoice.vehiclePlate}</p>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3 text-sm">
        <Row label="Sub Total" value={`₹${invoice.subTotal.toLocaleString("en-IN")}`} />
        <Row label="Discount" value={`- ₹${invoice.discount.toLocaleString("en-IN")}`} />
        <Row label="Tax (18% GST)" value={`₹${invoice.tax.toLocaleString("en-IN")}`} />
        <Separator />
        <Row label="Total Amount" value={`₹${invoice.totalAmount.toLocaleString("en-IN")}`} bold />
        <Row label="Paid Amount" value={`₹${invoice.paidAmount.toLocaleString("en-IN")}`} />
        <Row
          label="Balance Due"
          value={`₹${invoice.balanceDue.toLocaleString("en-IN")}`}
          bold
          valueClassName={invoice.balanceDue > 0 ? "text-red-600" : "text-emerald-600"}
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 gap-2">
          <Download className="h-4 w-4" />
          Download Invoice
        </Button>
        <Button variant="outline" size="icon" aria-label="More download options">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <Button className="w-full gap-2">
        <Send className="h-4 w-4" />
        Send Invoice
      </Button>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold">Payment History</h4>
        <div className="mt-3 flex flex-col gap-3">
          {invoice.paymentHistory.length === 0 && (
            <p className="text-sm text-muted-foreground">No payments recorded yet.</p>
          )}
          {invoice.paymentHistory.map((p, i) => (
            <div key={i} className="flex items-start justify-between gap-3 rounded-lg border p-3">
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">₹{p.amount.toLocaleString("en-IN")}</p>
                <Badge variant="secondary" className="mt-0.5 bg-blue-50 text-blue-700">
                  {p.method}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full">
        View Full Details
      </Button>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  valueClassName,
}: {
  label: string;
  value: string;
  bold?: boolean;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span className={`${bold ? "font-bold" : "font-medium"} ${valueClassName ?? ""}`}>{value}</span>
    </div>
  );
}
