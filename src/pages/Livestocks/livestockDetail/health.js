import { Stack, Box} from "@mui/material";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { useState, useEffect, cloneElement } from "react";
import { request } from "../../../apis/axios-utils";
import { ChartCard, DatePicker, CustomModal } from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";
import useDateFormat from "../../../hooks/useDateFormat";
import useGetCamelCase from "../../../hooks/useGetCamelCase";
import useGetColorDynamically from "../../../hooks/useGetColorDynamically";
import { chartCardData } from "../Data";
import TemperatureChart from "./HealthCharts/TemperatureChart";
import HealthChartsModalContent from "./HealthCharts/HealthChartsModalContent";

const Health = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { setOpenBackdropLoader, openSnackbarAlert, openBackdropLoader} = useLivestockContext();
  const { formattedDate, getLongDateFormat, paginationDateFormat } =
    useDateFormat();
  const { getCamelCase } = useGetCamelCase();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const { getDynamicColor } = useGetColorDynamically();
  const [healthData, setHealthData] = useState({});

  //GET ALL ALERTS THRESHOLD
  useEffect(() => {
    if (data?.id) {
      setOpenBackdropLoader(true);
      request({
        url: `/liveStock/getLiveStockHistory?LiveStockId=${
          data?.id
        }&currentDate=${paginationDateFormat(
          selectedDate,
          "date"
        )}&EndDate=${paginationDateFormat(selectedDate, "date")}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const { data } = res?.data;
            setHealthData(data);
          } else {
            const msg = res?.response?.data?.message || "Something went wrong!";
            setHealthData({});
            throw new Error(msg);
          }
        })
        .catch((err) => {
          const firstLoad =
            paginationDateFormat(new Date(), "date") ===
              paginationDateFormat(selectedDate, "date") &&
            paginationDateFormat(new Date(), "date") ===
              paginationDateFormat(selectedDate, "date");
          if (!firstLoad) openSnackbarAlert("error", err?.message);
        })
        .finally(() => setOpenBackdropLoader(false));
    }
  }, [data?.id, selectedDate]);

  const handleModal = (label) => {
    setModalContent(label);
    setOpenModal(true);
  };

  const getModalContent = (type) => {
    const selectedChart = chartCardData?.find((ele) => ele?.label === type);
    const dataLabel =
      selectedChart?.label === "heartbeat" ? "heartBeat" : selectedChart?.label;
    const newChart =
      selectedChart?.chart &&
      cloneElement(selectedChart?.chart, {
        height:550,
        width:25000,
        data: healthData[dataLabel]?.map((ele) => ({
          ...ele,
          createdAt: formattedDate(ele?.createdAt, "time"),
        })),
      });
    return newChart;
  };

  return (
    <Stack my={4} direction="column" alignItems="center" gap={4}>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <TypographyPrimary sx={{ fontSize: "21px" }}>
          Showing Health Data of{" "}
          <span style={{ color: "#B58B5D" }}>
            {getLongDateFormat(selectedDate)}
          </span>
        </TypographyPrimary>
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Stack>

      <Stack width="100%" gap={2}>
        {chartCardData
          ?.map((ele) => ({
            ...ele,
            value: data ? data[getCamelCase(ele?.label)] : "",
            valueColor: getDynamicColor(data, ele?.label),
          }))
          ?.map((ele) => {
            const dataLabel =
              ele?.label === "heartbeat" ? "heartBeat" : ele?.label;
            const newChart = cloneElement(ele?.chart, {
              data: healthData[dataLabel]
                ?.map((ele) => ({
                  ...ele,
                  createdAt: formattedDate(ele?.createdAt, "time"),
                }))
                ?.slice(0, 64)
            });
            return (
              <ChartCard
                label={ele.label}
                value={ele.value}
                icon={ele.icon}
                colors={ele.colors}
                valueColor={ele.valueColor}
                suffix={ele.suffix}
                onViewData={(label) => handleModal(label)}
              >
                {newChart}
              </ChartCard>
            );
          })}
      </Stack>
      <CustomModal
        content={
          <HealthChartsModalContent
            onModalClose={() => setOpenModal(false)}
            selectedDate={selectedDate}
            label={modalContent}
            setSelectedDate={setSelectedDate}
          >
            {getModalContent(modalContent)}
          </HealthChartsModalContent>
        }
        openModal={openModal}
        customWidth={"90%"}
        handleClose={() => setOpenModal(false)}
      />
    </Stack>
  );
};

export default Health;
