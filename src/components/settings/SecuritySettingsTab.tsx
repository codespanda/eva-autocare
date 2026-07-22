import { Laptop, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, SectionCard, ToggleRow } from "./FormControls";

const SESSIONS = [
  { device: "Chrome on Windows", location: "Gurugram, India", icon: Laptop, current: true, lastActive: "Active now" },
  { device: "Safari on iPhone", location: "Gurugram, India", icon: Smartphone, current: false, lastActive: "2 hours ago" },
  { device: "Chrome on macOS", location: "Noida, India", icon: Laptop, current: false, lastActive: "1 day ago" },
];

export function SecuritySettingsTab() {
  return (
    <>
      <SectionCard title="Change Password">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField label="Current Password">
            <Input type="password" placeholder="••••••••" />
          </FormField>
          <FormField label="New Password">
            <Input type="password" placeholder="••••••••" />
          </FormField>
          <FormField label="Confirm New Password">
            <Input type="password" placeholder="••••••••" />
          </FormField>
        </div>
        <Button className="w-fit">Update Password</Button>
      </SectionCard>

      <SectionCard title="Two-Factor Authentication">
        <ToggleRow
          label="Enable Two-Factor Authentication"
          description="Require a verification code in addition to your password"
          defaultChecked
        />
        <ToggleRow
          label="Require 2FA for All Users"
          description="Enforce two-factor authentication for every team member"
        />
      </SectionCard>

      <SectionCard title="Active Sessions">
        <div className="flex flex-col gap-3">
          {SESSIONS.map((s, i) => (
            <div key={i} className="flex items-center justify-between gap-3 rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium">
                    {s.device}
                    {s.current && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        This device
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.location} • {s.lastActive}
                  </p>
                </div>
              </div>
              {!s.current && (
                <Button variant="ghost" size="sm" className="shrink-0 text-red-600 hover:text-red-700">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
