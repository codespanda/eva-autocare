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

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddVehicleDialog({ open, onOpenChange }: AddVehicleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
          <DialogDescription>Register a new vehicle to a customer profile.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <DialogFormField label="Owner Name">
              <Input placeholder="e.g. Rohit Sharma" required />
            </DialogFormField>
            <DialogFormGrid>
              <DialogFormField label="Vehicle Model">
                <Input placeholder="e.g. Honda City" required />
              </DialogFormField>
              <DialogFormField label="Model Year">
                <Input type="number" placeholder="2024" />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Vehicle Type">
                <DialogSelectField options={["Sedan", "Hatchback", "SUV", "MPV"]} />
              </DialogFormField>
              <DialogFormField label="Fuel Type">
                <DialogSelectField options={["Petrol", "Diesel", "Electric", "CNG"]} />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Plate Number">
                <Input placeholder="DL 01 AB 1234" required />
              </DialogFormField>
              <DialogFormField label="Color">
                <Input placeholder="e.g. White" />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormField label="VIN / Chassis Number">
              <Input placeholder="17-character VIN" />
            </DialogFormField>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Vehicle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
