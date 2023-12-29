import {
  Area,
  Bar,
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
import { chartData, activityFakeData, activityDayWise} from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { activityLegends } from "../ChartSection/dataFormats";

function ActivityChart({ height = 200, width, data,thresholds }) {
  const colors = {
    steps: { stroke: "#4f46e5", fill: "#c7d2fe" },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const getData = data?.length ? data : chartData;
  const xLabel = data?.length && "hour" in data?.[0] ? "hour" : "_id";
  const xUnit = data?.length && "hour" in data?.[0] ? " hr" : " day";

  const isDay = true
  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={isDay?activityDayWise:activityFakeData}>
          <XAxis
            dataKey={'xAxis'}
            angle="30"
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="/min"
            domain={[0, Number(thresholds?.high) + 5]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background, color:colors.steps.stroke}} />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(activityLegends)}
          />
          <Bar
            dataKey="dataValue"
            stroke={colors.steps.stroke}
            fill={colors.steps.fill}
            strokeWidth={2}
            name="activity"
            barSize={30}
          />
          <ReferenceLine
            y={Number(thresholds?.high)}
            label="Max"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
          <ReferenceLine
            y={Number(3)}
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

export default ActivityChart;
