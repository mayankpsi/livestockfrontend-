import { CustomPagination, CustomTable, NoData } from "../../ComponentsV2";
import { Box, Stack } from "@mui/material";
import useCollarContext from "../../hooks/useCollarContext";
import { showCollarTableHeadData } from "./Data";

const ShowCollars = ({ show }) => {
  const { collars, deviceDataLength, paginationPageNo, setPaginationPageNo } =
    useCollarContext();

  const collarFiltering = () => {
    let filteredCollars;
    if (show === "all") {
      filteredCollars = collars;
    } else {
      filteredCollars = collars?.filter((collar) => collar?.status === show);
    }
    return filteredCollars?.map((el) => ({ ...el, status: null }));
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
              page={paginationPageNo}
              count={Math.ceil(deviceDataLength / 10)}
              onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
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
