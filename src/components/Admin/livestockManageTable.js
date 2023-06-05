import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import Add from "../.././assets/images/AddSite.png";
import DeletePopup from "../DeletePopupCard";
import AddSite_toUser from "./AddSite_fromUser";
import AddLivestock from "./addLivestock";

const Index = ({ liveStock, reRander }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [allLiveStock, setAllLiveStock] = useState([]);

  const UserDetails = [];
  // const UserDetails = props?.Details?.data;

  useEffect(() => {
    // console.log('DetailsDetails ', liveStock);
    setAllLiveStock(liveStock);
  }, [liveStock]);
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
          className=" flex spaceBetween"
          // sx={{ border: "1px solid red" }}
        >
          {/* <Grid item xs={4} sm={4} md={4} lg={4}> */}
          <Typography className="  fs16px  p_l-r10px fontWeight700">
            UID
          </Typography>
          {/* </Grid> */}
          <Grid item xs={7} sm={7} md={7} lg={7} className=" flexStart">
            <Typography className="fs16px fontWeight700">
              Livestock Name{" "}
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
          justifyContent="flex-end"
          alignItems="flex-end"
          className="flex flex-end"
          // sx={{  columnGap: "10" }}
        >
          {/* <Grid item xs={4} sm={4} md={4} lg={4} className="flex flexStart">
            <Typography className="  fs16px fontWeight700  ">Email</Typography>
          </Grid> */}

          <Grid item xs={4} sm={4} md={4} lg={4} className="flex flex-end">
            <Typography className="  fs16px fontWeight700  ">
              Device ID
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} className="flex flexStart">
            <Typography className="  fs16px fontWeight700  ">
              Device status
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            className="flex flexEnd  p_r30px "
          >
            <Typography className="fs16px p_r10px fontWeight700  ">
              Action
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {allLiveStock && allLiveStock?.length > 0 ? (
        allLiveStock?.map((a, i) => (
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
              className="flex spaceBetween "
              // sx={{ border: "1px solid red" }}
            >
              {/* <Grid item xs={4} sm={4} md={4} lg={4}> */}
              <Typography className="  fs16px  p_l-r10px fontWeight700 d_color">
                {a?.uID}
              </Typography>
              {/* </Grid> */}
              <Grid item xs={7} sm={7} md={7} lg={7} className="  flexStart">
                <Typography
                  className="fs16px fontWeight700 d_color Transform_Capital "
                  // align="center"
                >
                  {a?.name}
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
              justifyContent="flex-end"
              alignItems="flex-end"
              // sx={{ border: "1px solid blue", display: "flex" }}
              className="flex flex-end"
            >
              {/* <Grid
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                className="flex flexStart "
              >
                <Typography className="  fs14px fontWeight700  ">
                  branch.manager@gmail.com
                </Typography>
              </Grid> */}
              <Grid item xs={4} sm={4} md={4} lg={4} className="flex flex-end">
                <Typography className="  fs16px fontWeight700  ">
                  {a?.assignedDevice?.uID}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flex flexStart "
              >
                <Typography className="fs16px fontWeight700">
                  {a?.assignedDevice?.status ? "Active" : "Inactive"}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                lg={4}
                className="flex flexEnd p_r30px "
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  {/* <AddSite_toUser
                    Name={"site"}
                    gatewayID={a?._id}
                    reRander={props?.reRander}
                  /> */}
                  <MdOutlineRemoveRedEye
                    className="fs24px"
                    onClick={() =>
                      navigate(`/admin/livestock/${a?._id}`, {
                        state: a,
                      })
                    }
                  />

                  <DeletePopup
                    Name={"liveStock"}
                    DeviceId={a?._id}
                    reRander={reRander}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "400px" }}
          className=" border "
        >
          <AddLivestock />
        </Grid>
        //   <Grid
        //     container
        //     item
        //     alignItems="center"
        //     sx={{ flexDirection: "column", width: "20%" }}
        //     className="Greenborder  bRadius_8 Cursor"
        //     onClick={() => {
        //       // navigate("/admin/device-management/add-site-management");
        //     }}
        //   >
        //     <img src={Add} alt="loading" className="M20" />
        //     <Typography className="fs18px mt10px d_color fontWeight700 mb10px">
        //       LiveStock Not Available
        //     </Typography>
        //   </Grid>
        //
      )}
    </>
  );
};

export default Index;
