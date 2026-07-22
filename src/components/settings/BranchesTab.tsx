import { useState } from "react";
import { MapPin, MoreVertical, Phone, Plus, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddBranchDialog } from "@/components/forms/AddBranchDialog";

const BRANCHES = [
  {
    name: "Gurugram Service Center",
    address: "482 Harbor Lane, Sector 45, Gurugram, Haryana - 122003",
    phone: "+91 xxxxxxxx10",
    manager: "Aman Verma",
    status: "Active" as const,
    isPrimary: true,
    technicians: 5,
  },
  {
    name: "Noida Service Center",
    address: "12 Sector 62, Noida, Uttar Pradesh - 201301",
    phone: "+91 xxxxxxxx20",
    manager: "Ritu Malhotra",
    status: "Active" as const,
    isPrimary: false,
    technicians: 3,
  },
  {
    name: "Delhi Service Center",
    address: "56 Rajouri Garden, New Delhi - 110027",
    phone: "+91 xxxxxxxx30",
    manager: "Suresh Nair",
    status: "Inactive" as const,
    isPrimary: false,
    technicians: 0,
  },
];

export function BranchesTab() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{BRANCHES.length} branches configured</p>
        <Button className="gap-2" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Branch
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {BRANCHES.map((branch) => (
          <Card key={branch.name}>
            <CardContent className="flex flex-col gap-3 p-4 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{branch.name}</h4>
                  {branch.isPrimary && (
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                      Primary
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" aria-label="More actions">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <Badge
                variant="secondary"
                className={`w-fit ${
                  branch.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                }`}
              >
                {branch.status}
              </Badge>

              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {branch.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  {branch.phone}
                </p>
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4 shrink-0" />
                  Manager: {branch.manager}
                </p>
              </div>

              <div className="flex items-center justify-between border-t pt-3 text-sm">
                <span className="text-muted-foreground">{branch.technicians} technicians</span>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddBranchDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
