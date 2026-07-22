import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  CalendarCheck,
  ClipboardList,
  Users,
  Car,
  Wrench,
  Package,
  UserCog,
  Receipt,
  BarChart3,
  Star,
  Settings,
  Crown,
  ChevronDown,
  Moon,
  Sun,
  User,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpgradePlanDialog } from "@/components/UpgradePlanDialog";
import { AutoCareLogo } from "@/components/AutoCareLogo";
import { avatarUrl } from "@/lib/mock-data";
import { useTheme } from "@/lib/theme";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/", icon: LayoutGrid },
  { label: "Appointments", to: "/appointments", icon: CalendarCheck },
  { label: "Service Requests", to: "/service-requests", icon: ClipboardList },
  { label: "Customers", to: "/customers", icon: Users },
  { label: "Vehicles", to: "/vehicles", icon: Car },
  { label: "Work Orders", to: "/work-orders", icon: Wrench },
  { label: "Inventory", to: "/inventory", icon: Package },
  { label: "Technicians", to: "/technicians", icon: UserCog },
  { label: "Invoices & Billing", to: "/invoices", icon: Receipt },
  { label: "Reports", to: "/reports", icon: BarChart3 },
  { label: "Reviews & Ratings", to: "/reviews", icon: Star },
  { label: "Settings", to: "/settings", icon: Settings },
];

const AUTH_NAV_ITEMS = [
  { label: "Sign In", to: "/signin", icon: LogIn },
  { label: "Sign Up", to: "/signup", icon: UserPlus },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function SidebarContent({ onNavigate }: SidebarProps) {
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-5 sm:h-20">
        <AutoCareLogo className="h-10 w-10 shrink-0" />
        <div className="leading-tight">
          <p className="text-base font-bold">
            Eva <span className="text-primary">AutoCare</span>
          </p>
          <p className="text-[11px] text-sidebar-muted">Service Agency Portal</p>
        </div>
      </div>

      <nav className="scrollbar-sleek flex-1 overflow-y-auto px-3 py-2">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-muted hover:bg-white/5 hover:text-sidebar-foreground"
                  )
                }
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <p className="mt-4 px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-sidebar-muted">
          Account
        </p>
        <ul className="flex flex-col gap-1">
          {AUTH_NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-sidebar-muted hover:bg-white/5 hover:text-sidebar-foreground"
                  )
                }
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shrink-0 border-t border-sidebar-border p-4">
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-400">
            <Crown className="h-4 w-4" />
            Grow Your Business
          </div>
          <p className="mt-1.5 text-xs text-sidebar-muted">
            Unlock premium features, get more bookings and grow revenue.
          </p>
          <button
            onClick={() => setUpgradeOpen(true)}
            className="mt-3 w-full rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Upgrade Plan
          </button>
          <UpgradePlanDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="mt-4 flex w-full items-center gap-2.5 rounded-lg px-1 py-2 text-left transition-colors hover:bg-white/5">
              <Avatar className="h-9 w-9">
                <AvatarImage src={avatarUrl("aman-verma")} alt="Aman Verma" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">Aman Verma</span>
                <span className="block truncate text-xs text-sidebar-muted">Administrator</span>
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-sidebar-muted" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" className="w-56">
            <DropdownMenuItem className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DarkModeToggle />
      </div>
    </div>
  );
}

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="mt-2 flex items-center justify-between rounded-lg px-1 py-2">
      <span className="flex items-center gap-2 text-sm text-sidebar-muted">
        {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        Dark Mode
      </span>
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-sidebar-border lg:block">
      <SidebarContent />
    </aside>
  );
}
