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

function TemperatureChart({ height = 200, data, width, thresholds }) {
  const colors = {
    temp: { stroke: "#E1A325", fill: "#E1A325" },
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
            dataKey="createdAt"
            angle="30"
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit=" °F"
            domain={[0, Number(thresholds?.high) + 5]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(tempLegends)}
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
          <Line
            dataKey="temperature"
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
