import { Box, Stack } from "@mui/material";
import { AddBtn, CustomModal, Skeleton, Spinner } from "../../../ComponentsV2";
import ShowLivestocks from "./showLivestocks";
import LivestockInfo from "./livestockInfo";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { request } from "../../../apis/axios-utils";
import { useEffect, useState } from "react";
import useCollarContext from "../../../hooks/useCollarContext";
import useErrorMessage from "../../../hooks/useErrorMessage";

const AssignLivestock = ({ data, loading, setLoading }) => {
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
  const {
    openSnackbarAlert,
    getAllDevices,
    openBackdropLoader: firstLoadingLoader,
  } = useCollarContext();

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
        url: `/devices/unassign-liveStock?unassignType=collar`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Livestock successfully removed :)");
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
        url: `/liveStock/getAll?status=false&deviceType=collar&searchTerm=${searchTerm}&page=${page}&limit=${10}`,
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
      openSnackbarAlert("error", error.message);
    } finally {
      setOpenBackdropLoader(false);
      setLoading(false);
    }
  };

  const handelLivestockAssign = async (selectedValue) => {
    setOpenAddLivestockModal(false);
    setOpenBackdropLoader(true);
    setLoading(true);
    const body = {
      liveStockID: selectedValue,
      deviceID: data?.collarId,
    };
    try {
      const res = await request({
        url: `/devices/assign-liveStock?assignType=collar`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Livestock successfully Added :)");
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
      {!firstLoadingLoader ? (
        data?.Uid ? (
          <Stack sx={{ width: { lg: "55%", md: "100%" } }}>
            <LivestockInfo
              data={data}
              btnText="remove"
              btnBgColor="#FF0505"
              loading={loading}
              btnIcon={
                loading ? (
                  <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
                ) : null
              }
              onBtnClick={handelLivestockRemove}
            />
          </Stack>
        ) : (
          <Stack direction={"row"} gap={4} py={4}>
            <AddBtn
              text1="livestock"
              text2="collar"
              loading={!openAddLiveStockModal && loading}
              onClick={() => getUnassignLivestock()}
            />
          </Stack>
        )
      ) : (
        <Skeleton width="43vw" height="60vh" sx={{ background: "#F7F8FD" }} />
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
            onSubmit={handelLivestockAssign}
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
