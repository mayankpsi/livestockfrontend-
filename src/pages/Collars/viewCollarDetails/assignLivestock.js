import { Box, Stack } from "@mui/material";
import { AddBtn, CustomModal } from "../../../ComponentsV2";
import ShowLivestocks from "./showLivestocks";
import LivestockInfo from "./livestockInfo";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { request } from "../../../apis/axios-utils";
import useUserId from "../../../hooks/useUserId";
import { useEffect } from "react";
import { useState } from "react";
import useCollarContext from "../../../hooks/useCollarContext";

const AssignLivestock = ({ data }) => {
  const [allUnassignLivestocks, setAllUnassignLivestocks] = useState([]);
  const { userId } = useUserId();
  const { openAddLiveStockModal, setOpenAddLivestockModal } =
    useLivestockContext();
  const {openSnackbarAlert} = useCollarContext()

  useEffect(() => {
    if (!data?.Uid) {
      getUnassignLivestock();
    }
  }, [data]);

  const handelLivestockRemove = async (collarId, livestockId) => {
     const body = {
      liveStockID: livestockId,
      deviceID:collarId,
     }
    try {
      const res = await request({
        url: `/devices/unassign-liveStock`,
        method: "POST",
        data:body
      });
      if (res.status === 200) {
        openSnackbarAlert("success","Livestock successfully removed :)");
        setTimeout(()=> window.location.reload(),1500);
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      openSnackbarAlert("error",err?.message?err.message:"Something went wrong :(")
    }
  };
  const getUnassignLivestock = async () => {
    try {
      const res = await request({
        url: `/liveStock/getAll?status=false&userID=${userId}`,
      });
      if (res.status === 200) {
        setAllUnassignLivestocks(res.data.data);
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  
  const handelLivestockAssign = async (selectedValue) => {
    const body = {
      liveStockID:selectedValue,
      deviceID:data?.collarId
    }
    try {
      const res = await request({
        url: `/devices/assign-liveStock`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        openSnackbarAlert("success","Livestock successfully Added :)");
        setTimeout(()=> window.location.reload(),1500)
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      openSnackbarAlert("error",err?.message?err.message:"Something went wrong :(")
    }
    setOpenAddLivestockModal(false)
  };


  return (
    <Box py={4}>
      <Stack sx={{ width: { lg: "55%", md: "100%" } }}>
        {data?.Uid ? (
          <LivestockInfo
            data={data}
            btnText="remove"
            btnBgColor="#FF0505"
            onBtnClick={handelLivestockRemove}
          />
        ) : (
          <AddBtn onClick={() => setOpenAddLivestockModal(true)} />
        )}
      </Stack>
      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignLivestocks}
            onSubmit={(selectedValue) => handelLivestockAssign(selectedValue)}
            setOpenAddLivestockModal={setOpenAddLivestockModal}
            isLivestock={true}
          />
        }
        openModal={openAddLiveStockModal}
        handleClose={() => setOpenAddLivestockModal(false)}
      />
    </Box>
  );
};

export default AssignLivestock;
