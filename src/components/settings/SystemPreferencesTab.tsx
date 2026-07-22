import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField, SelectField, SectionCard, ToggleRow } from "./FormControls";

export function SystemPreferencesTab() {
  return (
    <>
      <SectionCard title="Localization">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Language">
            <SelectField options={["English", "Hindi", "Punjabi"]} />
          </FormField>
          <FormField label="Region">
            <SelectField options={["India", "United States", "United Kingdom"]} />
          </FormField>
          <FormField label="Number Format">
            <SelectField options={["1,23,456.00 (Indian)", "123,456.00 (International)"]} />
          </FormField>
          <FormField label="Date Format">
            <SelectField options={["DD MMM YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
          </FormField>
          <FormField label="Time Format">
            <SelectField options={["12 Hours (AM/PM)", "24 Hours"]} />
          </FormField>
          <FormField label="First Day of Week">
            <SelectField options={["Monday", "Sunday"]} />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Display & Behavior">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ToggleRow label="Compact Table Rows" description="Show more rows per screen in data tables" />
          <ToggleRow label="Show Onboarding Tips" description="Display helper tooltips across the app" defaultChecked />
          <ToggleRow label="Auto-refresh Dashboard" description="Refresh dashboard data every 5 minutes" defaultChecked />
        </div>
      </SectionCard>

      <SectionCard title="Data & Export">
        <p className="text-sm text-muted-foreground">
          Export a copy of your business data at any time in CSV format.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Customers
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Work Orders
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Invoices
          </Button>
        </div>
      </SectionCard>
    </>
  );
}
