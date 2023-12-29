import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  ReferenceLine,
  Legend
} from "recharts";
import { Stack } from "@mui/material";
import { chartData } from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { heartbeatLegends } from "../ChartSection/dataFormats";
import { tempFakeDate } from "../ChartSection/tempFakeData";
import moment from "moment/moment";

function HeartBeatChart({ height = 200, data, width, thresholds }) {
  const colors = {
    heartbeat: { stroke: "#FD3730", fill: "#FD3730" },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const getData = data?.length ? data : chartData;

  const formattedTempData = tempFakeDate?.map(ele => (
    {
      time:moment(ele.Time).format("LT"),
      heartbeat:Number(ele.Temperature.toString()?.split('.')[0]) -25
    }
  ))

  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={formattedTempData}>
          <XAxis
            dataKey="time"
            angle="30"
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="/min"
            domain={[30, Number(80) + 10]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(heartbeatLegends)}
          />
          <Line
            dataKey="heartbeat"
            stroke={colors.heartbeat.stroke}
            fill={colors.heartbeat.fill}
            strokeWidth={2}
            name="Heartbeat"
            unit="/min"
          />
          <ReferenceLine
            y={Number(80)}
            label="Max"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
          <ReferenceLine
            y={Number(50)}
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

export default HeartBeatChart;
