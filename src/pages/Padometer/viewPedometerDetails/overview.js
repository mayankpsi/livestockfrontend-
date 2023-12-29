import { Box, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { TabPane, CustomInput, StatusCard } from "../../../ComponentsV2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { request } from "../../../apis/axios-utils";
import { addCollarValidationSchema } from "../../../utils/validationSchema";
import useCollarContext from "../../../hooks/useCollarContext";
import { pedometerStatusCardData } from "../Data";
import useGetCamelCase from "../../../hooks/useGetCamelCase";
import useErrorMessage from "../../../hooks/useErrorMessage";

const Overview = ({ data }) => {
  const [isEditCollarInfo, setIsEditCollarInfo] = useState(false);
  const [collarInfoEdit, setCollarInfoEdit] = useState({
    collarUID: "",
    collarName: "",
    collarMacId: "",
  });
  const {getErrorMessage} = useErrorMessage();

  const { isError, setIsError, openSnackbarAlert } = useCollarContext();
  const {getCamelCase} = useGetCamelCase()

  useEffect(() => {
    setCollarInfoEdit({
      collarUID: data?.collarUid,
      collarName: data?.collarName,
      collarMacId: data?.collarMacId,
    });
    setValue("collarUID", data?.collarUid || "");
    setValue("collarName", data?.collarName || "");
    setValue("collarMacId", data?.collarMacId || "");
  }, [data]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addCollarValidationSchema) });

  const handleCollarInfoEditChange = (e) => {
    const { name, value } = e.target;
    setCollarInfoEdit({ ...collarInfoEdit, [name]: value });
  };

  const handelCollarNewInfo = async () => {
    setIsEditCollarInfo(true);
    if (isEditCollarInfo) {
      const body = {
        deviceName: collarInfoEdit?.collarName,
        uID: collarInfoEdit?.collarUID,
        macID: collarInfoEdit?.collarMacId,
      };
      try {
        const editRes = await request({
          url: `/devices/update?deviceID=${data.collarId}`,
          method: "PATCH",
          data: body,
        });
        if (editRes.status === 200) {
          openSnackbarAlert("success", "Collar successfully edited :)");
          setIsEditCollarInfo(false);
          setIsError({
            error: false,
            message: null,
          });
        } else if (editRes?.response?.data?.statusCode === 409) {
          setIsError({
            error: true,
            message: editRes?.response?.data?.message,
          });
        } else {
          throw new Error(getErrorMessage(editRes));
        }
      } catch (err) {
        openSnackbarAlert("error", err.message);
        setIsEditCollarInfo(false);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handelCollarNewInfo)}>
      <Stack my={4} direction="row" justifyContent="space-between">
        <Stack
          sx={{
            width: "55%",
            background: "#F7F8FD",
            p: 2,
            borderRadius: "10px",
          }}
        >
          <Box px={1.5}>
            <TabPane
              text="Pedometer Information"
              btnText={isEditCollarInfo ? "Save" : "Edit"}
              btnIcon={false}
              hover={true}
              type="submit"
            />
          </Box>
          <Stack>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <CustomInput
                disabled={!isEditCollarInfo}
                label="pedometer UID"
                register={register}
                errors={errors}
                value={collarInfoEdit?.collarUID}
                name="pedometerUID"
                isError={isError}
                onChange={handleCollarInfoEditChange}
              />
              <CustomInput
                disabled={!isEditCollarInfo}
                label="pedometer name"
                register={register}
                errors={errors}
                value={collarInfoEdit?.collarName}
                name="pedometerName"
                onChange={handleCollarInfoEditChange}
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
                disabled={!isEditCollarInfo}
                label="pedometer MAC ID"
                register={register}
                errors={errors}
                value={collarInfoEdit?.collarMacId}
                name="pedometerMacId"
                onChange={handleCollarInfoEditChange}
              />
            </Box>
          </Stack>
        </Stack>
        <Box
          sx={{
            width: "43%",
            background: "#F7F8FD",
            p: 2,
            borderRadius: "10px",
            justifyContent: "space-evenly",
          }}
        >
          <TypographyPrimary>Pedometer status</TypographyPrimary>
          <Stack direction="column" gap={2}>
            {pedometerStatusCardData?.map((ele) => ({
                ...ele,
                status: data ? `${data[getCamelCase(ele?.text)]}` : "",
              })).map((card) => (
              <StatusCard
                key={card.text}
                text={card.text}
                status={card.status}
                icon={card.icon}
                statusColor={card.statusColor}
                suffix={card.suffix}
              />
            ))}
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};

export default Overview;
