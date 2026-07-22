import { CloudUpload, Download, History, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormField, SelectField, SectionCard, ToggleRow } from "./FormControls";

const BACKUP_HISTORY = [
  { date: "24 May 2025, 02:00 AM", size: "128 MB", type: "Automatic", status: "Success" as const },
  { date: "23 May 2025, 02:00 AM", size: "126 MB", type: "Automatic", status: "Success" as const },
  { date: "22 May 2025, 11:40 AM", size: "125 MB", type: "Manual", status: "Success" as const },
  { date: "22 May 2025, 02:00 AM", size: "124 MB", type: "Automatic", status: "Failed" as const },
];

export function BackupRestoreTab() {
  return (
    <>
      <SectionCard title="Backup Settings">
        <ToggleRow label="Enable Automatic Backups" description="Automatically back up your data every day" defaultChecked />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FormField label="Backup Frequency">
            <SelectField options={["Daily", "Weekly", "Monthly"]} />
          </FormField>
          <FormField label="Backup Time">
            <SelectField options={["02:00 AM", "12:00 AM", "04:00 AM"]} />
          </FormField>
          <FormField label="Retention Period">
            <SelectField options={["30 Days", "60 Days", "90 Days"]} />
          </FormField>
        </div>
        <Button className="w-fit gap-2">
          <CloudUpload className="h-4 w-4" />
          Backup Now
        </Button>
      </SectionCard>

      <SectionCard title="Restore Data">
        <p className="text-sm text-muted-foreground">
          Restoring from a backup will overwrite your current data. This action cannot be undone.
        </p>
        <Button variant="outline" className="w-fit gap-2 text-red-600 hover:text-red-700">
          <RotateCcw className="h-4 w-4" />
          Restore from Backup
        </Button>
      </SectionCard>

      <SectionCard title="Backup History">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 font-medium">Size</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {BACKUP_HISTORY.map((b, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-2.5 font-medium">{b.date}</td>
                  <td className="py-2.5 text-muted-foreground">{b.size}</td>
                  <td className="py-2.5 text-muted-foreground">{b.type}</td>
                  <td className="py-2.5">
                    <Badge
                      variant="secondary"
                      className={b.status === "Success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}
                    >
                      {b.status}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Download backup" disabled={b.status === "Failed"}>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <a href="#" className="flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          <History className="h-4 w-4" />
          View Full Backup Log
        </a>
      </SectionCard>
    </>
  );
}
