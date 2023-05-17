import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Grid } from "@mui/material";
import NoAlert from "../../assets/images/NoAlert.png";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    // fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 1,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const head = [
  { name: "UID" },
  { name: "Name" },
  { name: "BM" },
  { name: "Action" },
];

export default function CustomizedTables({ head, data }) {
  // console.log("Data In the table", data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {head?.map((item, i) => {
              return (
                <StyledTableCell
                  key={i}
                  align="left"
                  className="fs16px fontWeight600  g_color  THead_bgcolor"
                >
                  {item.name}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        {/* <Grid><img src={NoAlert} alt="loading" /> </Grid>    */}
        <TableBody>
          {data?.map((row, i) => {
            return (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {row.gatewayID}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.gatewayName}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.BranchManager?.length}
                </StyledTableCell>

                <StyledTableCell align="left"> </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
