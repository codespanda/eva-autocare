import { Calendar, CreditCard, FileSpreadsheet, Mail, MessageCircle, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const INTEGRATIONS = [
  {
    icon: MessageCircle,
    name: "WhatsApp Business",
    description: "Send appointment and service updates via WhatsApp",
    status: "Connected" as const,
    tone: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Calendar,
    name: "Google Calendar",
    description: "Sync appointments with technician calendars",
    status: "Connected" as const,
    tone: "text-blue-600 bg-blue-50",
  },
  {
    icon: CreditCard,
    name: "Razorpay",
    description: "Accept online payments and generate payment links",
    status: "Connected" as const,
    tone: "text-violet-600 bg-violet-50",
  },
  {
    icon: MessageSquare,
    name: "SMS Gateway",
    description: "Send SMS notifications to customers",
    status: "Not Connected" as const,
    tone: "text-amber-600 bg-amber-50",
  },
  {
    icon: Mail,
    name: "Email (SMTP)",
    description: "Send transactional emails from your domain",
    status: "Connected" as const,
    tone: "text-rose-600 bg-rose-50",
  },
  {
    icon: FileSpreadsheet,
    name: "Tally / Accounting",
    description: "Export invoices and financial data to Tally",
    status: "Not Connected" as const,
    tone: "text-orange-600 bg-orange-50",
  },
];

export function IntegrationsTab() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {INTEGRATIONS.map((i) => (
        <Card key={i.name}>
          <CardContent className="flex flex-col gap-4 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${i.tone}`}>
                <i.icon className="h-5 w-5" />
              </span>
              <Badge
                variant="secondary"
                className={
                  i.status === "Connected" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                }
              >
                {i.status}
              </Badge>
            </div>
            <div>
              <p className="font-semibold">{i.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{i.description}</p>
            </div>
            <Button variant={i.status === "Connected" ? "outline" : "default"} size="sm" className="w-fit">
              {i.status === "Connected" ? "Manage" : "Connect"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
