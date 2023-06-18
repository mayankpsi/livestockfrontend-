import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography, InputBase } from "@mui/material";
// import SiteManageTable from "../../../../../components/Admin/userManageTable";
import TableinfoUser from "./overviewTable";
import { useLoaderController, setLoader } from "../../../../../context/common";
import { adminRequest } from "../../../../../requestMethod";
import { useSnackbar } from "notistack";
import SiteDetail from "../../siteDetail";

const Index = ({ data, reRender }) => {
  const { id } = useParams();
  const [controller, dispatch] = useLoaderController();
  const [Id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [update, setUpdate] = useState(true);
  const [showSiteDetail, setShowSiteDetail] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const [inputDisabled, setInputDisabled] = useState(true);

  const saveData = async () => {
    setLoader(dispatch, true);
    let body = {
      phone: phone,
      name: name,
    };
    try {
      const res = await adminRequest.post(`/user/update?id=${data?._id}`, body);
      console.log("update user ", res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        enqueueSnackbar(res?.data?.message, {
          variant: "success",
          autoHideDuration: 3000,
        });
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
    setId(data?.userID);
    setName(data?.name);
    setEmail(data?.email);
    setPhone(data?.phone);

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
              value={Id}
              onChange={(e) => setId(e.target.value)}
              // disabled={inputDisabled}
              disabled={true}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // disabled={inputDisabled}
              disabled={true}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={inputDisabled}
            />
          </Grid>
        </Grid>
      </form>
      {/* <SiteManageTable data={data && data[0]} /> */}
      {/* <TableinfoUser data={data && data} /> */}
    </>
  );
};

export default Index;
