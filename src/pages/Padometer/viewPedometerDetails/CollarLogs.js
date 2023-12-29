import { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  TabPaneV2,
  TableV2,
  CustomPagination,
  NoData,
  ExportAsCSV,
} from "../../../ComponentsV2";
import useCollarContext from "../../../hooks/useCollarContext";
import { request } from "../../../apis/axios-utils";
import { useParams } from "react-router-dom";
import useDateFormat from "../../../hooks/useDateFormat";
import useErrorMessage from "../../../hooks/useErrorMessage";

const CollarLogs = () => {
  const tableHeaders = ["event name", "Device Type", "date & time"];
  const [collarLog, setCollarLogs] = useState([]);
  const [collarLogsDataLength, setCollarLogsDataLength] = useState(0);
  const [collarLogsPagination, setCollarLogsPagination] = useState(1);
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { setOpenBackdropLoader, openSnackbarAlert } = useCollarContext();
  const { formattedDate, paginationDateFormat } = useDateFormat();
  const {getErrorMessage} = useErrorMessage()

  const { id } = useParams();

  useEffect(() => {
    getCollarLogs();
  }, [collarLogsPagination, selectedDate]);

  const getCollarLogs = async () => {
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/devices/getDeviceLogs?deviceId=${id}&page=${collarLogsPagination}&limit=10&startDate=${paginationDateFormat(
          selectedDate?.startDate
        )}&endDate=${paginationDateFormat(selectedDate?.endDate)}`,
      });
      if (res.status === 200) {
        const { data: dataV2 } = res?.data;
        setCollarLogs(dataV2?.deviceLogsData);
        setCollarLogsDataLength(dataV2?.dataLength);
      } else {
        setCollarLogs([]);
        setCollarLogsDataLength(0);
        const message = getErrorMessage(res)
        throw new Error(message);
      }
    } catch (error) {
      openSnackbarAlert("error", error.message);
    } finally {
      setOpenBackdropLoader(false);
    }
  };

  const getFormattedData = (data) => {
    const res = data?.map((ele) => ({
      eventName: ele?.message,
      deviceType: ele?.deviceType,
      time: formattedDate(ele?.createdAt),
    }));
    return res || [];
  };

  return (
    <Box>
      <Stack sx={{ width: "100%", pb: 3 }}>
        <Stack pb={2}>
          <TabPaneV2
            paneText="Manage Log"
            paneTextColor="#000"
            datePicker={true}
            clearBtn={false}
            onClearAll={() => {}}
            btnText={
              <ExportAsCSV
                headers={tableHeaders}
                data={getFormattedData(collarLog)}
                fileName="alerts"
              >
                Export
              </ExportAsCSV>
            }
            onBtnClick={() => {}}
            btnColor="#fff"
            btnBg="#B58B5D"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Stack>
        {collarLogsDataLength > 0 ? (
          <Stack direction={"column"} gap={3}>
            <TableV2
              tableHeadData={tableHeaders}
              tableRowData={getFormattedData(collarLog)}
            />
            {collarLogsDataLength > 10 && (
              <Stack direction="row" justifyContent="center">
                <CustomPagination
                  size="large"
                  page={collarLogsPagination}
                  count={Math.ceil(collarLogsDataLength / 10)}
                  onPageChange={(pageNo) => setCollarLogsPagination(pageNo)}
                />
              </Stack>
            )}
          </Stack>
        ) : (
          <NoData />
        )}
      </Stack>
    </Box>
  );
};

export default CollarLogs;
