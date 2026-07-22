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
import { DialogFormField, DialogFormGrid, DialogSelectField } from "./DialogFormControls";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddUserDialog({ open, onOpenChange }: AddUserDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>Invite a new user to your team.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <DialogFormField label="Full Name">
              <Input placeholder="Enter full name" required />
            </DialogFormField>
            <DialogFormField label="Email Address">
              <Input type="email" placeholder="user@evaautocare.com" required />
            </DialogFormField>
            <DialogFormGrid>
              <DialogFormField label="Role">
                <DialogSelectField options={["Administrator", "Branch Manager", "Front Desk", "Technician"]} />
              </DialogFormField>
              <DialogFormField label="Branch">
                <DialogSelectField options={["All Branches", "Gurugram Service Center", "Noida Service Center", "Delhi Service Center"]} />
              </DialogFormField>
            </DialogFormGrid>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Send Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
