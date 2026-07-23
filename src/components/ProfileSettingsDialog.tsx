import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { avatarUrl } from "@/lib/mock-data";
import {
  DialogFormField,
  DialogFormGrid,
  DialogSelectField,
} from "@/components/forms/DialogFormControls";

interface ProfileSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileSettingsDialog({ open, onOpenChange }: ProfileSettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>Manage your personal account information.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={avatarUrl("aman-verma")} alt="Aman Verma" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <Button type="button" variant="outline" size="sm" className="gap-2">
                  <Camera className="h-3.5 w-3.5" />
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground">PNG or JPG, max 2MB.</p>
              </div>
            </div>

            <DialogFormGrid>
              <DialogFormField label="Full Name">
                <Input defaultValue="Aman Verma" required />
              </DialogFormField>
              <DialogFormField label="Role">
                <Input defaultValue="Administrator" disabled />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Email Address">
                <Input type="email" defaultValue="aman.verma@evaautocare.com" required />
              </DialogFormField>
              <DialogFormField label="Phone Number">
                <Input defaultValue="+91 xxxxxxxx10" />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormField label="Branch">
              <DialogSelectField
                options={["All Branches", "Gurugram Service Center", "Noida Service Center", "Delhi Service Center"]}
              />
            </DialogFormField>

            <Separator />

            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Change Password</p>
              <p className="text-xs text-muted-foreground">Leave blank to keep your current password.</p>
            </div>
            <DialogFormGrid>
              <DialogFormField label="New Password">
                <Input type="password" placeholder="••••••••" />
              </DialogFormField>
              <DialogFormField label="Confirm New Password">
                <Input type="password" placeholder="••••••••" />
              </DialogFormField>
            </DialogFormGrid>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
