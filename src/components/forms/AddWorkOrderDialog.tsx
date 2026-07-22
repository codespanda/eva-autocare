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

interface AddWorkOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddWorkOrderDialog({ open, onOpenChange }: AddWorkOrderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Work Order</DialogTitle>
          <DialogDescription>Open a new work order for a vehicle service.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <DialogFormGrid>
              <DialogFormField label="Customer Name">
                <Input placeholder="e.g. Rohit Sharma" required />
              </DialogFormField>
              <DialogFormField label="Vehicle">
                <Input placeholder="e.g. Honda City" required />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Service Type">
                <DialogSelectField
                  placeholder="Select service"
                  options={["General Service", "Brake Inspection", "Engine Check", "AC Service", "Wheel Alignment"]}
                />
              </DialogFormField>
              <DialogFormField label="Assigned Technician">
                <DialogSelectField
                  placeholder="Assign technician"
                  options={["Rahul Verma", "Sandeep Kumar", "Mohit Yadav", "Amit Singh"]}
                />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Priority">
                <DialogSelectField options={["Low", "Medium", "High"]} defaultValue="Medium" />
              </DialogFormField>
              <DialogFormField label="Estimated Amount (₹)">
                <Input type="number" placeholder="0" />
              </DialogFormField>
            </DialogFormGrid>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Create Work Order</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
