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
import { chartData, ruminationfake, ruminationDayWise } from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { ruminationLegends } from "../ChartSection/dataFormats";
import useDateFormat from "../../../../hooks/useDateFormat";

function RuminationChart({
  height = 200,
  width,
  data,
  thresholds,
  selectedDate,
  dayWise,
}) {
  const { paginationDateFormat } = useDateFormat();
  const colors = {
    rumination: {
      stroke: "rgba(97, 169, 255, 1)",
      fill: "rgba(97, 169, 255, 0.5)",
    },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const getData = chartData;
  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={!dayWise ? ruminationDayWise : ruminationfake}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors?.rumination?.fill}
                stopOpacity={1}
              />
              <stop
                offset="95%"
                stopColor={colors?.rumination?.fill}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="xAxis"
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            height={47}
          />
          <YAxis
            domain={[0, Number(!dayWise ? 3700 : 50) + 10]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit=" mins"
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{ backgroundColor: colors.background }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(ruminationLegends)}
          />
          <Area
            dataKey="dataValue"
            stroke={colors.rumination.stroke}
            fill="url(#colorUv)"
            strokeWidth={2}
            name="Rumination"
            barSize={30}
          />
          <ReferenceLine
            y={Number(!dayWise ? 3400 : 50)}
            label="Max"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
          <ReferenceLine
            y={Number(!dayWise ? 1100 : 10)}
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
