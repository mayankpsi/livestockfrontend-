import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  ReferenceLine,
  Legend,
} from "recharts";
import { Stack } from "@mui/material";
import { chartData } from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { tempLegends } from "../ChartSection/dataFormats";
import { tempFakeDate } from "../ChartSection/tempFakeData";
import moment from "moment/moment";

function TemperatureChart({ height = 200, data, width, thresholds }) {
  const colors = {
    temp: { stroke: "#E1A325", fill: "#E1A325" },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };

  const getData = data?.length ? data : chartData;
  const xLabel =
    data?.length && "createdAt" in data?.[0] ? "createdAt" : "hour";

  const formattedTempData = tempFakeDate?.map(ele => (
    {
      time:moment(ele.Time).format("LT"),
      temp:ele.Temperature.toString()?.split('.')[0]
    }
  ))

  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={formattedTempData}>
          <XAxis
            dataKey={'time'}
            angle="30"
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit=" °F"
            domain={[90, Number(105) + 5]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          {/* <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(tempLegends)}
          /> */}
          <ReferenceLine
            y={105}
            label="Max"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
          <ReferenceLine
            y={Number(98)}
            label="Min"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
          <Line
            dataKey="temp"
            stroke={colors.temp.stroke}
            fill={colors.temp.fill}
            strokeWidth={2}
            name="Temperature"
            unit=" °F"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Stack>
  );
}

export default TemperatureChart;
