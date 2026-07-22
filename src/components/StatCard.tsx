import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  iconClassName?: string;
  label: string;
  value: string | number;
  trend?: { value: string; direction: "up" | "down" };
}

export function StatCard({ icon: Icon, iconClassName, label, value, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 p-4 sm:p-5">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary",
            iconClassName
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-muted-foreground sm:text-sm">{label}</p>
          <p className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">{value}</p>
          {trend && (
            <p
              className={cn(
                "mt-1 flex items-center gap-1 text-xs font-medium",
                trend.direction === "up" ? "text-emerald-600" : "text-red-600"
              )}
            >
              {trend.direction === "up" ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {trend.value}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
