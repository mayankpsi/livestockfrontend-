import { Box, Stack } from "@mui/material";
import { useState } from "react";
import {
  TableV2,
  ExportAsCSV,
  TabPaneV2,
  CustomPagination,
  NoData,
} from "../../../../ComponentsV2";
import RuminationChart from "../HealthCharts/RuminationChart";
import HealthChartsModalContent from "../HealthCharts/HealthChartsModalContent";
import useGetColorDynamically from "../../../../hooks/useGetColorDynamically";
import useDateFormat from "../../../../hooks/useDateFormat";
import { TypographySecondary } from "../../../../ComponentsV2/themeComponents";
import { ruminationfake, ruminationDayWise } from "../HealthCharts/chartData";

const tableHeadData = [
  "sensor name",
  "current value",
  "threshold value",
  "Date & Time",
];
const tableRowData = [
  {
    sensorName: "Rumination",
    currentValue: "110",
    thresholdValue: "120",
    date: "10:59 PM, 23/10/23",
  },
  {
    sensorName: "Rumination",
    currentValue: "110",
    thresholdValue: "120",
    date: "10:59 PM, 23/10/23",
  },
  {
    sensorName: "Rumination",
    currentValue: "110",
    thresholdValue: "120",
    date: "10:59 PM, 23/10/23",
  },
  {
    sensorName: "Rumination",
    currentValue: "110",
    thresholdValue: "120",
    date: "10:59 PM, 23/10/23",
  },
  {
    sensorName: "Rumination",
    currentValue: "110",
    thresholdValue: "120",
    date: "10:59 PM, 23/10/23",
  },
  {
    sensorName: "Rumination",
    currentValue: "110",
    thresholdValue: "120",
    date: "10:59 PM, 23/10/23",
  },
  {
    sensorName: "Rumination",
    currentValue: "110",
    thresholdValue: "120",
    date: "10:59 PM, 23/10/23",
  },
  {
    sensorName: "Rumination",
    currentValue: "110",
    thresholdValue: "120",
    date: "10:59 PM, 23/10/23",
  },
  {
    sensorName: "Rumination",
    currentValue: "110",
    thresholdValue: "120",
    date: "10:59 PM, 23/10/23",
  },
  {
    sensorName: "Rumination",
    currentValue: "110",
    thresholdValue: "120",
    date: "10:59 PM, 23/10/23",
  },
];

const RuminationSection = ({ thresholds }) => {
  const { formattedDate, getLongDateFormat, paginationDateFormat } =
    useDateFormat();
  const { getDynamicColor } = useGetColorDynamically();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const dataLength = 0;
  const start = paginationDateFormat(dateRange[0]?.startDate);
  const end = paginationDateFormat(dateRange[0]?.endDate);
  const isDay = start === end;
  const total = (isDay ? ruminationfake : ruminationDayWise).reduce(
    (total, ele) => total + ele?.dataValue,
    0
  );

  return (
    <Stack width="100%" direction={"column"} gap={5}>
      <Stack width="100%">
        <HealthChartsModalContent
          selectedDate={dateRange}
          label={"Rumination"}
          dateRange={true}
          total={`${total} min`}
          setSelectedDate={setDateRange}
        >
          <RuminationChart
            dayWise={isDay}
            height={500}
            thresholds={thresholds}
          />
        </HealthChartsModalContent>
      </Stack>

      <Stack width="100%" direction={"column"} gap={3}>
        <Box>
          <TabPaneV2
            paneText="Rumination"
            paneTextColor="#000"
            datePicker={true}
            btnDisabled={dataLength ? false : true}
            btnText={
              dataLength ? (
                <ExportAsCSV
                  headers={[]?.map((ele) =>
                    ele === "Date & Time" ? "date" : ele
                  )}
                  data={[]}
                  fileName="logs"
                >
                  Export
                </ExportAsCSV>
              ) : (
                "Export"
              )
            }
            onBtnClick={() => {}}
            btnColor="#fff"
            btnBg="#B58B5D"
            selectedDate={dateRange}
            setSelectedDate={setDateRange}
          />
          <TypographySecondary sx={{ fontSize: "16px" }}>{`showing ${
            dataLength < 10 ? dataLength : 10
          } out of ${dataLength} Logs`}</TypographySecondary>
        </Box>
        <Box>
          {[]?.length ? (
            <TableV2
              btnColor="#fff"
              btnBg="#B58B5D"
              tableHeadData={tableHeadData}
              tableRowData={[]}
            />
          ) : null}
          {[]?.length ? (
            false ? (
              <Stack direction="row" justifyContent="center" pt={3}>
                <CustomPagination
                  size="large"
                  count={1}
                  page={1}
                  onPageChange={(pageNo) => {}}
                />
              </Stack>
            ) : null
          ) : (
            <NoData />
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default RuminationSection;
