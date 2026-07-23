import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileSettingsDialog } from "@/components/ProfileSettingsDialog";
import { avatarUrl } from "@/lib/mock-data";

export function TopbarUserMenu() {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="hidden shrink-0 items-center gap-2 rounded-full border p-1 pr-2 transition-colors hover:bg-accent lg:flex"
            aria-label="Account menu"
          >
            <Avatar className="h-7 w-7">
              <AvatarImage src={avatarUrl("aman-verma")} alt="Aman Verma" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Aman Verma</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <p className="font-semibold">Aman Verma</p>
            <p className="text-xs font-normal text-muted-foreground">Administrator</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2" onSelect={() => setProfileOpen(true)}>
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

      <ProfileSettingsDialog open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}
