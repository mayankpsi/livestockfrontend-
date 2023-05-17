import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  Typography,
  Breadcrumbs,
  Box,
  Stepper,
  Step,
  StepButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";

import {
  useAddSiteController,
  setGatewayId,
  setGatewayName,
  setGatewayAddress,
  setGatewayPincode,
  setGatewayCity,
  setGatewayState,
  setGatewayCountry,
  setGatewayGeoLatitude,
  setGatewayGeoLongitude,
  setBranchId,
  setBranchName,
  setBranchDepth1,
  setBranchDepth2,
  setBranchDepth3,
  setBranchAddress,
  setBranchPincode,
  setBranchCity,
  setBranchState,
  setBranchCountry,
  setBranchGeoLatitude,
  setBranchGeoLongitude,
  setNodeData,
} from "../../../context/addSite";
import { useLoaderController, setLoader } from "../../../context/common";

import AdminUIContainer from "../../../layout/AdminUIContainer";
import GatewayDetail from "./components/gatewayDetail.js";
import BranchDetail from "./components/branchManagerDetail";
import NodeDetail from "./components/nodeDetail.js";
import { adminRequest } from "../../../requestMethod";

const steps = ["Gateway details", "Branch manager Details", "Node details"];

const Index = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [controllerLoader, dispatchLoader] = useLoaderController();

  const [controller, dispatch] = useAddSiteController();
  const {
    gatewayId,
    gatewayName,
    gatewayAddress,
    gatewayPincode,
    gatewayCity,
    gatewayState,
    gatewayCountry,
    gatewayGeoLongitude,
    gatewayGeoLatitude,

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

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

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
    if (activeStep == 0 && gatewayId.length < 8) {
      enqueueSnackbar("Gateway Id minimum value 8", {
        variant: "error",
        autoHideDuration: 3000,
        fontSize: "2rem",
      });
      return;
    }
    if (activeStep == 1 && branchId.length < 8) {
      enqueueSnackbar("Branch Id minimum value 8", {
        variant: "error",
        autoHideDuration: 3000,
        fontSize: "2rem",
      });
      return;
    }
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const changeNavigate = async () => {
    let adminId = localStorage.getItem("agro_id");
    let newNodeData = [...nodeData];
    let backupNode = JSON.parse(JSON.stringify(nodeData));
    let nodeIdLength = false;
    newNodeData.map((node) => {
      if (node.nodeID.length < 8) {
        enqueueSnackbar("Node Id min 8", {
          variant: "error",
          autoHideDuration: 3000,
          fontSize: "2rem",
        });
        nodeIdLength = true;
        return;
      }
    });
    if (nodeIdLength) return;

    newNodeData.map((node) => delete node["id"]);

    let body = {
      admin_id: adminId,
      gatewayID: gatewayId,
      gatewayName: gatewayName,
      gatewayAddress: gatewayAddress,
      gatewayPincode: +gatewayPincode,
      gatewayCity: gatewayCity,
      gatewayState: gatewayState,
      gatewayCountry: gatewayCountry,
      gatewayGeoLongitude: gatewayGeoLongitude.toString(),
      gatewayGeoLatitude: gatewayGeoLatitude.toString(),

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
    setLoader(dispatchLoader, true);
    try {
      const res = await adminRequest.post("/site/addsite", body);
      setLoader(dispatchLoader, false);
      if (res.status == 200 || res.status == 201) {
        enqueueSnackbar("site Registered done", {
          variant: "success",
          autoHideDuration: 3000,
        });
        setGatewayId(dispatch, "");
        setGatewayName(dispatch, "");
        setGatewayAddress(dispatch, "");
        setGatewayPincode(dispatch, "");
        setGatewayCity(dispatch, "");
        setGatewayState(dispatch, "");
        setGatewayCountry(dispatch, "");
        setGatewayGeoLatitude(dispatch, "");
        setGatewayGeoLongitude(dispatch, "");
        setBranchId(dispatch, "");
        setBranchName(dispatch, "");
        setBranchDepth1(dispatch, "");
        setBranchDepth2(dispatch, "");
        setBranchDepth3(dispatch, "");
        setBranchAddress(dispatch, "");
        setBranchPincode(dispatch, "");
        setBranchCity(dispatch, "");
        setBranchState(dispatch, "");
        setBranchCountry(dispatch, "");
        setBranchGeoLatitude(dispatch, "");
        setBranchGeoLongitude(dispatch, "");
        setNodeData(dispatch, [
          {
            id: "node#1",
            nodeID: "",
            nodeName: "",
            depth1: "",
            depth2: "",
            depth3: "",
            nodeAddress: "",
            nodePincode: "",
            nodeCity: "",
            nodeState: "",
            nodeCountry: "",
            nodeGeoLatitude: "",
            nodeGeoLongitude: "",
          },
        ]);
        navigate("/admin/site-management");
      } else {
        setNodeData(dispatch, backupNode);
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
        gatewayGeoLongitude
          ? handleComplete()
          : enqueueSnackbar("please mark geo locations ", {
              variant: "error",
              autoHideDuration: 3000,
            });
        // handleComplete();
        break;
      case 1:
        branchGeoLongitude
          ? handleComplete()
          : enqueueSnackbar("please mark branch manager GeoLocations ", {
              variant: "error",
              autoHideDuration: 3000,
            });

        break;
      case 2:
        if (nodeData) changeNavigate();
        break;
    }
    // activeStep == 2 ? changeNavigate : handleComplete;
  };
  return (
    <>
      <AdminUIContainer>
        <Grid
          container
          alignItems="center"
          style={{
            height: "80px",
            width: "100%",
          }}
          // className="d_bgcolor "
        >
          <Container maxWidth="lg">
            <Grid container direction="row" justifyContent="start">
              <Breadcrumbs
                separator="›"
                aria-label="breadcrumb"
                className="  fs16px bold "
              >
                <Link to="/admin/dashboard" key="1" className=" textDecorNone">
                  <Typography className=" fs16px bold d_color ">
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
                  to={`/admin/site-management/add-site-management`}
                  key="3"
                  className=" textDecorNone"
                >
                  <Typography className=" fs16px bold b1c_color ">
                    Add site
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Grid>
          </Container>
        </Grid>

        <Container
          maxWidth="lg"
          className="mb20px"
          sx={{
            position: "relative",
          }}
        >
          <Grid>
            <Box sx={{ width: "100%" }}>
              <Grid
                sx={{
                  // border: "3px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  margin: "30px 0",
                  boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.1)",
                  borderRadius: "1px",
                }}
                className=" pbottom10px"
              >
                <Typography className="fs20px bold" style={{ width: "250px" }}>
                  {activeStep == 0 && "Add Site"}
                  {activeStep == 1 && "Add Branch Manager"}
                  {activeStep == 2 && "Add Node Devices"}
                </Typography>
                <Stepper
                  nonLinear
                  activeStep={activeStep}
                  // sx={{ border: "2px solid red" }}
                >
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                      <Step
                        key={label}
                        completed={completed[index]}
                        {...stepProps}
                      >
                        <StepButton color="inherit" {...labelProps}>
                          <Typography className="fs16px">{label}</Typography>
                        </StepButton>
                      </Step>
                    );
                  })}
                </Stepper>

                <Typography>
                  {" "}
                  <CloseIcon
                    className="fs24px bold"
                    onClick={() => {
                      navigate("/admin/site-management");
                    }}
                  />
                </Typography>
              </Grid>

              {/* </Grid> */}
              <div>
                {allStepsCompleted() ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <form onSubmit={(e) => checkFormValidation(e)}>
                      <Grid
                        sx={{
                          marginTop: "20px",
                          marginBottom: "1rem",
                        }}
                      >
                        {activeStep == 0 && (
                          <GatewayDetail title="Enter Gateway Details" />
                        )}
                        {activeStep == 1 && <BranchDetail title=" Details" />}
                        {activeStep == 2 && (
                          <NodeDetail title="Branch Details" />
                        )}
                      </Grid>

                      <Box
                        // maxWidth="lg"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          pt: 2,
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
                          type="submit"
                          className="fs14px Greenborder d_bgcolor white_color p_l-r10-30px Transform_Capital"
                        >
                          {activeStep == 2 ? "Submit" : "Next"}
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
