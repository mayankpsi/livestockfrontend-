import { Box, Stack } from "@mui/material";
import { CustomPagination, CustomTable, NoData } from "../../ComponentsV2";
import useLivestockContext from "../../hooks/useLivestockContext";
import { showLivestockTableHeadData } from "./Data";

const ShowLivestocks = ({ show }) => {
  const {
    allLivestocks,
    livestockDataLength,
    livestockPagination,
    setLivestockPagination,
  } = useLivestockContext();

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
      {livestockFiltering()?.length ? (
        livestockDataLength > 10 && (
          <Stack direction="row" justifyContent="center" p={2}>
            <CustomPagination
              size="large"
              page={livestockPagination}
              count={Math.ceil(livestockDataLength / 10)}
              onPageChange={(pageNo) => setLivestockPagination(pageNo)}
            />
          </Stack>
        )
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default ShowLivestocks;
