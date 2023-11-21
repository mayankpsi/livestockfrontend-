import { useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  TabPaneV2,
  TableV2,
  CustomPagination,
  NoData,
  ExportAsCSV,
} from "../../../ComponentsV2";

const CollarLogs = () => {
  const tableHeaders = ["event name", "time"];
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const tableRows = [
    {
      eventName: "collar is turned on",
      time: "10:59 PM, 23/08/23",
    },
    {
      eventName: "collar is turned off",
      time: "10:59 PM, 23/08/23",
    },
    {
      eventName: "collar is turned on",
      time: "10:59 PM, 23/08/23",
    },
    {
      eventName: "collar is turned off",
      time: "10:59 PM, 23/08/23",
    },
    {
      eventName: "collar is turned on",
      time: "10:59 PM, 23/08/23",
    },
    {
      eventName: "collar is turned off",
      time: "10:59 PM, 23/08/23",
    },
    {
      eventName: "collar is turned on",
      time: "10:59 PM, 23/08/23",
    },
    {
      eventName: "collar is turned off",
      time: "10:59 PM, 23/08/23",
    },
    {
      eventName: "collar is turned on",
      time: "10:59 PM, 23/08/23",
    },
  ];
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
                data={tableRows}
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
        <TableV2 tableHeadData={tableHeaders} tableRowData={tableRows} />
      </Stack>
      {tableRows?.length ? (
        11 > 10 && (
          <Stack direction="row" justifyContent="center">
            <CustomPagination
              size="large"
              page={1}
              count={1}
              onPageChange={(pageNo) => {}}
            />
          </Stack>
        )
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default CollarLogs;
