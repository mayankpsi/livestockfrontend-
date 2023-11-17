import { Box } from "@mui/material";
import { CustomTable, NoData } from "../../ComponentsV2";
import useLivestockContext from "../../hooks/useLivestockContext";
import { showLivestockTableHeadData } from "./Data";

const ShowLivestocks = ({ show }) => {
  const { allLivestocks } = useLivestockContext();

  const livestockFiltering = () => {
    let filteredLivestock;
    if (show === "all") {
      filteredLivestock = allLivestocks;
    } else {
      filteredLivestock = allLivestocks?.filter(
        (livestock) => livestock?.status?.toLowerCase() === show
      );
    }
    return filteredLivestock
      ?.toReversed()
      ?.map((el) => ({ ...el, status: null }));
  };
  return (
    <Box my={4}>
      <CustomTable
        headBackgroundColor="#B58B5D"
        tableHeadData={showLivestockTableHeadData}
        tableRowData={livestockFiltering()}
      />
      {!livestockFiltering()?.length ? <NoData /> : null}
    </Box>
  );
};

export default ShowLivestocks;
