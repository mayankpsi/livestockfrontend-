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
import { TypographyPrimary, ButtonPrimary } from "./themeComponents";
import CustomDateRangePicker from "./dateRangePicker";

export default function TableV2({
  paneText,
  paneTextColor,
  isBtn,
  btnText,
  btnColor,
  btnBg,
  datePicker,
  tableHeadData,
  tableRowData,
  tableColors,
  onBtnClick,
  selectedDate, setSelectedDate
}) {

  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #dddddd" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={1.5}
      >
        <TypographyPrimary
          sx={{
            textTransform: "capitalize",
            color: paneTextColor,
            fontSize: "2rem",
          }}
        >
          {paneText}
        </TypographyPrimary>
        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
          {!datePicker ? (
            <Stack
              direction="row"
              justifyContent="flex-end"
              height="37px"
              gap={1}
              width="100%"
            >
              <CustomDateRangePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </Stack>
          ) : null}
          {!isBtn && (
            <ButtonPrimary
              sx={{
                fontSize: "1.2rem",
                padding: "5px 15px",
                color: btnColor,
                background: btnBg,
              }}
              onClick={onBtnClick}
            >
              {btnText}
            </ButtonPrimary>
          )}
        </Box>
      </Stack>
      {/* <Table sx={{ minWidth: 650 }} size="large" aria-label="a dense table"> */}
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
                          : index % 2 === 0
                          ? tableColors[0]
                          : tableColors[1]
                      }`,
                      fontSize: "1.5rem",
                    }}
                  >
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
