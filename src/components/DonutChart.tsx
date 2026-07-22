import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  centerLabel: string;
  centerValue: string;
  size?: number;
}

export function DonutChart({ data, centerLabel, centerValue, size = 180 }: DonutChartProps) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="70%"
            outerRadius="100%"
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-xl font-bold leading-none sm:text-2xl">{centerValue}</p>
        <p className="mt-1 text-xs text-muted-foreground">{centerLabel}</p>
      </div>
    </div>
  );
}
