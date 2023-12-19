import {
    Area,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Bar,
    AreaChart,
    ComposedChart, Line
  } from "recharts";
  import { Stack } from "@mui/material";
  
  function HeartBeatChart({ height = 200, data, width }) {
    const isDarkMode = false;
    const colors = isDarkMode
      ? {
          steps: { stroke: "#4f46e5", fill: "#4f46e5" },
          threshold: { stroke: "#22c55e", fill: "#22c55e" },
          text: "#e5e7eb",
          background: "#18212f",
        }
      : {
          steps: { stroke: "#4f46e5", fill: "#c7d2fe" },
          threshold: { stroke: "#16a34a", fill: "#dcfce7" },
          text: "#374151",
          background: "#fff",
        };
  
    return (
      <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
        <ResponsiveContainer height={height} width={width}>
          <ComposedChart data={data}>
            <XAxis
              dataKey="createdAt"
              angle="-20"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <YAxis
              unit="/min"
              tick={{ fill: colors.text }}
              tickLine={{ stroke: colors.text }}
            />
            <CartesianGrid strokeDasharray="4" />
            <Tooltip contentStyle={{ backgroundColor: colors.background }} />
            <Line
              dataKey="heartBeat"
              // type="monotone"
              stroke={"#FD3730"}
              // fillOpacity={1}
              fill={"#FD3730"}
              strokeWidth={2}
              name="heartBeat"
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
  
  export default HeartBeatChart;
  