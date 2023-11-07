import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Stack,
} from "@mui/material";

export default function TableV2({
  tableHeadData,
  tableRowData,
  tableColors,
}) {

  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #dddddd" }}>
      <Table size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableHeadData &&
              tableHeadData
                ?.map((col, ind) => (
                  <TableCell
                    key={col}
                    align={ind === 0 ? "" : "right"}
                    sx={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      color: "#B0B0B0",
                      fontSize: "1.3rem",
                    }}
                  >
                    {col}
                  </TableCell>
                ))
                .filter((count) => count != 0)}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRowData?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.values(row)
                ?.filter((el) => el !== null && !el?.toString()?.includes("id"))
                ?.map((ele, ind) => (
                  <TableCell
                    component={ind === 0 ? "th" : ""}
                    scope={ind === 0 ? "row" : ""}
                    align={ind === 0 ? "" : "right"}
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: `${
                        tableColors === undefined
                          ? null
                          : ele.toLowerCase().includes("pm") ||
                            ele.toLowerCase().includes("am")
                          ? null
                          : row?.title?.toLowerCase() === "safe"
                          ? tableColors[0]
                          : tableColors[1]
                      }`,
                      fontSize: "1.5rem",
                    }}
                  >
                    {console.log(row,"dhxbhvcgdvgdvcgvdh")}
                    {!Array.isArray(ele) ? (
                      ele
                    ) : (
                      <Box>
                        {ele?.map((btn) => (
                          <IconButton aria-label="delete">{btn}</IconButton>
                        ))}
                      </Box>
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
