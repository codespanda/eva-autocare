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

interface AddAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddAppointmentDialog({ open, onOpenChange }: AddAppointmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogDescription>Schedule a service appointment for a customer.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <DialogFormGrid>
              <DialogFormField label="Customer Name">
                <Input placeholder="e.g. Rohit Sharma" required />
              </DialogFormField>
              <DialogFormField label="Phone Number">
                <Input placeholder="+91 98765 43210" required />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Vehicle">
                <Input placeholder="e.g. Honda City" required />
              </DialogFormField>
              <DialogFormField label="Plate Number">
                <Input placeholder="DL 01 AB 1234" required />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Service Type">
                <DialogSelectField
                  placeholder="Select service"
                  options={["General Service", "Brake Inspection", "Engine Check", "AC Service", "Wheel Alignment", "Battery Check"]}
                />
              </DialogFormField>
              <DialogFormField label="Technician">
                <DialogSelectField
                  placeholder="Assign technician"
                  options={["Rahul Verma", "Sandeep Kumar", "Mohit Yadav", "Amit Singh"]}
                />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Date">
                <Input type="date" required />
              </DialogFormField>
              <DialogFormField label="Time">
                <Input type="time" required />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormField label="Estimated Amount (₹)">
              <Input type="number" placeholder="0" />
            </DialogFormField>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Book Appointment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
