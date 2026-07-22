import {
  Calendar,
  Car,
  ChevronRight,
  Edit,
  Mail,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Receipt,
  Star,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { avatarUrl, type Customer } from "@/lib/mock-data";

const ACTIVITY_ICON: Record<string, typeof Calendar> = {
  Appointment: Calendar,
  "Service Request": MessageSquare,
  Payment: Wallet,
};

export function CustomerDetailPanel({ customer }: { customer: Customer }) {
  return (
    <div className="flex flex-col gap-6 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Avatar className="h-14 w-14">
          <AvatarImage src={avatarUrl(customer.avatarSeed)} alt={customer.name} />
          <AvatarFallback>{customer.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-bold">{customer.name}</h3>
            <Badge
              variant="secondary"
              className={
                customer.status === "VIP"
                  ? "bg-violet-100 text-violet-700"
                  : customer.status === "Active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }
            >
              {customer.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        <ActionIcon icon={Phone} label="Call" />
        <ActionIcon icon={Mail} label="Email" />
        <ActionIcon icon={MessageSquare} label="Message" />
        <ActionIcon icon={Edit} label="Edit" />
        <ActionIcon icon={MoreHorizontal} label="More" />
      </div>

      <div>
        <h4 className="text-sm font-semibold">Contact Information</h4>
        <div className="mt-3 flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2.5">
            <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
            {customer.phone}
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{customer.email}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            {customer.address}
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold">Customer Summary</h4>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <SummaryTile icon={Receipt} label="Total Bookings" value={String(customer.totalBookings)} />
          <SummaryTile icon={Wallet} label="Total Spent" value={`₹${customer.totalSpent.toLocaleString("en-IN")}`} />
          <SummaryTile icon={Receipt} label="Avg. Spent / Visit" value={`₹${customer.avgSpent.toLocaleString("en-IN")}`} />
          <SummaryTile icon={Star} label="Avg. Rating" value={`${customer.avgRating} ★`} />
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Vehicles ({customer.vehicles})</h4>
          <button className="text-xs font-semibold text-primary hover:underline">View All</button>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {customer.vehicleList.map((v) => (
            <div key={v.plate} className="flex items-center gap-3 rounded-lg border p-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Car className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{v.model}</p>
                <p className="truncate text-xs text-muted-foreground">{v.plate}</p>
              </div>
              {v.primary && (
                <Badge variant="secondary" className="shrink-0 bg-blue-50 text-blue-700">
                  Primary
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Recent Activity</h4>
          <button className="text-xs font-semibold text-primary hover:underline">View All</button>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {customer.recentActivity.map((activity, i) => {
            const Icon = ACTIVITY_ICON[activity.type] ?? Calendar;
            return (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{activity.type}</p>
                  <p className="truncate text-xs text-muted-foreground">{activity.label}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{activity.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Button variant="outline" className="w-full gap-1">
        View Full Details
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ActionIcon({ icon: Icon, label }: { icon: typeof Phone; label: string }) {
  return (
    <button
      className="flex flex-col items-center gap-1.5 rounded-lg border py-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function SummaryTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border p-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-2 text-sm font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
