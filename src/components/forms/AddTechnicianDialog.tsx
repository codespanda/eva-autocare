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

interface AddTechnicianDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTechnicianDialog({ open, onOpenChange }: AddTechnicianDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Technician</DialogTitle>
          <DialogDescription>Add a new technician to your team.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <DialogFormField label="Full Name">
              <Input placeholder="Enter technician name" required />
            </DialogFormField>
            <DialogFormGrid>
              <DialogFormField label="Phone Number">
                <Input placeholder="+91 98765 43210" required />
              </DialogFormField>
              <DialogFormField label="Email Address">
                <Input type="email" placeholder="technician@email.com" />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Role">
                <DialogSelectField options={["Senior Technician", "Technician", "Apprentice"]} />
              </DialogFormField>
              <DialogFormField label="Branch">
                <DialogSelectField options={["Gurugram Service Center", "Noida Service Center", "Delhi Service Center"]} />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormField label="Primary Skills">
              <Input placeholder="e.g. Engine Repair, AC Repair, Diagnostics" />
            </DialogFormField>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Technician</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
