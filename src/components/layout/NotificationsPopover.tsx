import { useState } from "react";
import {
  Bell,
  Calendar,
  CheckCheck,
  IndianRupee,
  PackageX,
  Star,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  icon: typeof Bell;
  iconClassName: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    icon: Calendar,
    iconClassName: "bg-blue-50 text-blue-600",
    title: "New appointment booked",
    description: "Rohit Sharma booked a General Service for 10:00 AM today.",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    icon: Wrench,
    iconClassName: "bg-violet-50 text-violet-600",
    title: "Work order completed",
    description: "#WO-2451 Battery Check marked as completed by Sandeep Kumar.",
    time: "42 min ago",
    read: false,
  },
  {
    id: "3",
    icon: PackageX,
    iconClassName: "bg-red-50 text-red-600",
    title: "Item out of stock",
    description: "Spark Plug (AC-SP-5507) has run out of stock.",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    icon: Star,
    iconClassName: "bg-amber-50 text-amber-600",
    title: "New 5-star review",
    description: "Rohit Kumar left a 5-star review for General Service.",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "5",
    icon: IndianRupee,
    iconClassName: "bg-emerald-50 text-emerald-600",
    title: "Payment received",
    description: "₹5,640 received for invoice INV-2025-0253.",
    time: "Yesterday",
    read: true,
  },
];

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative shrink-0" aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[340px] sm:w-[380px]">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
          <button
            onClick={markAllRead}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all as read
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={cn(
                "flex items-start gap-3 border-b px-4 py-3 last:border-0",
                !n.read && "bg-accent/40"
              )}
            >
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", n.iconClassName)}>
                <n.icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{n.description}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{n.time}</p>
              </div>
              {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
        <div className="border-t p-2">
          <Button variant="ghost" className="w-full text-sm font-medium">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
