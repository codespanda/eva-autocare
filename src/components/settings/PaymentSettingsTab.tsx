import { Banknote, CreditCard, Landmark, QrCode, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FormField, SectionCard } from "./FormControls";

const METHODS = [
  { icon: Banknote, label: "Cash", description: "Accept in-person cash payments", checked: true },
  { icon: CreditCard, label: "Credit / Debit Card", description: "Accept card payments via POS", checked: true },
  { icon: QrCode, label: "UPI", description: "Accept UPI payments (GPay, PhonePe, Paytm)", checked: true },
  { icon: Landmark, label: "Net Banking", description: "Accept direct bank transfers", checked: false },
  { icon: Wallet, label: "Wallets", description: "Accept digital wallet payments", checked: false },
];

export function PaymentSettingsTab() {
  return (
    <>
      <SectionCard title="Accepted Payment Methods">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {METHODS.map((m) => (
            <div key={m.label} className="flex items-start justify-between gap-3 rounded-lg border p-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <m.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium">{m.label}</p>
                  <p className="text-xs text-muted-foreground">{m.description}</p>
                </div>
              </div>
              <Switch defaultChecked={m.checked} className="mt-0.5 shrink-0" />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Payment Gateway">
        <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CreditCard className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium">Razorpay</p>
              <p className="text-xs text-muted-foreground">Connected for online payment collection</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
            Connected
          </Badge>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="API Key">
            <Input defaultValue="rzp_live_••••••••••••3f2A" type="password" />
          </FormField>
          <FormField label="Webhook Secret">
            <Input defaultValue="whsec_••••••••••••9d1B" type="password" />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Payment Terms">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Default Payment Due (days)">
            <Input defaultValue="7" type="number" />
          </FormField>
          <FormField label="Late Payment Fee (%)">
            <Input defaultValue="2" type="number" />
          </FormField>
          <FormField label="Minimum Advance for Bookings (%)">
            <Input defaultValue="20" type="number" />
          </FormField>
        </div>
      </SectionCard>
    </>
  );
}
