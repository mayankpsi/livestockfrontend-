import { useState, useEffect } from "react";
import { Stack, Box, TextField, MenuItem } from "@mui/material";
import { TabPane } from "../../../ComponentsV2";
import { Cow } from "../../../assets";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addLivestockValidationSchema } from "../../../utils/validationSchema";
import { request } from "../../../apis/axios-utils";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { genderData } from "../../Data";

const LivestockInfo = ({ data, btnText, btnBgColor, onBtnClick }) => {
  const { openSnackbarAlert, setIsError, isError } = useLivestockContext();
  const [isEditLivestockInfo, setIsEditLivestockInfo] = useState(true);
  const [LivestockInfoEdit, setLivestockInfoEdit] = useState({
    collarUID: "",
    livestockUID: "",
    livestockName: "",
    livestockGender: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addLivestockValidationSchema) });

  useEffect(() => {
    setLivestockInfoEdit({
      collarUID: data?.collarUid,
      livestockUID: data?.Uid,
      livestockName: data?.name,
      livestockGender: data?.gender,
    });
    if (data) {
      setValue("collarUID", data?.collarUid);
      setValue("livestockUID", data?.Uid || "");
      setValue("livestockName", data?.name || "");
      setValue("livestockGender", data?.gender || "");
    }
  }, [data]);

  const handleLivestockInfoEditChange = (e) => {
    const { name, value } = e.target;
    setLivestockInfoEdit({ ...LivestockInfoEdit, [name]: value });
  };

  const handelLivestockNewInfoSubmit = async () => {
    if (onBtnClick) {
      onBtnClick(data?.collarId, data?.livestockId);
    } else {
      setIsEditLivestockInfo(false);
      if (!isEditLivestockInfo) {
        const body = {
          id: data?.id,
          uID: LivestockInfoEdit?.livestockUID,
          name: LivestockInfoEdit?.livestockName,
          gender: LivestockInfoEdit?.livestockGender,
          imageChanges: false,
        };
        try {
          const res = await request({
            url: `/liveStock/update`,
            method: "POST",
            data: body,
          });
          if (res?.status === 200) {
            openSnackbarAlert("success", "Livestock successfully updated!");
            setIsError({
              error: false,
              message: null,
            });
            setIsEditLivestockInfo(true);
          } else if (res?.response?.data?.statusCode === 409) {
            setIsError({
              error: true,
              message: res?.response?.data?.message,
            });
          } else {
            throw new Error("something went wrong");
          }
        } catch (err) {
          setIsEditLivestockInfo(true);
          openSnackbarAlert("error", err.message);
        }
      }
    }
  };

  const getTextFiled = (
    disable,
    label,
    name,
    value,
    onChange,
    select,
    selectData,
    isError
  ) => {
    return (
      <TextField
        sx={{ mr: 1 }}
        fullWidth
        disabled={disable}
        select={select}
        id={name}
        label={label}
        variant="outlined"
        size="large"
        value={value}
        name={name}
        {...register(name, { required: true })}
        onChange={onChange}
        error={errors?.[name] ? true : false || isError?.error}
        helperText={errors?.[name]?.message || isError?.message}
      >
        {select &&
          selectData?.map((option) => (
            <MenuItem key={option?.id} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
      </TextField>
    );
  };
  return (
    <form onSubmit={handleSubmit(handelLivestockNewInfoSubmit)}>
      <Stack
        sx={{
          background: "#F7F8FD",
          p: 2,
          pb: 4,
          borderRadius: "10px",
        }}
        gap={3}
      >
        <TabPane
          text="Livestock Information"
          btnText={btnText ? btnText : isEditLivestockInfo ? "Edit" : "Save"}
          btnIcon={false}
          hover={true}
          btnBgColor={btnBgColor}
          type="submit"
        />
        <Box
          component="img"
          sx={{
            height: "33vh",
            width: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          alt="The house from the offer."
          src={Cow}
        />
        <Stack direction="row" gap={2}>
          {getTextFiled(
            true,
            "Collar UID",
            "collarUID",
            LivestockInfoEdit?.collarUID,
            () => {}
          )}
          {getTextFiled(
            isEditLivestockInfo,
            "Livestock UID",
            "livestockUID",
            LivestockInfoEdit?.livestockUID,
            handleLivestockInfoEditChange,
            null,
            null,
            isError
          )}
        </Stack>
        <Stack direction="row" gap={2}>
          {getTextFiled(
            isEditLivestockInfo,
            "Livestock Name",
            "livestockName",
            LivestockInfoEdit?.livestockName,
            handleLivestockInfoEditChange
          )}
          {getTextFiled(
            isEditLivestockInfo,
            "Gender",
            "livestockGender",
            LivestockInfoEdit?.livestockGender,
            handleLivestockInfoEditChange,
            true,
            genderData
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default LivestockInfo;
