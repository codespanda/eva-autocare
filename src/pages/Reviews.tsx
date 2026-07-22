import { useState } from "react";
import { Download, Filter, MessageSquare, MoreVertical, Search, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatCard } from "@/components/StatCard";
import { DonutChart } from "@/components/DonutChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination } from "@/components/Pagination";
import {
  avatarUrl,
  ratingDistribution,
  ratingTrend,
  reviews,
  topRatedTechnicians,
} from "@/lib/mock-data";

const STATS = [
  { icon: Star, label: "Average Rating", value: "4.7 ★★★★★", trend: { value: "0.3 vs 01 Apr - 24 Apr 2025", direction: "up" as const } },
  { icon: MessageSquare, label: "Total Reviews", value: 256, trend: { value: "18% vs 01 Apr - 24 Apr 2025", direction: "up" as const } },
  { icon: Star, label: "5 Star Reviews", value: "176 (69%)", trend: { value: "15% vs 01 Apr - 24 Apr 2025", direction: "up" as const } },
  { icon: Star, label: "4 Star Reviews", value: "48 (19%)", trend: { value: "8% vs 01 Apr - 24 Apr 2025", direction: "up" as const } },
  { icon: Star, label: "3 Star & Below", value: "32 (12%)", trend: { value: "4% vs 01 Apr - 24 Apr 2025", direction: "down" as const } },
];

const PAGE_SIZE = 5;

export function Reviews() {
  const [page, setPage] = useState(1);
  const paged = reviews.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-5 sm:gap-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-5 sm:gap-6 xl:col-span-2">
          <Card>
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-6">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search by customer name, service, ..." className="pl-9" />
              </div>
              <Button variant="outline" className="justify-start gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
                <DonutChart
                  data={ratingDistribution.map((r) => ({ name: `${r.stars} Star`, value: r.count, color: r.color }))}
                  centerLabel="Total Reviews"
                  centerValue="256"
                />
                <div className="flex flex-col gap-2 text-sm">
                  {ratingDistribution.map((r) => (
                    <div key={r.stars} className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                      <span className="font-medium">{r.stars} Star</span>
                      <span className="text-muted-foreground">
                        {r.count} ({r.pct}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Rating Trend</CardTitle>
                <select className="rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium">
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </CardHeader>
              <CardContent>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ratingTrend} margin={{ left: -20, right: 5, top: 5, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                      <YAxis domain={[1, 5]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12, background: "hsl(var(--popover))" }}
                      />
                      <Line type="monotone" dataKey="rating" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-0">
              {paged.map((r) => (
                <div key={r.id} className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-start">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback>{r.customer.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold">{r.customer.name}</p>
                        <p className="text-xs text-muted-foreground">{r.customer.phone}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-current" : "text-muted"}`} />
                        ))}
                        <span className="ml-1 text-xs font-semibold text-foreground">{r.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {r.service} • {r.vehicleLabel} • {r.vehiclePlate}
                    </p>
                    <p className="mt-2 text-sm">{r.review}</p>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={avatarUrl(r.technicianAvatarSeed)} alt={r.technician} />
                          <AvatarFallback>{r.technician.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        {r.technician}
                      </span>
                      <span>
                        {r.date}, {r.time}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 self-start" aria-label="More actions">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalLabel={`Showing ${paged.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to ${
                (page - 1) * PAGE_SIZE + paged.length
              } of ${reviews.length} reviews`}
            />
          </Card>
        </div>

        <div className="flex flex-col gap-5 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle>Review Highlights</CardTitle>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  <ThumbsUp className="h-4 w-4" />
                  What customers love
                </p>
                <ul className="mt-2 flex flex-col gap-1.5 text-sm text-emerald-700 dark:text-emerald-400">
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Quality of Service
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Professional Staff
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Timely Delivery
                  </li>
                </ul>
              </div>
              <div className="rounded-xl bg-red-50 p-4 dark:bg-red-500/10">
                <p className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
                  <ThumbsDown className="h-4 w-4" />
                  Areas to improve
                </p>
                <ul className="mt-2 flex flex-col gap-1.5 text-sm text-red-700 dark:text-red-400">
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Waiting Time
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    Service Cost Transparency
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Rated Technicians</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {topRatedTechnicians.map((t) => (
                <div key={t.name} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {t.rank}
                  </span>
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={avatarUrl(t.avatarSeed)} alt={t.name} />
                    <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.reviews} reviews</p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-amber-500">{t.rating} ★</span>
                </div>
              ))}
              <a href="/technicians" className="mt-1 text-sm font-semibold text-primary hover:underline">
                View all technicians →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
