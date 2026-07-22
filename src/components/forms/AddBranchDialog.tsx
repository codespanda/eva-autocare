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
import { DialogFormField, DialogFormGrid } from "./DialogFormControls";

interface AddBranchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBranchDialog({ open, onOpenChange }: AddBranchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Branch</DialogTitle>
          <DialogDescription>Add a new service branch or location.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <DialogFormField label="Branch Name">
              <Input placeholder="e.g. Pune Service Center" required />
            </DialogFormField>
            <DialogFormField label="Address">
              <Input placeholder="Street, city, state, pincode" required />
            </DialogFormField>
            <DialogFormGrid>
              <DialogFormField label="Phone Number">
                <Input placeholder="+91 98765 43210" required />
              </DialogFormField>
              <DialogFormField label="Branch Manager">
                <Input placeholder="Manager name" />
              </DialogFormField>
            </DialogFormGrid>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Branch</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
