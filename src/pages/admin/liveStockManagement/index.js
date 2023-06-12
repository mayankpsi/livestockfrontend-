import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import { useSnackbar } from "notistack";

import AdminUIContainer from "../../../layout/AdminUIContainer";
// import AddClient from "./addClientDialog";
import SiteManageTable from "../../../components/Admin/livestockManageTable";
import AddLiveStock from "../../../components/Admin/addLivestock";

import { adminRequest } from "../../../requestMethod";
import { useLoaderController, setLoader } from "../../../context/common";

const Index = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [controller, dispatch] = useLoaderController();
  const { enqueueSnackbar } = useSnackbar();
  const [userDetails, setUserDetails] = useState([]);
  const [userUpdate, setUserUpdate] = useState();
  // const [loader, setLoader] = useState(false);
  const [allLiveStock, setAllLiveStock] = useState([]);

  const getAllLiveStock = async () => {
    setLoader(dispatch, true);
    try {
      const res = await adminRequest.get("/liveStock/getAll");
      // console.log('AddSite ', res);
      setLoader(dispatch, false);
      if (res.status == 200 || res.status == 201) {
        setAllLiveStock(res?.data?.data);
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    // UserDetails();
    getAllLiveStock();
  }, []);
  useEffect(() => {
    // console.log('refreshrefreshrefresh', state);
    // UserDetails();
  }, [state]);
  return (
    <>
      <AdminUIContainer>
        <>
          <Grid
            container
            alignItems="center"
            style={{ height: "80px", width: "100%" }}
            className="d_bgcolor "
          >
            <Container maxWidth="lg">
              <Grid
                container
                direction="row"
                justifyContent="start"
                //   alignItems="center"
              >
                <Breadcrumbs
                  separator="›"
                  aria-label="breadcrumb"
                  className=" white_color fs16px bold "
                >
                  <Link
                    to="/admin/dashboard"
                    className="white_color textDecorNone"
                    key="1"
                  >
                    <Typography className="white_color fs16px bold ">
                      Dashboard
                    </Typography>
                  </Link>
                  ,
                  <Link
                    to="/admin/livestock"
                    className="white_color textDecorNone"
                    key="2"
                  >
                    <Typography className="white_color fs16px bold ">
                      livestock
                    </Typography>
                  </Link>
                  ,
                </Breadcrumbs>
              </Grid>
            </Container>
          </Grid>
          <Container maxWidth="lg" className=" mb30px mt20px ">
            <Grid
              container
              className="fs20px spaceBetween  mb30px fontWeight700 d_color  "
              // style={{ border: "1px solid blue" }}
            >
              <Typography className="fs20px  fontWeight700 b1c_color  ">
                All LiveStock ({allLiveStock?.length})
              </Typography>

              <AddLiveStock type={3}
              reRender={getAllLiveStock}
              />
            </Grid>
            <SiteManageTable
              className=" mt30px "
              liveStock={allLiveStock}
              reRender={getAllLiveStock}
            />
          </Container>
        </>
      </AdminUIContainer>
    </>
  );
};

export default Index;
