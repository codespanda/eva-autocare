import { Input } from "@/components/ui/input";
import { FormField, SelectField, SectionCard, ToggleRow } from "./FormControls";

export function GeneralSettingsTab() {
  return (
    <>
      <SectionCard title="Business Preferences">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Business Name">
            <Input defaultValue="Eva AutoCare Service Center" />
          </FormField>
          <FormField label="Business Email">
            <Input defaultValue="info@evaautocare.com" type="email" />
          </FormField>
          <FormField label="Business Phone">
            <Input defaultValue="+91 xxxxxxxx10" />
          </FormField>
          <FormField label="Currency">
            <SelectField options={["INR (₹) - Indian Rupee", "USD ($) - US Dollar"]} />
          </FormField>
          <FormField label="Time Zone">
            <SelectField options={["(GMT+05:30) Asia/Kolkata", "(GMT+00:00) UTC"]} />
          </FormField>
          <FormField label="Date Format">
            <SelectField options={["DD MMM YYYY (24 May 2025)", "MM/DD/YYYY"]} />
          </FormField>
        </div>
        <div className="grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-3">
          <ToggleRow label="Enable Multi Branch" description="Manage operations for multiple branches" defaultChecked />
          <ToggleRow label="Allow Service Reminder" description="Send reminders for upcoming services" defaultChecked />
          <ToggleRow label="Enable Estimate Approval" description="Require approval for estimates" defaultChecked />
        </div>
      </SectionCard>

      <SectionCard title="System Preferences">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FormField label="Language">
            <SelectField options={["English", "Hindi"]} />
          </FormField>
          <FormField label="Time Format">
            <SelectField options={["12 Hours (AM/PM)", "24 Hours"]} />
          </FormField>
          <FormField label="Items Per Page">
            <SelectField options={["10", "25", "50"]} />
          </FormField>
          <FormField label="Theme">
            <SelectField options={["Light", "Dark", "System"]} />
          </FormField>
          <FormField label="Default Dashboard">
            <SelectField options={["Overview", "Appointments"]} />
          </FormField>
          <FormField label="Default Branch">
            <SelectField options={["All Branches", "Gurugram Service Center", "Noida Service Center"]} />
          </FormField>
          <FormField label="Auto Logout">
            <SelectField options={["30 Minutes", "1 Hour", "Never"]} />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Document & Number Settings">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FormField label="Invoice Prefix">
            <Input defaultValue="INV" />
          </FormField>
          <FormField label="Work Order Prefix">
            <Input defaultValue="WO" />
          </FormField>
          <FormField label="Estimate Prefix">
            <Input defaultValue="EST" />
          </FormField>
          <FormField label="Customer Prefix">
            <Input defaultValue="CUS" />
          </FormField>
          <FormField label="Next Invoice Number">
            <Input defaultValue="INV-2025-00257" />
          </FormField>
          <FormField label="Next Work Order Number">
            <Input defaultValue="WO-2025-01025" />
          </FormField>
          <FormField label="Next Estimate Number">
            <Input defaultValue="EST-2025-00542" />
          </FormField>
          <FormField label="Next Customer Number">
            <Input defaultValue="CUS-2025-00126" />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Other Settings">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ToggleRow label="Enable Email Notifications" description="Send email notifications to users" defaultChecked />
          <ToggleRow label="Enable SMS Notifications" description="Send SMS notifications to customers" defaultChecked />
          <ToggleRow label="Enable WhatsApp Notifications" description="Send WhatsApp notifications" defaultChecked />
          <ToggleRow label="Enable Activity Log" description="Track all system activities" defaultChecked />
        </div>
      </SectionCard>
    </>
  );
}
