import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, SelectField, SectionCard, ToggleRow } from "./FormControls";

const TAX_RATES = [
  { name: "GST - Standard", rate: "18%", appliesTo: "Services & Parts" },
  { name: "GST - Reduced", rate: "5%", appliesTo: "Specific Parts" },
  { name: "GST - Exempt", rate: "0%", appliesTo: "Warranty Repairs" },
];

export function TaxInvoiceSettingsTab() {
  return (
    <>
      <SectionCard title="Tax Configuration">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Tax Identification Number">
            <Input defaultValue="xxxxxxxxxxxxx" />
          </FormField>
          <FormField label="Default Tax Rate">
            <SelectField options={["18% GST", "5% GST", "No Tax"]} />
          </FormField>
          <FormField label="Tax Calculation">
            <SelectField options={["Exclusive of Price", "Inclusive of Price"]} />
          </FormField>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                <th className="pb-2 font-medium">Tax Name</th>
                <th className="pb-2 font-medium">Rate</th>
                <th className="pb-2 font-medium">Applies To</th>
                <th className="pb-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {TAX_RATES.map((t) => (
                <tr key={t.name} className="border-b last:border-0">
                  <td className="py-2.5 font-medium">{t.name}</td>
                  <td className="py-2.5">{t.rate}</td>
                  <td className="py-2.5 text-muted-foreground">{t.appliesTo}</td>
                  <td className="py-2.5 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Delete tax rate">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button variant="outline" size="sm" className="w-fit gap-2">
          <Plus className="h-4 w-4" />
          Add Tax Rate
        </Button>
      </SectionCard>

      <SectionCard title="Invoice Preferences">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Invoice Template">
            <SelectField options={["Standard", "Detailed", "Minimal"]} />
          </FormField>
          <FormField label="Due Date (days from invoice)">
            <Input defaultValue="7" type="number" />
          </FormField>
          <FormField label="Invoice Footer Note">
            <Input defaultValue="Thank you for choosing Eva AutoCare!" />
          </FormField>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ToggleRow label="Show Tax Breakdown" description="Display itemized tax on invoices" defaultChecked />
          <ToggleRow label="Show Business Logo" description="Include logo on generated invoices" defaultChecked />
          <ToggleRow label="Auto-send on Completion" description="Email invoice when work order completes" />
        </div>
        <FormField label="Terms & Conditions">
          <Textarea
            defaultValue="Payment is due within 7 days of invoice date. Late payments may incur a 2% monthly fee. All repairs are covered by a 12-month warranty on parts and labor."
            className="min-h-[90px]"
          />
        </FormField>
      </SectionCard>
    </>
  );
}
