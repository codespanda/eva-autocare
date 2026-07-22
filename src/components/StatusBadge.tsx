import { cn } from "@/lib/utils";
import type { Priority, Status } from "@/lib/mock-data";

const STATUS_STYLES: Record<Status, string> = {
  Confirmed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "In Progress": "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Cancelled: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  "On Hold": "bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-400",
};

const STATUS_DOT: Record<Status, string> = {
  Confirmed: "bg-emerald-500",
  Pending: "bg-amber-500",
  "In Progress": "bg-blue-500",
  Completed: "bg-emerald-500",
  Cancelled: "bg-red-500",
  "On Hold": "bg-slate-400",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        STATUS_STYLES[status]
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[status])} />
      {status}
    </span>
  );
}

const PRIORITY_STYLES: Record<Priority, string> = {
  Low: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Medium: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  High: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold",
        PRIORITY_STYLES[priority]
      )}
    >
      {priority}
    </span>
  );
}
