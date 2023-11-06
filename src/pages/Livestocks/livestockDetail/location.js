import { Stack } from "@mui/material";
import LocationLog from "./locationLog";
import {TableV2, BtnGroup} from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";

const tableHeadData = ["status", "location", "updated"];
const tableRowData = [
  {
    status: "safe",
    location: "45.454, 66.52",
    updated: "10:59 PM, 23/09/23",
  },
  {
    status: "unsafe",
    location: "45.454, 66.52",
    updated: "10:59 PM, 23/09/23",
  },
  {
    status: "safe",
    location: "45.454, 66.52",
    updated: "10:59 PM, 23/09/23",
  },
];

const btnData = [
  {
    label: "location",
  },
  {
    label: "analytics",
  },
];

const Location = ({data}) => {
  const { showLocationTab, setShowLocationTab } = useLivestockContext()

  const tableColors = ["#06B95F", "#FC5555"];

  return (
    <Stack my={2} direction="column" alignItems="center" gap={2}>
      <BtnGroup
        btnData={btnData}
        activeBtn={showLocationTab}
        onChange={(ele) => setShowLocationTab(ele)}
      />
      {showLocationTab === "location" ? (
        <Stack sx={{ width: "100%" }}>
          <LocationLog data={data}/>
        </Stack>
      ) : (
        <Stack sx={{ width: "100%" }}>
          <TableV2
            paneText="activity log"
            paneTextColor="#B58B5D"
            isBtn={true}
            datePicker
            btnText="Export"
            btnColor="#fff"
            btnBg="#B58B5D"
            tableHeadData={tableHeadData}
            tableRowData={tableRowData}
            tableColors={tableColors}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default Location;
