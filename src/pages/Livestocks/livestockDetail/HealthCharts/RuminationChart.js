import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Stack } from "@mui/material";
import { chartData, ruminationfake, ruminationDayWise } from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { ruminationLegends } from "../ChartSection/dataFormats";
import useDateFormat from "../../../../hooks/useDateFormat";

function RuminationChart({ height = 200, width, data, thresholds, selectedDate}) {
  const {paginationDateFormat} = useDateFormat()
  const colors = {
    rumination: { stroke: "rgba(97, 169, 255, 1)", fill: "rgba(97, 169, 255, 0.5)" },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const getData = chartData;
  const start = paginationDateFormat(selectedDate[0]?.startDate)
  const end = paginationDateFormat(selectedDate[0]?.endDate)
  const isDay = start === end;
  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={!isDay?ruminationDayWise:ruminationfake}>
          <XAxis
            dataKey="xAxis"
            angle={isDay?"30":"0"}
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            domain={[0, Number(!isDay?3700:50) + 10]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(ruminationLegends)}
          />
          <Bar
            dataKey="dataValue"
            stroke={colors.rumination.stroke}
            fill={colors.rumination.fill}
            strokeWidth={2}
            name="Rumination"
            barSize={30}
          />
          <ReferenceLine
            y={Number(!isDay?3400:50)}
            label="Max"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
          <ReferenceLine
            y={Number(!isDay?1100:10)}
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

export default RuminationChart;
