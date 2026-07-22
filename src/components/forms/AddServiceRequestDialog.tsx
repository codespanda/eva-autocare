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
import { Textarea } from "@/components/ui/textarea";
import { DialogFormField, DialogFormGrid, DialogSelectField } from "./DialogFormControls";

interface AddServiceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddServiceRequestDialog({ open, onOpenChange }: AddServiceRequestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Service Request</DialogTitle>
          <DialogDescription>Log a new service request from a customer.</DialogDescription>
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
                  options={["General Service", "Brake Inspection", "Engine Check", "AC Service", "Wheel Alignment", "Clutch Repair"]}
                />
              </DialogFormField>
              <DialogFormField label="Priority">
                <DialogSelectField options={["Low", "Medium", "High"]} defaultValue="Medium" />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormField label="Assign To">
              <DialogSelectField
                placeholder="Select technician"
                options={["Rahul Verma", "Sandeep Kumar", "Mohit Yadav", "Amit Singh"]}
              />
            </DialogFormField>
            <DialogFormField label="Description">
              <Textarea placeholder="Describe the issue reported by the customer..." className="min-h-[80px]" />
            </DialogFormField>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Create Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
