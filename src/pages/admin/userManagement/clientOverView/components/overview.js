import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Typography, InputBase } from "@mui/material";
// import SiteManageTable from "../../../../../components/Admin/userManageTable";
import TableinfoUser from "./overviewTable";
import { useLoaderController, setLoader } from "../../../../../context/common";
import { adminRequest } from "../../../../../requestMethod";
import { useSnackbar } from "notistack";
import SiteDetail from "../../siteDetail";

const Index = ({ data }) => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [controller, dispatch] = useLoaderController();
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [update, setUpdate] = useState(true);
  const [showSiteDetail, setShowSiteDetail] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const [inputDisabled, setInputDisabled] = useState(true);

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
  const showDetail = (val) => {
    setShowSiteDetail(val);
  };

  useEffect(() => {
    setClientId(state?.clientID);
    setClientName(state?.clientName);
    console.log("Client", data);
  }, [data]);

  return (
    <>
      <form>
        <Grid container className="flex flexEnd mt10px ">
          <Button
            className="fs14px  bRadius_8 Greenborder d_color Transform_Capital fontWeight700  p_l-r10-30px  mb10px"
            onClick={() =>
              inputDisabled ? setInputDisabled(false) : saveData()
            }
          >
            {inputDisabled ? "Edit" : "Save"}
          </Button>
        </Grid>
        <Grid
          container
          item
          className="spaceBetween mb20px p20px bRadius_8 border"
          sx={{ rowGap: "20px " }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="flexDir  Width100"
          >
            <Typography className="fs16px mb10px b1c_color fontWeight600 ">
              User ID
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
            md={6}
            lg={6}
            className="flexDir  Width100"
          >
            <Typography className="fs16px mb10px b1c_color fontWeight600 ">
              Name
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
            md={6}
            lg={6}
            className="flexDir  Width100"
          >
            <Typography className="fs16px mb10px b1c_color fontWeight600 ">
              Email
            </Typography>
            <InputBase
              className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
              // value={clientId}
              // onChange={(e) => setClientId(e.target.value)}
              disabled={inputDisabled}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="flexDir  Width100"
          >
            <Typography className="fs16px mb10px b1c_color fontWeight600 ">
              Phone
            </Typography>
            <InputBase
              className=" border p_t-l15px fs16px Width80  bRadius_8 fontWeight700"
              // value={clientId}
              // onChange={(e) => setClientId(e.target.value)}
              disabled={inputDisabled}
            />
          </Grid>
        </Grid>
      </form>
      {/* <SiteManageTable data={data && data[0]} /> */}
      <TableinfoUser data={data && data} />
    </>
  );
};

export default Index;
