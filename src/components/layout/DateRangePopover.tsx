import { useState } from "react";
import { Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const PRESETS = [
  "Today",
  "Yesterday",
  "This Week",
  "Last 7 Days",
  "This Month",
  "Last 30 Days",
];

export function DateRangePopover() {
  const [selected, setSelected] = useState("Today");
  const [open, setOpen] = useState(false);

  const label = selected === "Today" ? "24 May 2025" : selected;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="hidden shrink-0 items-center gap-2 sm:flex">
          <Calendar className="h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-2">
        <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Date Range
        </p>
        <div className="flex flex-col">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setSelected(preset);
                setOpen(false);
              }}
              className={cn(
                "flex items-center justify-between rounded-md px-2.5 py-2 text-left text-sm transition-colors hover:bg-accent",
                selected === preset && "bg-accent font-medium text-accent-foreground"
              )}
            >
              {preset}
              {selected === preset && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
