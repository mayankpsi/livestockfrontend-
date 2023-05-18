import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import Add from "../../../.././assets/images/AddSite.png";
import AddSite_toUser from "./AddSite_toUser";
import DeletePopup from "../../../../DeletePopupCard";

const Index = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [siteDetails, setSiteDetails] = useState([]);

  useEffect(() => {
    props && setSiteDetails(props.data.data);
  }, [props]);
  return (
    <>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        // sx={{ border: "1px solid black" }}
        className=" d_bgcolor fs16px white_color  p_t-b10px bRadius_8-2 "
      >
        <Grid
          container
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          // sx={{ border: "1px solid red" }}
        >
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Typography className="  fs16px  p_l-r10px fontWeight700">
              UID
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Typography className="fs16px fontWeight700">
              Liovestock Name
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          className="flex spaceBetween"
        >
          <Grid item xs={3} sm={3} md={3} lg={3} className="flex center">
            <Typography className="  fs16px fontWeight700  ">Mac Id</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
            <Typography className="  fs16px fontWeight700  ">
              Device ID
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
            <Typography className="fs16px fontWeight700">
              Device Status
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} className="flex centerJc">
            <Typography className="fs16px p_r10px fontWeight700 ">
              Action
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {siteDetails && siteDetails?.length > 0 ? (
        siteDetails?.map((a, i) => {
          let nodeLength = 0;
          a?.branchManager?.map((item) => {
            nodeLength += item?.nodes?.length;
          });

          return (
            <Grid
              key={i}
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              // sx={{ border: "1px solid black" }}
              className="  fs16px  border  p_t-b10px "
            >
              <Grid
                container
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                // sx={{ border: "1px solid red" }}
              >
                <Grid item xs={4} sm={4} md={4} lg={4}>
                  <Typography className="  fs16px  p_l-r10px fontWeight700 d_color">
                    {a?.gatewayID}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Typography className="fs16px fontWeight700 d_color Transform_Capital">
                    {a?.gatewayName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={8}
                sm={8}
                md={8}
                lg={8}
                // sx={{ border: "2px solid blue" }}
                className="flex spaceBetween"
              >
                <Grid item xs={3} sm={3} md={3} lg={3} className="flex center">
                  <Typography className="  fs16px fontWeight700  ">
                    {a?.branchManager?.length}
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} className="flex center ">
                  <Typography className="  fs16px fontWeight700 center  ">
                    {nodeLength}
                  </Typography>
                </Grid>
                <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
                  <Typography className="fs16px fontWeight700 ">
                    {a?.alert ? a?.alert : 0}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} className="flex center ">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {/* <AddSite_toUser Name={"user"} gatewayID={a?._id} /> */}

                    <MdOutlineRemoveRedEye
                      className="fs24px"
                      onClick={() =>
                        navigate(`/admin/site-management/${a?._id}`)
                      }
                    />

                    {/* <MdDeleteOutline className="fs24px" /> */}

                    <DeletePopup
                      Name={"site"}
                      gatewayID={a?._id}
                      reRander={props?.reRander}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          );
        })
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "400px" }}
          className=" border "
        >
          <Grid
            container
            item
            alignItems="center"
            sx={{ flexDirection: "column", width: "20%" }}
            className="Greenborder  bRadius_8 Cursor"
            onClick={() => {
              navigate("/admin/site-management/add-site-management");
            }}
          >
            <img src={Add} alt="loading" className="M20" />
            <Typography className="fs18px mt10px d_color fontWeight700 mb10px">
              Add Site
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Index;
