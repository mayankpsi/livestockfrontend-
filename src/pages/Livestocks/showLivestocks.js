import { Box, Stack } from "@mui/material";
import {
  CustomPagination,
  CustomTable,
  NoData,
  TableSkeleton,
} from "../../ComponentsV2";
import useLivestockContext from "../../hooks/useLivestockContext";
import { showLivestockTableHeadData } from "./Data";
import { useEffect } from "react";

const ShowLivestocks = ({ show }) => {
  const {
    allLivestocks,
    livestockDataLength,
    livestockPagination,
    setLivestockPagination,
    paginationSafe,
    setPaginationSafe,
    paginationUnsafe,
    setPaginationUnsafe,
    addNewLivestockLoading,
    getAllLivestock,
    openBackdropLoader,
  } = useLivestockContext();

  const activePag = (status) => {
    const label = status?.toString()?.toLowerCase();
    if (label === "safe")
      return { get: paginationSafe, set: setPaginationSafe };
    else if (label === "unsafe")
      return { get: paginationUnsafe, set: setPaginationUnsafe };
    else return { get: livestockPagination, set: setLivestockPagination };
  };
  useEffect(() => {
    getAllLivestock(show);
  }, [addNewLivestockLoading, activePag(show).get]);

  const livestockFiltering = () => {
    return allLivestocks?.map((el) => ({ ...el, status: null }));
  };
  return (
    <Box my={4}>
      {openBackdropLoader ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(7).fill("12%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <CustomTable
          headBackgroundColor="#B58B5D"
          tableHeadData={showLivestockTableHeadData}
          tableRowData={livestockFiltering()}
        />
      )}

      {!openBackdropLoader && livestockFiltering()?.length ? (
        livestockDataLength > 10 && (
          <Stack direction="row" justifyContent="center" p={2}>
            <CustomPagination
              size="large"
              page={activePag(show).get}
              count={Math.ceil(livestockDataLength / 10)}
              onPageChange={(pageNo) => activePag(show).set(pageNo)}
            />
          </Stack>
        )
      ) : openBackdropLoader ? (
        <Stack sx={{ pt: 10 }}>
          <NoData />
        </Stack>
      ) : null}
    </Box>
  );
};

export default ShowLivestocks;
