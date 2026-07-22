import {
  Calendar,
  ChevronRight,
  Droplet,
  Edit,
  FileText,
  Gauge,
  Hash,
  Mail,
  MoreHorizontal,
  Palette,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Vehicle } from "@/lib/mock-data";

const STATUS_STYLES: Record<Vehicle["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700",
  "In Service": "bg-blue-50 text-blue-700",
  "Under Maintenance": "bg-amber-50 text-amber-700",
  Inactive: "bg-slate-100 text-slate-600",
};

const CAR_IMAGES: Record<string, string> = {
  Sedan:
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop",
  Hatchback:
    "https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=800&auto=format&fit=crop",
  SUV: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=800&auto=format&fit=crop",
  MPV: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop",
};

export function VehicleDetailPanel({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="flex flex-col gap-6 p-5 sm:p-6">
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold">{vehicle.model}</h3>
          <Badge variant="secondary" className={STATUS_STYLES[vehicle.status]}>
            {vehicle.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{vehicle.plate}</p>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-xl border bg-muted">
        <img
          src={CAR_IMAGES[vehicle.type] ?? CAR_IMAGES.Sedan}
          alt={vehicle.model}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        <ActionIcon icon={Calendar} label="Service History" />
        <ActionIcon icon={Calendar} label="New Appointment" />
        <ActionIcon icon={Edit} label="Edit Vehicle" />
        <ActionIcon icon={MoreHorizontal} label="More" />
      </div>

      <Separator />

      <div className="flex flex-col gap-3 text-sm">
        <DetailRow icon={User} label="Owner" value={vehicle.owner.name} />
        <DetailRow icon={Phone} label="Phone" value={vehicle.owner.phone} />
        <DetailRow icon={Mail} label="Email" value={vehicle.owner.email} />
        <DetailRow icon={Gauge} label="Vehicle Type" value={vehicle.type} />
        <DetailRow icon={Droplet} label="Fuel Type" value={vehicle.fuel} />
        <DetailRow icon={Calendar} label="Model Year" value={String(vehicle.year)} />
        <DetailRow icon={Palette} label="Color" value={vehicle.color} />
        <DetailRow icon={Hash} label="VIN" value={vehicle.vin} />
        <DetailRow icon={Shield} label="Insurance" value={vehicle.insurance} />
        <DetailRow icon={Calendar} label="Registration Date" value={vehicle.registrationDate} />
        <DetailRow icon={FileText} label="Odometer Reading" value={vehicle.odometer} />
      </div>

      <Button variant="outline" className="w-full gap-1">
        View Full Details
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

function ActionIcon({ icon: Icon, label }: { icon: typeof User; label: string }) {
  return (
    <button
      className="flex flex-col items-center gap-1.5 rounded-lg border py-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b pb-3 last:border-0 last:pb-0">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 shrink-0" />
        {label}
      </span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
