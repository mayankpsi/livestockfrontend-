import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { TabPane, CustomInput, StatusCard } from "../../../ComponentsV2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { addCollarValidationSchema } from "../../../utils/validationSchema";
import useCollarContext from "../../../hooks/useCollarContext";
import { statusCardData } from "../Data";
import useGetCamelCase from "../../../hooks/useGetCamelCase";
import { useDeviceDetailContext } from "../../../context/DeviceDetailContext";

const Overview = ({ data }) => {
  const {
    handelCollarNewInfo,
    handleCollarInfoEditChange,
    collarInfoEdit,
    setCollarInfoEdit,
    isEditCollarInfo,
  } = useDeviceDetailContext();

  const { isError } = useCollarContext();
  const { getCamelCase } = useGetCamelCase();

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

  const onCollarEdit = () => handelCollarNewInfo(data?.collarId);

  const getStatus = (ele, data) => {
    const label = ele?.text?.toLowerCase();
    const status = data?.status?.toLowerCase();

    if (label === "status" && status === "online") {
      return "green";
    } else if (label === "status" && status === "offline") {
      return "red";
    } else {
      return ele?.statusColor;
    }
  };
  return (
    <form onSubmit={handleSubmit(onCollarEdit)}>
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
              text="Collar Information"
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
                label="collar UID"
                register={register}
                errors={errors}
                value={collarInfoEdit?.collarUID}
                name="collarUID"
                isError={isError}
                onChange={handleCollarInfoEditChange}
              />
              <CustomInput
                disabled={!isEditCollarInfo}
                label="collar name"
                register={register}
                errors={errors}
                value={collarInfoEdit?.collarName}
                name="collarName"
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
                label="collar MAC ID"
                register={register}
                errors={errors}
                value={collarInfoEdit?.collarMacId}
                name="collarMacId"
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
          <TypographyPrimary>Collar status</TypographyPrimary>
          <Stack direction="column" gap={1}>
            {statusCardData
              ?.filter(
                (ele) => !ele?.text?.toLowerCase()?.includes("pedometer")
              )
              ?.map((ele) => ({
                ...ele,
                status: data ? `${data[getCamelCase(ele?.text)]}` : "",
                statusColor: getStatus(ele, data),
              }))
              .map((card) => (
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
