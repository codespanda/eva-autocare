import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BRANCHES = ["All Branches", "Gurugram Service Center", "Noida Service Center", "Delhi Service Center"];

export function BranchSelector() {
  const [selected, setSelected] = useState("All Branches");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hidden shrink-0 items-center gap-1.5 lg:flex">
          <span className="max-w-[140px] truncate">{selected}</span>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {BRANCHES.map((branch, i) => (
          <div key={branch}>
            <DropdownMenuItem className="flex items-center justify-between gap-2" onSelect={() => setSelected(branch)}>
              {branch}
              {selected === branch && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
            {i === 0 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
