import { CustomPagination, CustomTable, NoData } from "../../ComponentsV2";
import { Box, Stack } from "@mui/material";
import useCollarContext from "../../hooks/useCollarContext";
import { showCollarTableHeadData } from "./Data";
import { useEffect } from "react";

const ShowCollars = ({ show }) => {
  const {
    getAllDevices,
    collars,
    deviceDataLength,
    activeDevice,
    isLoading,
    paginationPageNo,
    setPaginationPageNo,
    paginationPageAssigned,
    setPaginationPageAssigned,
    paginationPageNotAssigned,
    setPaginationPageNotAssigned,
  } = useCollarContext();

  const activePag = (status) => {
    const label = status?.toString()?.toLowerCase();
    if (label === "all")
      return { get: paginationPageNo, set: setPaginationPageNo };
    else if (label === "true")
      return { get: paginationPageAssigned, set: setPaginationPageAssigned };
    else if (label === "false")
      return {
        get: paginationPageNotAssigned,
        set: setPaginationPageNotAssigned,
      };
    else return { get: paginationPageNo, set: setPaginationPageNo };
  };

  useEffect(() => {
    getAllDevices(show);
  }, [isLoading, activeDevice, activePag(show).get]);

  const collarFiltering = () => {
    return collars?.map((el) => ({ ...el, status: null }));
  };

  return (
    <Box my={4}>
      <CustomTable
        headBackgroundColor="#B58B5D"
        tableHeadData={showCollarTableHeadData}
        tableRowData={collarFiltering()}
      />
      {collarFiltering()?.length ? (
        deviceDataLength > 10 && (
          <Stack direction="row" justifyContent="center" p={2}>
            <CustomPagination
              size="large"
              page={activePag(show)?.get}
              count={Math.ceil(deviceDataLength / 10)}
              onPageChange={(pageNo) => activePag(show)?.set(pageNo)}
            />
          </Stack>
        )
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default ShowCollars;
