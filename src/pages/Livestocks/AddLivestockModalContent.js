import { Box, Stack } from "@mui/material";
import { CustomInput, ImageUpload } from "../../ComponentsV2";
import useLivestockContext from "../../hooks/useLivestockContext";
import { AddCircleOutlineOutlinedIcon } from "../../icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ButtonPrimaryRound,
  ButtonOutlinedRound,
  LoadingBtn,
  TypographyWithBg,
} from "../../ComponentsV2/themeComponents";
import { useForm } from "react-hook-form";
import { request } from "../../apis/axios-utils";
import { useState } from "react";
import { useEffect } from "react";
import { addLivestockValidationSchema } from "../../utils/validationSchema";
import { genderData } from "../Data";

const AddLivestockModalContent = () => {
  const {
    handleAddLivestockModalClose,
    addNewLivestock,
    handleAddLivestockChange,
    addNewLivestockLoading,
    handleAddLivestock,
    setLiveStockImage,
    isError,
  } = useLivestockContext();

  const [unassignCollars, setUnassignCollars] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addLivestockValidationSchema) });

  const getUnassignCollars = async () => {
    try {
      const res = await request({
        url: `/devices/getAll?status=false`,
      });
      if (res?.data?.statusCode === 200 && res?.data?.data) {
        const formattedData = res.data.data.map((ele) => ({
          id: ele?._id,
          label: ele?.uID,
          value: ele?._id,
          deviceType: ele?.deviceType,
        }));
        setUnassignCollars(formattedData);
      }
    } catch (error) {
      // alert(error.message)
    }
  };

  useEffect(() => {
    getUnassignCollars();
  }, []);

  const getDeviceFilteredData = (data, filter) => {
    return data?.filter(
      (ele) => ele?.deviceType?.toLowerCase() === filter?.toLowerCase()
    );
  };

  const getOneIsSelectedError = (error) => {
    const err = Object.values(error)?.find(
      (ele) => ele?.type === "one-is-selected"
    );
    if (err?.message) {
      return { error: true, message: err?.message };
    } else return { error: false, message: "" };
  };
  return (
    <form onSubmit={handleSubmit(handleAddLivestock)}>
      <Box>
        <TypographyWithBg id="modal-modal-title" variant="h6" component="h2">
          Add Livestock
        </TypographyWithBg>
        <Stack>
          <ImageUpload onUpload={setLiveStockImage} />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <CustomInput
              label="Collar"
              select
              selectData={getDeviceFilteredData(unassignCollars, "collar")}
              register={register}
              errors={errors}
              value={addNewLivestock?.collarUID}
              selectNoDataMsg="Please create/unassign a collar first"
              name="collarUID"
              isError={getOneIsSelectedError(errors)}
              onChange={handleAddLivestockChange}
            />
            <CustomInput
              label="Pedometer"
              select
              selectData={getDeviceFilteredData(unassignCollars, "pedometer")}
              register={register}
              errors={errors}
              value={addNewLivestock?.pedometerUID}
              name="pedometerUID"
              isError={getOneIsSelectedError(errors)}
              onChange={handleAddLivestockChange}
            />
            {/* <CustomInput
              label="Gender"
              select
              selectData={genderData}
              register={register}
              errors={errors}
              value={addNewLivestock?.livestockGender}
              name="livestockGender"
              isError={{ error: false, message: "" }}
              onChange={handleAddLivestockChange}
            /> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <CustomInput
              label="Livestock UID"
              register={register}
              errors={errors}
              value={addNewLivestock?.livestockUID}
              name="livestockUID"
              isError={isError}
              onChange={handleAddLivestockChange}
            />
            <CustomInput
              label="Livestock Name"
              register={register}
              errors={errors}
              value={addNewLivestock?.livestockName}
              name="livestockName"
              isError={{ error: false, message: "" }}
              onChange={handleAddLivestockChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "right",
              p: 2,
            }}
          >
            <ButtonOutlinedRound
              variant="outlined"
              size="large"
              onClick={handleAddLivestockModalClose}
            >
              Cancel
            </ButtonOutlinedRound>
            {addNewLivestockLoading ? (
              <LoadingBtn
                loading
                type="submit"
                variant="contained"
                size="large"
              >
                Save
              </LoadingBtn>
            ) : (
              <ButtonPrimaryRound
                variant="contained"
                size="large"
                type="submit"
              >
                Save
              </ButtonPrimaryRound>
            )}
          </Box>
        </Stack>
      </Box>
    </form>
  );
};

export default AddLivestockModalContent;
