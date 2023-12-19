import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Stack } from "@mui/material";

function StepsChart({ height = 200, width, data }) {
  const isDarkMode = false;
  const colors = isDarkMode
    ? {
        steps: { stroke: "#4f46e5", fill: "#4f46e5" },
        threshold: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        steps: { stroke: "#4f46e5", fill: "#c7d2fe" },
        threshold: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgba(255, 151, 119, 0.7)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="rgba(255, 151, 119, 0.7)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
              dataKey="createdAt"
              angle="-20"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="/day"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="steps"
            type="monotone"
            stroke={"rgba(255, 151, 119, 1)"}
            fillOpacity={1}
            fill={"url(#colorUv)"}
            strokeWidth={2}
            name="Steps"
            unit="/day"
          />
          <Area
            dataKey="threshold"
            type="monotone"
            stroke={"rgba(252, 85, 85, 0.5)"}
            fill={"transparent"}
            strokeWidth={2}
            name="Threshold"
            strokeDasharray="10 20"
            unit=""
          />
        </AreaChart>
      </ResponsiveContainer>
    </Stack>
  );
}

export default StepsChart;
