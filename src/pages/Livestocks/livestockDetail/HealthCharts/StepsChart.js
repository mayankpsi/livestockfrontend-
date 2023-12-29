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
import { chartData, stepsFakeData, stepByDay } from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { stepsLegends } from "../ChartSection/dataFormats";

function StepsChart({ height = 200, width, data, thresholds }) {
  const colors = {
    steps: { stroke: "#FF9777", fill: "#FF9777" },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const getData = data?.length ? data : chartData;
  const xLabel = data?.length && "hour" in data?.[0] ? "hour" : "day";
  const xUnit = data?.length && "hour" in data?.[0] ? " hr" : "";

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const stepFakeData = chartData?.map((ele) => ({
    ...ele,
    step: randomIntFromInterval(1500, 2200),
  }));

  const byDay = true;
  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={byDay ? stepByDay : stepsFakeData}>
          <XAxis
            dataKey={"xAxis"}
            angle="0"
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            // unit={xUnit}
            padding={{ bottom: 100 }}
          />
          <YAxis
            domain={[0, Number(byDay?4100:200) + 10]}
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
          <Bar
            dataKey="dataValue"
            stroke={colors.steps.stroke}
            fill={colors.steps.fill}
            strokeWidth={2}
            name="totalSteps"
            barSize={30}
          />
          <ReferenceLine
            y={Number(byDay?4000:200)}
            label="Max"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
          <ReferenceLine
            y={Number(byDay?1500:50)}
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
