import { CustomTable, NoData } from "../../ComponentsV2";
import { Box } from "@mui/material";
import useCollarContext from "../../hooks/useCollarContext";
import { showCollarTableHeadData } from "./Data";

const ShowCollars = ({ show }) => {
  const { collars } = useCollarContext();

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
      {
        !collarFiltering()?.length?<NoData/>:null
      }
      
    </Box>
  );
};

export default ShowCollars;
