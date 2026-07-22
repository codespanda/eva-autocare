import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ComingSoon({ title }: { title: string }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Construction className="h-7 w-7" />
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          This section is under construction. Check back soon for the full {title.toLowerCase()} experience.
        </p>
      </CardContent>
    </Card>
  );
}
