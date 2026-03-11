import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type RadarItem = { category: string; score: number };

export function ResultsRadar({ data }: { data: RadarItem[] }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid stroke="#C1C1C1" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: "#2C2C2C", fontSize: 12 }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tickCount={6}
            tick={{ fill: "#2C2C2C" }}
          />
          <Tooltip />
          <Radar
            dataKey="score"
            stroke="#ACE849"
            fill="#ACE849"
            fillOpacity={0.15}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
