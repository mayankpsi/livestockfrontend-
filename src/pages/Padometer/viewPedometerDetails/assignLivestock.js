import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { AddBtn, CustomModal } from "../../../ComponentsV2";
import ShowLivestocks from "./showLivestocks";
import LivestockInfo from "./livestockInfo";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { request } from "../../../apis/axios-utils";
import useCollarContext from "../../../hooks/useCollarContext";
import useErrorMessage from "../../../hooks/useErrorMessage";
import { useParams } from "react-router-dom";

const AssignLivestock = ({ data, setLoading, loading }) => {
  const { getErrorMessage } = useErrorMessage();
  const [allUnassignLivestocks, setAllUnassignLivestocks] = useState({
    livestockData: [],
    dataLength: 0,
  });
  const [unassignLivestockPagination, setUnassignLivestockPagination] =
    useState(1);
  const [isInputChange, setIsInputChange] = useState(false);
  const [query, setQuery] = useState("");
  const {
    openAddLiveStockModal,
    setOpenAddLivestockModal,
    setOpenBackdropLoader,
  } = useLivestockContext();
  const { openSnackbarAlert, getAllDevices } = useCollarContext();
  const { id } = useParams();

  const getDeviceData = () => {
    request({ url: `/devices/getDeviceByID?deviceID=${id}` });
  };

  useEffect(() => {
    if (query || isInputChange) {
      const timeout = setTimeout(() => getUnassignLivestock(query), 1000);
      return () => clearTimeout(timeout);
    }
  }, [query]);

  const handelLivestockRemove = async (collarId, livestockId) => {
    setLoading(true);
    setOpenBackdropLoader(true);
    const body = {
      liveStockID: livestockId,
      deviceID: collarId,
    };
    try {
      const res = await request({
        url: `/devices/unassign-liveStock?unassignType=pedometer`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Livestock successfully removed :)");
        getDeviceData();
        getAllDevices();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const getUnassignLivestock = async (searchTerm = "", page = 1) => {
    setOpenBackdropLoader(true);
    setLoading(true);
    try {
      const res = await request({
        url: `/liveStock/getAll?status=false&deviceType=pedometer&searchTerm=${searchTerm}&page=${page}&limit=${10}`,
      });
      if (res.status === 200) {
        const { liveStockData, dataLength } = res?.data?.data;
        setOpenBackdropLoader(false);
        setAllUnassignLivestocks({
          livestockData: liveStockData,
          dataLength: dataLength,
        });
        setOpenAddLivestockModal(true);
      } else {
        setAllUnassignLivestocks({
          livestockData: [],
          dataLength: 0,
        });
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handelLivestockAssign = async (selectedValue) => {
    setLoading(true);
    setOpenAddLivestockModal(false);
    const body = {
      liveStockID: selectedValue,
      deviceID: data?.collarId,
    };
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/devices/assign-liveStock?assignType=pedometer`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Livestock successfully Added :)");
        getDeviceData();
        getAllDevices();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box py={4}>
      {data?.Uid ? (
        <Stack sx={{ width: { lg: "55%", md: "100%" } }}>
          <LivestockInfo
            data={data}
            loading={loading}
            btnText="remove"
            btnBgColor="#FF0505"
            onBtnClick={handelLivestockRemove}
          />
        </Stack>
      ) : (
        <AddBtn
          text1="livestock"
          text2="pedometer"
          loading={!openAddLiveStockModal && loading}
          onClick={() => getUnassignLivestock()}
        />
      )}
      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignLivestocks?.livestockData}
            dataLength={allUnassignLivestocks?.dataLength}
            pagination={unassignLivestockPagination}
            setPagination={(page) => {
              setUnassignLivestockPagination(page);
              getUnassignLivestock(query, page);
            }}
            onSubmit={(selectedValue) => handelLivestockAssign(selectedValue)}
            setOpenAddLivestockModal={setOpenAddLivestockModal}
            loading={loading}
            openSnackbarAlert={() =>
              openSnackbarAlert("error", "Please choose a livestock to assign")
            }
            onSearch={(term) => {
              setQuery(term);
              setIsInputChange(true);
            }}
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
