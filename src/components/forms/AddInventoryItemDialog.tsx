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

interface AddInventoryItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddInventoryItemDialog({ open, onOpenChange }: AddInventoryItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>Add a new part or item to your inventory.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <DialogFormGrid>
              <DialogFormField label="Item Name">
                <Input placeholder="e.g. Engine Oil 5W-30" required />
              </DialogFormField>
              <DialogFormField label="SKU">
                <Input placeholder="e.g. AC-EO-1001" required />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Category">
                <DialogSelectField
                  options={["Engine & Lubricants", "Filters", "Brake System", "Ignition", "Battery", "Fluids", "Wiper & Washer"]}
                />
              </DialogFormField>
              <DialogFormField label="Brand">
                <Input placeholder="e.g. Castrol" />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Stock Quantity">
                <Input type="number" placeholder="0" required />
              </DialogFormField>
              <DialogFormField label="Unit Price (₹)">
                <Input type="number" placeholder="0" required />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormField label="Reorder Level">
              <Input type="number" placeholder="e.g. 10" />
            </DialogFormField>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
