import { useState } from "react";
import { Check, Crown, Sparkles } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "Free",
    period: "",
    description: "For small shops just getting started",
    features: ["Up to 50 appointments/mo", "1 branch", "Basic reports", "Email support"],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹1,999",
    period: "/month",
    description: "For growing service centers",
    features: [
      "Unlimited appointments",
      "Up to 3 branches",
      "Advanced reports & analytics",
      "WhatsApp & SMS notifications",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₹4,999",
    period: "/month",
    description: "For multi-branch operations at scale",
    features: [
      "Everything in Growth",
      "Unlimited branches",
      "Custom integrations & API access",
      "Dedicated account manager",
      "24/7 phone support",
    ],
  },
];

interface UpgradePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradePlanDialog({ open, onOpenChange }: UpgradePlanDialogProps) {
  const [selected, setSelected] = useState("growth");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            Upgrade Your Plan
          </DialogTitle>
          <DialogDescription>
            Unlock premium features, get more bookings and grow your business.
          </DialogDescription>
        </DialogHeader>

        <DialogBody>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={cn(
                  "relative flex flex-col gap-3 rounded-xl border p-4 text-left transition-colors",
                  selected === plan.id ? "border-primary ring-2 ring-primary" : "hover:border-primary/50"
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap">
                    <Sparkles className="h-3 w-3" />
                    Most Popular
                  </Badge>
                )}
                <div>
                  <p className="font-semibold">{plan.name}</p>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
                <div>
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="flex flex-col gap-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Maybe Later
          </Button>
          <Button onClick={() => onOpenChange(false)} className="gap-2">
            <Crown className="h-4 w-4" />
            Upgrade to {PLANS.find((p) => p.id === selected)?.name}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
