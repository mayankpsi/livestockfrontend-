import { Box, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  ParameterCard,
  TableV2,
  MonthPicker,
  CustomModal,
  ConfirmWindowModalContent,
  CustomPagination,
  NoData,
  TableSkeleton,
  Skeleton,
} from "../../../../ComponentsV2";
import toast from "react-hot-toast";
import useGetMilkOverviewData from "./hooks/useGetMilkOverviewData";
import { useParams } from "react-router-dom";
import { ButtonPrimary } from "../../../../ComponentsV2/themeComponents";
import { milkOverviewCardData, milkOverviewTableHeaders } from "./Data";
import {
  DeleteOutlineOutlinedIcon,
  VisibilityOutlinedIcon,
} from "../../../../icons";
import AddNewMilkEntry from "./AddNewMilkEntry";
import useDateFormat from "../../../../hooks/useDateFormat";
import dayjs from "dayjs";
import useDeleteMilkEntry from "./hooks/useDeleteMilkEntry";

const milkRecordData = (data, formattedDate, handleModalOpen) => {
  return data?.map((ele) => ({
    milkEntry: formattedDate(ele?.entryDate, "date")?.split("/")?.[0],
    entryDate: formattedDate(ele?.entryDate, "date"),
    quantity: `${ele?.entryQuantity} Ltr`,
    actions: [
      <IconButton onClick={() => handleModalOpen("view", ele)}>
        <VisibilityOutlinedIcon fontSize="large" />
      </IconButton>,
      <IconButton onClick={() => handleModalOpen("delete", ele)}>
        <DeleteOutlineOutlinedIcon fontSize="large" />
      </IconButton>,
      ,
    ],
  }));
};

const MilkOverview = () => {
  const [pagination, setPagination] = useState(1);
  const [contentType, setContentType] = useState(null);
  const [selectedMilkEntry, setSelectedMilkEntry] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const [month, setMonth] = useState(null);
  const { formattedDate } = useDateFormat();
  const { isLoading, data, error } = useGetMilkOverviewData(
    id,
    pagination,
    month
  );
  const { isDeleting, deleteMilkEntry } = useDeleteMilkEntry();

  const handleModalClose = () => {
    setOpenModal(false);
  };

  if (error) {
    toast.error(error.message);
  }

  const handleModalOpen = (type, ele) => {
    setSelectedMilkEntry(ele);
    setContentType(type);
    setOpenModal(true);
  };

  const handleDeleteEntry = () => {
    deleteMilkEntry(selectedMilkEntry?._id, {
      onSuccess: (data) => {
        if (data.status === 200) {
          handleModalClose();
        }
      },
    });
  };
  const getModalContent = (type) => {
    if (type === "add") return <AddNewMilkEntry onClose={handleModalClose} />;
    else if (type === "view")
      return (
        <AddNewMilkEntry
          onClose={handleModalClose}
          isView={true}
          data={selectedMilkEntry}
        />
      );
    else
      return (
        <ConfirmWindowModalContent
          showConfirmBtn={true}
          loading={isDeleting}
          onCancel={handleModalClose}
          onConfirm={handleDeleteEntry}
        />
      );
  };

  const text = `Showing ${(data?.dataLength > 32 ? 30 : data?.dataLength) || 0} out of ${
    data?.dataLength || 0
  } Milk entries`;

  return (
    <Stack width={"100%"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
          {text}
        </Typography>
        <Box display={"flex"} gap={2}>
          <MonthPicker value={month || dayjs(new Date())} setValue={setMonth} />
          <ButtonPrimary sx={{ my: 0 }} onClick={() => handleModalOpen("add")}>
            Add New Entry
          </ButtonPrimary>
        </Box>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        flexWrap={"wrap"}
        sx={{ py: 2, gap:{lg:2, md:2, sm:1} }}
      >
        {isLoading ? (
          <>
            <Skeleton width={"24%"} height={"10vh"} />
            <Skeleton width={"24%"} height={"10vh"} />
            <Skeleton width={"24%"} height={"10vh"} />
            <Skeleton width={"24%"} height={"10vh"} />
          </>
        ) : (
          milkOverviewCardData?.map((ele) => (
            <ParameterCard
              label={ele.label}
              value={data?.overviewData[ele.key] || "0"}
              icon={ele.icon}
              colors={ele.colors}
              suffix={""}
            />
          ))
        )}
      </Stack>
      {isLoading ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(4).fill("20%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <Box mt={2}>
          <TableV2
            btnColor="#fff"
            btnBg="#B58B5D"
            tableHeadData={milkOverviewTableHeaders}
            tableRowData={milkRecordData(
              data?.milkRecordsData,
              formattedDate,
              handleModalOpen
            )}
          />
        </Box>
      )}

      {data?.dataLength
        ? data?.dataLength > 32 && (
            <Stack direction="row" justifyContent="center" p={2}>
              <CustomPagination
                size="large"
                page={pagination}
                count={Math.ceil(data?.dataLength / 10)}
                onPageChange={(pageNo) => setPagination(pageNo)}
              />
            </Stack>
          )
        : !isLoading && <NoData />}
      <CustomModal
        content={getModalContent(contentType)}
        openModal={openModal}
        customWidth={contentType !== "delete" ? "50%" : "35%"}
        handleClose={() => (contentType !== "add" ? handleModalClose() : null)}
      />
    </Stack>
  );
};

export default MilkOverview;
