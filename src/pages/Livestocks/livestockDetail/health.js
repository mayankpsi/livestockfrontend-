import { Stack } from "@mui/material";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { useState, useEffect } from "react";
import { request } from "../../../apis/axios-utils";
import { ChartCard, DatePicker } from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";
import useDateFormat from "../../../hooks/useDateFormat";
import useGetCamelCase from "../../../hooks/useGetCamelCase";
import useGetColorDynamically from "../../../hooks/useGetColorDynamically";
import { chartCardData } from "../Data";

const Health = ({ data }) => {
  const { setOpenBackdropLoader, openSnackbarAlert } = useLivestockContext();
  const { formattedDate, getLongDateFormat, paginationDateFormat } =
    useDateFormat();
  const { getCamelCase } = useGetCamelCase();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const { getDynamicColor } = useGetColorDynamically();
  const [healthData, setHealthData] = useState([]);

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
            const formattedData = data?.map((ele) => ({
              temperature: ele?.temperature,
              heartbeat: ele?.heartBeat,
              steps: ele?.steps,
              rumination: ele?.rumination,
              time: formattedDate(ele?.createdAt, "time"),
            }));
            setHealthData([...formattedData?.slice(0, 24)]);
          } else {
            const msg = res?.response?.data?.message || "Something went wrong!";
            setHealthData([]);
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

  const getFilteredHealthData = (data, filter) => {
    const labels = data?.map((ele) => ele?.time);
    const dataSet = data?.map((ele) => ele[filter]);

    const options = {
      labels,
      datasets: [
        {
          label:
            filter?.charAt(0)?.toUpperCase() + filter?.slice(1)?.toLowerCase(),
          data: dataSet,
          backgroundColor: ["#7C0202"],
          borderColor: "#7C0202",
          borderWidth: 1,
        },
      ],
      options: {
        aspectRatio: 1,
      },
    };
    return options;
  };

  return (
    <Stack my={4} direction="column" alignItems="center" gap={4}>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <TypographyPrimary sx={{ fontSize: "21px" }}>
          Showing Health Data of <span style={{color:"#B58B5D"}}>{getLongDateFormat(selectedDate)}</span>
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
          ?.map((ele) => (
            <ChartCard
              chartData={getFilteredHealthData(healthData, ele?.label)}
              label={ele.label}
              value={ele.value}
              icon={ele.icon}
              iconBg={ele.iconBg}
              valueColor={ele.valueColor}
              suffix={ele.suffix}
            />
          ))}
      </Stack>
    </Stack>
  );
};

export default Health;
