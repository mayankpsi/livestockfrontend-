import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Stack } from "@mui/material";
import { chartData } from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { stepsLegends } from "../ChartSection/dataFormats";

function StepsChart({ height = 200, width, data,thresholds }) {
  const colors = {
    steps: { stroke: "#FF9777", fill: "#FF9777" },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const getData = data?.length ? data : chartData;
  const xLabel = data?.length && "hour" in data?.[0]?'hour':'day'
  const xUnit = data?.length && "hour" in data?.[0]?' hr':""
  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={getData}>
          <XAxis
            dataKey={xLabel}
            angle="0"
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit={xUnit}
            padding={{ bottom: 100 }}
          />
          <YAxis
            domain={[0, Number(thresholds?.high) + 10]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(stepsLegends)}
          />
          <Line
            dataKey="totalSteps"
            stroke={colors.steps.stroke}
            fill={colors.steps.fill}
            strokeWidth={2}
            name="totalSteps"
            unit=" °F"
          />
          <ReferenceLine
            y={Number(thresholds?.high)}
            label="Max"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
          <ReferenceLine
            y={Number(thresholds?.low)}
            label="Min"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Stack>
  );
}

export default StepsChart;
