import { Building2, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField, SelectField, SectionCard } from "./FormControls";

export function BusinessProfileTab() {
  return (
    <>
      <SectionCard title="Business Logo">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Building2 className="h-9 w-9" />
          </span>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="text-sm font-medium">Upload your business logo</p>
            <p className="text-xs text-muted-foreground">PNG or JPG, at least 256x256px, max 2MB.</p>
            <div className="flex justify-center gap-2 sm:justify-start">
              <Button variant="outline" size="sm" className="gap-2">
                <Camera className="h-3.5 w-3.5" />
                Upload Logo
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Remove
              </Button>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Business Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Legal Business Name">
            <Input defaultValue="xxxxxxxxxxxx Pvt Ltd" />
          </FormField>
          <FormField label="Display Name">
            <Input defaultValue="Eva AutoCare" />
          </FormField>
          <FormField label="Business Type">
            <SelectField options={["Service Center", "Dealership", "Franchise"]} />
          </FormField>
          <FormField label="GSTIN">
            <Input defaultValue="xxxxxxxxxxxxxxx" />
          </FormField>
          <FormField label="PAN">
            <Input defaultValue="xxxxxxxxxx" />
          </FormField>
          <FormField label="Website">
            <Input defaultValue="www.evaautocare.com" />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="Registered Address">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Address Line 1">
            <Input defaultValue="482 Harbor Lane" />
          </FormField>
          <FormField label="Address Line 2">
            <Input defaultValue="Sector 45" />
          </FormField>
          <FormField label="City">
            <Input defaultValue="Gurugram" />
          </FormField>
          <FormField label="State">
            <SelectField options={["Haryana", "Delhi", "Uttar Pradesh"]} />
          </FormField>
          <FormField label="Pincode">
            <Input defaultValue="122003" />
          </FormField>
          <FormField label="Country">
            <SelectField options={["India"]} />
          </FormField>
        </div>
      </SectionCard>

      <SectionCard title="About & Business Hours">
        <FormField label="Business Description">
          <Textarea
            defaultValue="Eva AutoCare provides honest, reliable car servicing and repairs backed by a 12-month warranty on every job."
            className="min-h-[90px]"
          />
        </FormField>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Opening Time">
            <Input defaultValue="08:00 AM" />
          </FormField>
          <FormField label="Closing Time">
            <Input defaultValue="06:00 PM" />
          </FormField>
          <FormField label="Working Days">
            <SelectField options={["Mon - Sat", "Mon - Fri", "All Days"]} />
          </FormField>
        </div>
      </SectionCard>
    </>
  );
}
