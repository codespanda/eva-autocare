import { useState } from "react";
import {
  Bell,
  Building2,
  CloudUpload,
  CreditCard,
  FileText,
  MapPin,
  Puzzle,
  Save,
  Settings as SettingsIcon,
  Shield,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GeneralSettingsTab } from "@/components/settings/GeneralSettingsTab";
import { BusinessProfileTab } from "@/components/settings/BusinessProfileTab";
import { BranchesTab } from "@/components/settings/BranchesTab";
import { UsersRolesTab } from "@/components/settings/UsersRolesTab";
import { NotificationSettingsTab } from "@/components/settings/NotificationSettingsTab";
import { PaymentSettingsTab } from "@/components/settings/PaymentSettingsTab";
import { TaxInvoiceSettingsTab } from "@/components/settings/TaxInvoiceSettingsTab";
import { IntegrationsTab } from "@/components/settings/IntegrationsTab";
import { SecuritySettingsTab } from "@/components/settings/SecuritySettingsTab";
import { SystemPreferencesTab } from "@/components/settings/SystemPreferencesTab";
import { BackupRestoreTab } from "@/components/settings/BackupRestoreTab";

const NAV_ITEMS = [
  { icon: SettingsIcon, label: "General Settings", description: "Basic system settings and preferences", Component: GeneralSettingsTab },
  { icon: Building2, label: "Business Profile", description: "Manage your business information", Component: BusinessProfileTab },
  { icon: MapPin, label: "Branches", description: "Manage branches and locations", Component: BranchesTab },
  { icon: Users, label: "Users & Roles", description: "Manage users, roles and permissions", Component: UsersRolesTab },
  { icon: Bell, label: "Notification Settings", description: "Configure email, SMS and in-app notifications", Component: NotificationSettingsTab },
  { icon: CreditCard, label: "Payment Settings", description: "Manage payment methods and preferences", Component: PaymentSettingsTab },
  { icon: FileText, label: "Tax & Invoice Settings", description: "Configure taxes and invoice preferences", Component: TaxInvoiceSettingsTab },
  { icon: Puzzle, label: "Integrations", description: "Third party integrations and APIs", Component: IntegrationsTab },
  { icon: Shield, label: "Security Settings", description: "Password, 2FA and security options", Component: SecuritySettingsTab },
  { icon: SlidersHorizontal, label: "System Preferences", description: "Date format, language and other preferences", Component: SystemPreferencesTab },
  { icon: CloudUpload, label: "Backup & Restore", description: "Backup data and restore settings", Component: BackupRestoreTab },
];

export function Settings() {
  const [activeNav, setActiveNav] = useState(0);
  const Active = NAV_ITEMS[activeNav];

  return (
    <div className="flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start">
      <Card className="w-full shrink-0 lg:w-72">
        <CardContent className="flex flex-col gap-1 p-3">
          <p className="px-2 py-2 text-sm font-bold">Settings</p>
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(i)}
              className={cn(
                "flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                i === activeNav ? "bg-primary/10 text-primary" : "hover:bg-accent"
              )}
            >
              <item.icon className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="block text-xs text-muted-foreground">{item.description}</span>
              </span>
            </button>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-1 flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">{Active.label}</h2>
            <p className="text-sm text-muted-foreground">
              {activeNav === 0 ? "Manage your system preferences and configurations" : Active.description}
            </p>
          </div>
          <Button className="gap-2 self-start sm:self-auto">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Active.Component />
      </div>
    </div>
  );
}
