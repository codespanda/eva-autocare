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

interface AddInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddInvoiceDialog({ open, onOpenChange }: AddInvoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Invoice</DialogTitle>
          <DialogDescription>Generate a new invoice for a customer.</DialogDescription>
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
              <DialogFormField label="Invoice Date">
                <Input type="date" required />
              </DialogFormField>
              <DialogFormField label="Due Date">
                <Input type="date" required />
              </DialogFormField>
            </DialogFormGrid>
            <DialogFormGrid>
              <DialogFormField label="Amount (₹)">
                <Input type="number" placeholder="0" required />
              </DialogFormField>
              <DialogFormField label="Payment Status">
                <DialogSelectField options={["Unpaid", "Partial", "Paid"]} defaultValue="Unpaid" />
              </DialogFormField>
            </DialogFormGrid>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Create Invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
