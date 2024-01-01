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
import useDateFormat from "../../../../hooks/useDateFormat";

function ActivityChart({ height = 200, width, data,thresholds,selectedDate }) {
  const {paginationDateFormat} = useDateFormat();
  const colors = {
    steps: { stroke: "#4f46e5", fill: "#c7d2fe" },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const getData = data?.length ? data : chartData;
  const xLabel = data?.length && "hour" in data?.[0] ? "hour" : "_id";
  const xUnit = data?.length && "hour" in data?.[0] ? " hr" : " day";

  const start = paginationDateFormat(selectedDate[0]?.startDate)
  const end = paginationDateFormat(selectedDate[0]?.endDate)
  const isDay = start === end;
  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={!isDay?activityDayWise:activityFakeData}>
          <XAxis
            dataKey={'xAxis'}
            angle={isDay?"30":"0"}
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            domain={[0, Number(!isDay?3500:22) + 5]}
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
            y={Number(!isDay?3300:22)}
            label="Max"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
          <ReferenceLine
            y={Number(!isDay?1600:5)}
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
