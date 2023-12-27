import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Stack } from "@mui/material";
import { chartData } from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { activityLegends } from "../ChartSection/dataFormats";

function ActivityChart({ height = 200, width, data }) {
  const colors = {
    steps: { stroke: "#4f46e5", fill: "#c7d2fe" },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const getData = data?.length ? data : chartData;

  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={getData}>
          <XAxis
            dataKey="hour"
            angle="30"
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit="/hr"
          />
          <YAxis
            unit="/min"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(activityLegends)}
          />
          <Line
            dataKey="activeTimeInMinutes"
            stroke={colors.steps.stroke}
            fill={colors.steps.fill}
            strokeWidth={2}
            name="activity"
            unit="/min"
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

export default ActivityChart;
