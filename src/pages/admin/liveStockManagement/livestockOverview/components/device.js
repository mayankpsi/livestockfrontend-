import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Typography, InputBase } from "@mui/material";
import { useSnackbar } from "notistack";
import { useLoaderController, setLoader } from "../../../../../context/common";
import { adminRequest } from "../../../../../requestMethod";

const Overview = ({ title, data, apiEndpoint }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [controller, dispatch] = useLoaderController();
  const { enqueueSnackbar } = useSnackbar();

  const [updateMap, setUpdateMap] = useState();
  const [inputDisabled, setInputDisabled] = useState(true);
  const [update, setUpdate] = useState(true);

  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");

  const saveData = async () => {
    setLoader(dispatch, true);
    let body = {
      clientID: clientId,
      clientName: clientName,
      client_id: id,
    };
    try {
      const res = await adminRequest.post(`/user/userupdate/`, body);
      console.log("update user ", res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        enqueueSnackbar(res?.data?.msg, {
          variant: "success",
          autoHideDuration: 3000,
        });
        navigate(`/admin/user-management/${id}`, { state: update });
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
    setLoader(dispatch, false);
    setInputDisabled(true);
  };

  return (
    <>
      <form>
        <Grid container className="flex spaceBetween Width100">
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={5.5}
            lg={5.5}
            className=" spaceBetween mb20px p20px bRadius_8  "
            sx={{ rowGap: "20px " }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="flexDir  Width100"
            >
              <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                Device ID
              </Typography>
              <InputBase
                className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                disabled={inputDisabled}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="flexDir  Width100"
            >
              <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                Device Name
              </Typography>
              <InputBase
                className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                disabled={inputDisabled}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="flexDir  Width100"
            >
              <Typography className="fs16px mb10px b1c_color fontWeight600 ">
                Mac Id
              </Typography>
              <InputBase
                className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
                // value={clientId}
                // onChange={(e) => setClientId(e.target.value)}
                disabled={inputDisabled}
              />
            </Grid>
          </Grid>

          {/* <Grid
            container
            item
            xs={12}
            sm={12}
            md={5.5}
            lg={5.5}
            className="flexDir spaceBetween mb20px p20px bRadius_8  "
            sx={{ rowGap: "20px " }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              className="flexDir flexEnd p_r30px  "
            >
              <Button
                className="fs14px  bRadius_8 Greenborder d_color Transform_Capital fontWeight700  p_l-r10-30px  mb10px"
                onClick={() =>
                  inputDisabled ? setInputDisabled(false) : saveData()
                }
              >
                {inputDisabled ? "Edit" : "Save"}
              </Button>
            </Grid>
          </Grid> */}
        </Grid>
      </form>
    </>
  );
};

export default Overview;
