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

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCustomerDialog({ open, onOpenChange }: AddCustomerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogDescription>Add a new customer to your database.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <DialogFormField label="Full Name">
              <Input placeholder="Enter customer name" required />
            </DialogFormField>
            <DialogFormGrid>
              <DialogFormField label="Phone Number">
                <Input placeholder="+91 98765 43210" required />
              </DialogFormField>
              <DialogFormField label="Email Address">
                <Input type="email" placeholder="customer@email.com" />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormField label="Address">
              <Input placeholder="Street, city, state" />
            </DialogFormField>
            <DialogFormGrid>
              <DialogFormField label="Customer Group">
                <DialogSelectField options={["Active", "VIP", "Inactive"]} defaultValue="Active" />
              </DialogFormField>
              <DialogFormField label="Source">
                <DialogSelectField options={["Walk-in", "Referral", "Online", "Phone"]} defaultValue="Walk-in" />
              </DialogFormField>
            </DialogFormGrid>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Customer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
