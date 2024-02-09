import { Box, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import {
  TableV2,
  ExportAsCSV,
  TabPaneV2,
  CustomPagination,
  NoData,
  Spinner,
} from "../../../../ComponentsV2";
import RuminationChart from "../HealthCharts/RuminationChart";
import HealthChartsModalContent from "../HealthCharts/HealthChartsModalContent";
import useGetColorDynamically from "../../../../hooks/useGetColorDynamically";
import useDateFormat from "../../../../hooks/useDateFormat";
import { TypographySecondary } from "../../../../ComponentsV2/themeComponents";
import { ruminationfake, ruminationDayWise } from "../HealthCharts/chartData";
import { useParams } from "react-router-dom";
import { useLivestockHealthContext } from "../../../../context/LivestockHealthContext";
import { roundOffUptoTwo } from "../../../../utils/utils";

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
  const { id } = useParams();
  const {
    getLogs,
    healthLogData,
    handleLogsPaginationChange,
    logsDateRange,
    setLogsDateRange,
    chartDataLoader,
    getChartData,
    chartDateRange,
    setChartDateRange,
    activeTab,
    healthChartData: chartData,
  } = useLivestockHealthContext();
  //DESTRUCTING LOGS DATA
  const { logsData, logsDataLength, pagination, loading } = healthLogData;

  useEffect(() => {
    getLogs(id);
  }, [pagination, logsDateRange, activeTab]);

  useEffect(() => {
    getChartData(id);
  }, [id, chartDateRange, activeTab]);

  const rumination = roundOffUptoTwo(
    chartData?.reduce((total, ele) => total + ele?.activeTimeInHours, 0)
  );
  return (
    <Stack width="100%" direction={"column"} gap={5}>
      <Stack width="100%">
        <HealthChartsModalContent
          label={"Rumination"}
          dateRange={true}
          total={`${rumination} min`}
          selectedDate={chartDateRange}
          setSelectedDate={setChartDateRange}
        >
          {chartDataLoader ? (
            <Stack height={500}>
              <Spinner />
            </Stack>
          ) : (
            <RuminationChart
              height={500}
              thresholds={thresholds}
              selectedDate={chartDateRange}
              data={chartData}
            />
          )}
        </HealthChartsModalContent>
      </Stack>

      <Stack width="100%" direction={"column"} gap={3}>
        <Box>
          <TabPaneV2
            paneText="Rumination"
            paneTextColor="#000"
            datePicker={true}
            btnDisabled={logsDataLength ? false : true}
            btnText={
              logsDataLength ? (
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
            selectedDate={logsDateRange}
            setSelectedDate={setLogsDateRange}
          />
          <TypographySecondary sx={{ fontSize: "16px" }}>{`showing ${
            logsDataLength < 10 ? logsDataLength : 10
          } out of ${logsDataLength} Logs`}</TypographySecondary>
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
