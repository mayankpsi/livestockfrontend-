import { Box, Stack } from "@mui/material";
import { CustomInput } from "../../ComponentsV2";
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
          id: ele._id,
          label: ele.uID,
          value: ele._id,
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

  return (
    <form onSubmit={handleSubmit(handleAddLivestock)}>
      <Box>
        <TypographyWithBg id="modal-modal-title" variant="h6" component="h2">
          Add Livestock
        </TypographyWithBg>
        <Stack>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              border: "1px solid #8F8F8F",
              minHeight: "30vh",
              m: 2,
              borderRadius: "10px",
            }}
          >
            <AddCircleOutlineOutlinedIcon
              sx={{ color: "#8F8F8F", fontSize: 150 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <CustomInput
              label="Collar UID"
              select
              selectData={unassignCollars}
              register={register}
              errors={errors}
              value={addNewLivestock?.collarUID}
              selectNoDataMsg="Please create/unassign a collar first"
              name="collarUID"
              isError={{ error: false, message: "" }}
              onChange={handleAddLivestockChange}
            />
            <CustomInput
              label="Livestock UID"
              register={register}
              errors={errors}
              value={addNewLivestock?.livestockUID}
              name="livestockUID"
              isError={isError}
              onChange={handleAddLivestockChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <CustomInput
              label="Livestock Name"
              register={register}
              errors={errors}
              value={addNewLivestock?.livestockName}
              name="livestockName"
              isError={{ error: false, message: "" }}
              onChange={handleAddLivestockChange}
            />
            <CustomInput
              label="Gender"
              select
              selectData={genderData}
              register={register}
              errors={errors}
              value={addNewLivestock?.livestockGender}
              name="livestockGender"
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
