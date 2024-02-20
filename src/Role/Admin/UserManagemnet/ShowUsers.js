import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import {
  ConfirmWindowModalContent,
  CustomModal,
  CustomPagination,
  CustomTable,
  NoData,
  TableSkeleton,
} from "../../../ComponentsV2";
import useGetAllUsers from "./hooks/useGetAllUsers";
import toast from "react-hot-toast";
import useDeleteUser from "./hooks/useDeleteUser";

const userHeadings = [
  "username",
  "email",
  "collars",
  "pedometers",
  "livestock",
  "actions",
];

const ShowUsers = () => {
  const [pagination, setPagination] = useState(1);
  const [showModal, setShowModal] = useState();
  const [deleteUserId, setDeleteUserId] = useState(null);
  const { isLoading, error, data, dataLength } = useGetAllUsers(
    pagination,
    handleDeleteUser
  );

  const { isDeleting, deleteUser } = useDeleteUser();

  if (error) {
    toast.error("ERROR " + error?.message);
  }

  function handleDeleteUser(userId) {
    setDeleteUserId(userId);
    setShowModal(true);
  }

  const handleUserDeleteConfirm = () => {
    deleteUser(deleteUserId, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          setShowModal(false);
        }
      },
    });
  };
  return (
    <Box my={4}>
      {isLoading ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(7).fill("12%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <CustomTable
          headBackgroundColor="#B58B5D"
          tableHeadData={userHeadings}
          tableRowData={data}
        />
      )}
      {dataLength > 10 && !isLoading ? (
        <Stack direction="row" justifyContent="center" p={2}>
          <CustomPagination
            size="large"
            page={pagination}
            count={Math.ceil(dataLength / 10)}
            onPageChange={(pageNo) => setPagination(pageNo)}
          />
        </Stack>
      ) : null}

      {!dataLength && !isLoading ? (
        <Stack sx={{ pt: 10 }}>
          <NoData />
        </Stack>
      ) : null}
      <CustomModal
        content={
          <ConfirmWindowModalContent
            loading={isDeleting}
            onCancel={() => {
              setShowModal(false);
              setDeleteUserId(null);
            }}
            onConfirm={handleUserDeleteConfirm}
            showConfirmBtn={true}
          />
        }
        openModal={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      />
    </Box>
  );
};

export default ShowUsers;
