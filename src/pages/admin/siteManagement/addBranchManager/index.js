import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  InputBase,
  Menu,
  MenuItem,
  Typography,
  Breadcrumbs,
  Icon,
  Box,
  Stepper,
  Step,
  StepButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";

import AdminUIContainer from "../../../../layout/AdminUIContainer";
import GatewayDeatil from "./components/gatewayDetail.js";
import NodeDetail from "./components/nodeDetail.js";

import { useAddBmController } from "../../../../context/addBm";
import { useLoaderController, setLoader } from "../../../../context/common";

import { adminRequest } from "../../../../requestMethod";
const steps = ["Branch manager Detail", "Node Details"];

const Index = () => {
  const navigate = useNavigate();
  const { gatewayName } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const [controllerLoader, dispatchLoader] = useLoaderController();
  const [controller, dispatch] = useAddBmController();

  const {
    branchId,
    branchName,
    branchDepth1,
    branchDepth2,
    branchDepth3,
    branchAddress,
    branchPincode,
    branchCity,
    branchState,
    branchCountry,
    branchGeoLongitude,
    branchGeoLatitude,

    nodeData,
  } = controller;

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const checkFormValidation = (e) => {
    e.preventDefault();
    switch (activeStep) {
      case 0:
        branchGeoLongitude
          ? handleComplete()
          : enqueueSnackbar("please mark branch manager GeoLocations ", {
              variant: "error",
              autoHideDuration: 3000,
            });

        break;
      case 1:
        if (nodeData) changeNavigate();
        break;
    }
    // switch (activeStep) {
    //   case 0:
    //     if (
    //       branchId &&
    //       branchName &&
    //       branchDepth1 &&
    //       branchDepth2 &&
    //       branchDepth3 &&
    //       branchAddress &&
    //       branchPincode &&
    //       branchCity &&
    //       branchState &&
    //       branchCountry
    //     )
    //       handleComplete();
    //     break;
    //   case 1:
    //     if (nodeData) changeNavigate();
    //     break;
    // }
    // activeStep == 1 ? changeNavigate : handleComplete;
  };
  const changeNavigate = async () => {
    let newNodeData = [...nodeData];
    newNodeData.map((node) => delete node["id"]);
    let body = {
      gateway_id: gatewayName,
      branchID: branchId,
      branchName: branchName,
      branchAddress: branchAddress,
      branchPincode: +branchPincode,
      branchCity: branchCity,
      branchState: branchState,
      branchCountry: branchCountry,
      depth1: +branchDepth1,
      depth2: +branchDepth2,
      depth3: +branchDepth3,
      branchGeoLongitude: branchGeoLongitude.toString(),
      branchGeoLatitude: branchGeoLatitude.toString(),
      nodes: newNodeData,
    };
    console.log(body, "add branch manager");

    setLoader(dispatchLoader, true);
    try {
      const res = await adminRequest.post("/site/addbranchmanager", body);
      console.log("login ", res);
      setLoader(dispatchLoader, false);
      if (res.status == 200 || res.status == 201) {
        enqueueSnackbar("Add branch Manager done", {
          variant: "success",
          autoHideDuration: 3000,
        });
        navigate("/admin/site-management");
      } else {
        enqueueSnackbar(res?.response?.data?.msg, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    } catch (err) {
      setLoader(dispatchLoader, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: "error",
        autoHideDuration: 3000,
        fontSize: "2rem",
      });
    }
  };

  return (
    <>
      <AdminUIContainer>
        <Container maxWidth="lg" className="mb20px">
          <Grid
            container
            direction="row"
            justifyContent="start"
            sx={{
              padding: "10px 0",
            }}
          >
            <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className=" g_color fs16px bold  "
            >
              <Link to="/admin/dashboard" key="1" className=" textDecorNone">
                <Typography className=" fs16px bold d_color  ">
                  Dashboard
                </Typography>
              </Link>
              ,
              <Link
                to="/admin/site-management"
                key="2"
                className=" textDecorNone"
              >
                <Typography className=" fs16px bold d_color ">
                  Site management
                </Typography>
              </Link>
              ,
              <Link
                to={`/admin/site-management/land-1/add-branch-manager`}
                key="2"
                className=" textDecorNone"
              >
                <Typography className=" fs16px bold g_color ">
                  Add Branch Manager
                </Typography>
              </Link>
            </Breadcrumbs>
          </Grid>
          <Grid>
            <Box
              sx={{
                width: "100%",
                // border: "2px solid green",
              }}
            >
              <Grid
                container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "30px 0",
                }}
              >
                <Grid item lg={3} md={3} sm={10} xs={10} className=" mb10px">
                  <Typography className="fs20px bold Width100">
                    {activeStep == 0 && "Add Branch Manager"}
                    {activeStep == 1 && "Add Device"}
                  </Typography>
                </Grid>

                <Grid
                  item
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  className=" flex flexStart "
                >
                  <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                      <Step
                        key={label}
                        completed={completed[index]}
                        // className="d_color "
                      >
                        <StepButton
                          color=" #347d00"
                          onClick={handleStep(index)}
                          className="d_color "
                        >
                          <Typography className="fs16px d_color">
                            {label}
                          </Typography>
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>

                <Typography className="fs20px bold">
                  <CloseIcon
                    className="fs24px bold"
                    onClick={() => {
                      navigate("/admin/site-management");
                    }}
                  />{" "}
                </Typography>
              </Grid>

              <div>
                {allStepsCompleted() ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you &apos;refinished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <form onSubmit={(e) => checkFormValidation(e)}>
                      <Grid sx={{ marginTop: "20px" }}>
                        {activeStep == 0 && (
                          <GatewayDeatil title="Gateway Details" />
                        )}
                        {activeStep == 1 && <NodeDetail title=" Details" />}
                      </Grid>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          pt: 2,
                          marginTop: "1px solid #ddd",
                        }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={
                            activeStep == 0
                              ? { display: "none" }
                              : { border: "2px solid green" }
                          }
                          className="fs14px Greenborder d_color Transform_Capital   p_l-r10-30px"
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                          // onClick={
                          //   activeStep == 1
                          //     ? () => navigate("/admin/site-management/1")
                          //     : // index page k 3 --branchManger
                          //       handleNext
                          // }
                          // onClick={checkFormValidation}
                          type="submit"
                          className="fs14px Greenborder d_bgcolor white_color p_l-r10-30px Transform_Capital"
                        >
                          {activeStep == 1 ? "Submit" : "Next"}
                        </Button>
                      </Box>
                    </form>
                  </React.Fragment>
                )}
              </div>
            </Box>
          </Grid>
        </Container>
      </AdminUIContainer>
    </>
  );
};

export default Index;
