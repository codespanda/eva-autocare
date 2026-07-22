import {
  Briefcase,
  Calendar,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Phone,
  Star,
  ThumbsUp,
  Timer,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { avatarUrl, type TechnicianProfile } from "@/lib/mock-data";

export function TechnicianDetailPanel({ tech }: { tech: TechnicianProfile }) {
  return (
    <div className="flex flex-col gap-6 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Avatar className="h-14 w-14">
          <AvatarImage src={avatarUrl(tech.avatarSeed)} alt={tech.name} />
          <AvatarFallback>{tech.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-bold">{tech.name}</h3>
            <Badge
              variant="secondary"
              className={tech.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}
            >
              {tech.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            ID: {tech.id} • {tech.role}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        <ActionIcon icon={Phone} label="Call" />
        <ActionIcon icon={MessageSquare} label="Message" />
        <ActionIcon icon={Mail} label="Email" />
        <ActionIcon icon={Calendar} label="Schedule" />
        <ActionIcon icon={MoreHorizontal} label="More" />
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <DetailRow icon={Phone} label="Phone" value={tech.phone} />
        <DetailRow icon={Mail} label="Email" value={tech.email} />
        <DetailRow icon={Briefcase} label="Branch" value={tech.branch} />
        <DetailRow icon={Timer} label="Experience" value={tech.experience} />
        <DetailRow icon={Calendar} label="Joined On" value={tech.joinedOn} />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Skills</h4>
          <button className="text-xs font-semibold text-primary hover:underline">View All</button>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {tech.skillLevels.map((skill, i) => (
            <div key={i}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold">Performance (This Month)</h4>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <SummaryTile icon={Wrench} label="Jobs Completed" value={String(tech.performance.jobsCompleted)} />
          <SummaryTile icon={Star} label="Avg. Rating" value={String(tech.performance.avgRating)} />
          <SummaryTile icon={TrendingUp} label="On-time Completion" value={`${tech.performance.onTimeCompletion}%`} />
          <SummaryTile icon={ThumbsUp} label="Customer Satisfaction" value={`${tech.performance.customerSatisfaction}%`} />
        </div>
      </div>

      <Button className="w-full">View Full Profile</Button>
    </div>
  );
}

function ActionIcon({ icon: Icon, label }: { icon: typeof Phone; label: string }) {
  return (
    <button
      className="flex flex-col items-center gap-1.5 rounded-lg border py-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b pb-3 last:border-0 last:pb-0">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 shrink-0" />
        {label}
      </span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function SummaryTile({ icon: Icon, label, value }: { icon: typeof Phone; label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <p className="mt-2 text-sm font-bold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
