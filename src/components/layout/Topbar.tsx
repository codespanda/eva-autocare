import { Menu, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { SidebarContent } from "@/components/layout/Sidebar";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { NotificationsPopover } from "@/components/layout/NotificationsPopover";
import { DateRangePopover } from "@/components/layout/DateRangePopover";
import { BranchSelector } from "@/components/layout/BranchSelector";
import { TopbarUserMenu } from "@/components/layout/TopbarUserMenu";

const TITLES: Record<string, { title: string; crumb: string }> = {
  "/": { title: "Welcome Back, Aman!", crumb: "Dashboard" },
  "/appointments": { title: "Appointments", crumb: "Appointments" },
  "/service-requests": { title: "Service Requests", crumb: "Service Requests" },
  "/customers": { title: "Customers", crumb: "Customers" },
  "/vehicles": { title: "Vehicles", crumb: "Vehicles" },
  "/work-orders": { title: "Work Orders", crumb: "Work Orders" },
  "/inventory": { title: "Inventory", crumb: "Inventory" },
  "/technicians": { title: "Technicians", crumb: "Technicians" },
  "/invoices": { title: "Invoices & Billing", crumb: "Invoices & Billing" },
  "/reports": { title: "Reports", crumb: "Reports" },
  "/reviews": { title: "Reviews & Ratings", crumb: "Reviews & Ratings" },
  "/settings": { title: "Settings", crumb: "Settings" },
};

interface TopbarProps {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
}

export function Topbar({ mobileOpen, onMobileOpenChange }: TopbarProps) {
  const location = useLocation();
  const page = TITLES[location.pathname] ?? { title: "Eva AutoCare", crumb: "" };
  const isDashboard = location.pathname === "/";

  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
            aria-label="Open sidebar"
            onClick={() => onMobileOpenChange(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <SheetContent side="left" className="w-[280px] p-0">
            <VisuallyHidden>
              <SheetTitle>Navigation</SheetTitle>
            </VisuallyHidden>
            <SidebarContent onNavigate={() => onMobileOpenChange(false)} />
          </SheetContent>
        </Sheet>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold sm:text-2xl">{page.title}</h1>
          {isDashboard ? (
            <p className="hidden text-sm text-muted-foreground sm:block">
              Here's what's happening at your service center today.
            </p>
          ) : (
            <p className="hidden text-xs text-muted-foreground sm:block">
              Dashboard <span className="mx-1">›</span> {page.crumb}
            </p>
          )}
        </div>

        <div className="hidden items-center md:flex md:w-64 lg:w-80">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search appointments, customer, vehicle..." className="pl-9" />
          </div>
        </div>

        <NotificationsPopover />
        <DateRangePopover />
        <BranchSelector />
        <TopbarUserMenu />
      </div>
    </header>
  );
}
