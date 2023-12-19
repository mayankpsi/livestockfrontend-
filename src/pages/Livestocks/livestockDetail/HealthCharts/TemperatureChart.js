import {
  Area,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  ComposedChart,
} from "recharts";
import { Stack } from "@mui/material";
import ScrollContainer from "react-indiana-drag-scroll";
import { Scrollbars } from "react-custom-scrollbars";

function TemperatureChart({ height = 200, data, width }) {
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
        <ComposedChart data={data}>
          <XAxis
            dataKey="createdAt"
            angle="-20"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            style={{ position: "fixed", border: "1px solid red" }}
            unit=" °F"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Bar
            dataKey="temperature"
            fill={"#E1A325"}
            name="Temperature"
            unit=" °F"
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
        </ComposedChart>
      </ResponsiveContainer>
    </Stack>
  );
}

export default TemperatureChart;
