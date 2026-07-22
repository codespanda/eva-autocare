import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SectionCard } from "./FormControls";

const CHANNELS = [
  { key: "email", label: "Email", icon: Mail },
  { key: "sms", label: "SMS", icon: MessageSquare },
  { key: "whatsapp", label: "WhatsApp", icon: Smartphone },
  { key: "inApp", label: "In-App", icon: Bell },
] as const;

const EVENTS: { label: string; description: string; defaults: Record<(typeof CHANNELS)[number]["key"], boolean> }[] = [
  {
    label: "New Appointment Booked",
    description: "When a customer books a new appointment",
    defaults: { email: true, sms: true, whatsapp: true, inApp: true },
  },
  {
    label: "Appointment Reminder",
    description: "Sent 24 hours before a scheduled appointment",
    defaults: { email: true, sms: true, whatsapp: true, inApp: false },
  },
  {
    label: "Service Status Update",
    description: "When a work order status changes",
    defaults: { email: false, sms: true, whatsapp: true, inApp: true },
  },
  {
    label: "Invoice Generated",
    description: "When a new invoice is created for a customer",
    defaults: { email: true, sms: false, whatsapp: true, inApp: true },
  },
  {
    label: "Payment Received",
    description: "When a customer payment is recorded",
    defaults: { email: true, sms: false, whatsapp: false, inApp: true },
  },
  {
    label: "Low Stock Alert",
    description: "When inventory items fall below reorder level",
    defaults: { email: true, sms: false, whatsapp: false, inApp: true },
  },
];

export function NotificationSettingsTab() {
  return (
    <SectionCard title="Notification Preferences">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b text-left text-xs uppercase text-muted-foreground">
              <th className="w-2/5 pb-3 font-medium">Event</th>
              {CHANNELS.map((c) => (
                <th key={c.key} className="pb-3 text-center font-medium">
                  <span className="flex flex-col items-center gap-1">
                    <c.icon className="h-4 w-4" />
                    {c.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EVENTS.map((event) => (
              <tr key={event.label} className="border-b last:border-0">
                <td className="py-3.5 pr-3">
                  <p className="font-medium">{event.label}</p>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                </td>
                {CHANNELS.map((c) => (
                  <td key={c.key} className="py-3.5 text-center">
                    <Switch defaultChecked={event.defaults[c.key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
