import { useState } from "react";
import { MoreVertical, Plus, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { avatarUrl } from "@/lib/mock-data";
import { SectionCard } from "./FormControls";
import { AddUserDialog } from "@/components/forms/AddUserDialog";

const USERS = [
  { name: "Aman Verma", email: "aman.verma@evaautocare.com", role: "Administrator", branch: "All Branches", status: "Active", avatarSeed: "aman-verma" },
  { name: "Ritu Malhotra", email: "ritu.malhotra@evaautocare.com", role: "Branch Manager", branch: "Noida Service Center", status: "Active", avatarSeed: "ritu-malhotra" },
  { name: "Suresh Nair", email: "suresh.nair@evaautocare.com", role: "Branch Manager", branch: "Delhi Service Center", status: "Inactive", avatarSeed: "suresh-nair" },
  { name: "Kavita Rao", email: "kavita.rao@evaautocare.com", role: "Front Desk", branch: "Gurugram Service Center", status: "Active", avatarSeed: "kavita-rao" },
  { name: "Rahul Verma", email: "rahul.verma@evaautocare.com", role: "Technician", branch: "Gurugram Service Center", status: "Active", avatarSeed: "rahul-verma" },
];

const ROLES = [
  { name: "Administrator", users: 1, permissions: "Full access to all modules and settings" },
  { name: "Branch Manager", users: 2, permissions: "Manage branch operations, staff and reports" },
  { name: "Front Desk", users: 4, permissions: "Manage appointments, customers and billing" },
  { name: "Technician", users: 8, permissions: "View and update assigned work orders" },
];

const ROLE_BADGE: Record<string, string> = {
  Administrator: "bg-violet-50 text-violet-700",
  "Branch Manager": "bg-blue-50 text-blue-700",
  "Front Desk": "bg-amber-50 text-amber-700",
  Technician: "bg-emerald-50 text-emerald-700",
};

export function UsersRolesTab() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Users">
        <div className="-m-4 sm:-m-6">
          <div className="flex items-center justify-end px-4 pb-4 sm:px-6">
            <Button className="gap-2" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {USERS.map((u) => (
                <TableRow key={u.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 shrink-0">
                        <AvatarImage src={avatarUrl(u.avatarSeed)} alt={u.name} />
                        <AvatarFallback>{u.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{u.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={ROLE_BADGE[u.role]}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.branch}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={u.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}
                    >
                      {u.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More actions">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>

      <SectionCard title="Roles & Permissions">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ROLES.map((role) => (
            <div key={role.name} className="flex items-start gap-3 rounded-lg border p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{role.name}</p>
                  <span className="shrink-0 text-xs text-muted-foreground">{role.users} users</span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{role.permissions}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <AddUserDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
