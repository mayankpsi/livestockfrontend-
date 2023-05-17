import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  InputBase,
  Divider,
  FormControl,
  TextField,
  MenuItem,
} from '@mui/material';
import { MdAddCircleOutline } from 'react-icons/md';
import { useAddSiteController, setNodeData } from '../../../../context/addSite';

import DetailMap from '../../../../components/Common/detailMap';

const NodeDetails = ({ title }) => {
  const navigate = useNavigate();

  const [controller, dispatch] = useAddSiteController();
  const {
    gatewayPincode,
    gatewayCity,
    gatewayState,
    gatewayCountry,
    nodeData,
  } = controller;

  const head1 = [
    { name: 'UID' },
    { name: 'Branch Manager Name' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: 'Device' },
    { name: 'Alerts' },
    { name: 'Action' },
  ];
  const [orderType, setOrderType] = useState();
  const [nodesData, setNodesData] = useState(nodeData);

  const changeHandler = (id, key, value) => {
    console.log(id, key, value);
    let newNodedata = nodesData;
    newNodedata.map((node, i) => {
      if (node.id == id) node[key] = value;
    });
    console.log('newNodedata', newNodedata);

    setNodeData(dispatch, newNodedata);
  };

  const removeNodes = (id) => {
    console.log(id);
    let newNodes = nodesData.filter((item) => item.id != id);
    setNodesData(newNodes);
    setNodeData(dispatch, newNodes);
  };

  useEffect(() => {
    setNodesData(() => nodeData);
    console.log('nodeData', nodeData);
  }, [nodeData]);

  return (
    <>
      <Container maxWidth="lg">
        {nodeData &&
          nodesData.length > 0 &&
          nodesData.map((item, i) => (
            <Grid key={i}>
              <Grid
                container
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  columnGap: '10px',
                  // border: "1px solid red ",
                }}
                className="spaceBetween1 "
              >
                <Grid
                  item
                  lg={5.8}
                  md={5.8}
                  sm={12}
                  xs={12}
                  style={{ rowGap: '1rem ' }}
                >
                  <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className="spaceBetween1  flexDir AlignStart bRadius_8-2"
                  >
                    <Grid container className="">
                      <Grid
                        container
                        className="flex spaceBetween "
                        sx={{ columnGap: '1rem' }}
                      >
                        <Grid
                          container
                          xs={5}
                          sm={5}
                          md={5}
                          lg={5}
                          item
                          className=" flexDir"
                        >
                          <Typography className=" fs16px g_color  fontWeight500">
                            {i + 1}. Node ID
                          </Typography>
                          <InputBase
                            type="number"
                            className="IntBorder bRadius_8 fs16px"
                            value={item.nodeID}
                            // onChange={(e) =>
                            //   changeHandler(item.id, 'nodeID', e.target.value)
                            // }
                            onChange={(e) => {
                              if (e.target.value.length <= 8)
                                changeHandler(
                                  item.id,
                                  'nodeID',
                                  e.target.value
                                );
                            }}
                            required
                          />
                        </Grid>
                        <Grid
                          container
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          item
                          className=" flexDir"
                        >
                          <Typography className=" fs16px g_color  fontWeight500">
                            Node Name
                          </Typography>
                          <InputBase
                            className="IntBorder bRadius_8 fs16px"
                            value={item.nodeName}
                            onChange={(e) =>
                              changeHandler(item.id, 'nodeName', e.target.value)
                            }
                            required
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className="flex spaceBetween mt20px"
                        style={{ columnGap: '1rem' }}
                      >
                        <Grid
                          container
                          xs={2}
                          sm={2}
                          md={2}
                          lg={2}
                          item
                          className=" flexDir"
                        >
                          <Typography className=" fs16px g_color  fontWeight500">
                            Depth 1
                          </Typography>
                          {/* <FormControl
                            sx={{
                              minWidth: 40,
                              width: '80%',
                              fontSize: '14px',
                              // border: "1px solid #DDDDDD",
                              fontFamily: 'oswald',
                            }}
                            className="Selectdropstyle"
                            size="small"
                          >
                            <TextField
                              select
                              // InputProps={{ disableUnderline: true }}
                              className="Selectdropstyle-noborder analytics_dropDown "
                              labelid="demo-select-small"
                              id="demo-select-small"
                              // inputProps={{ "aria-label": "Without label" }}
                              defaultValue={0}
                              value={item.depth1}
                              // onChange={(e) => {
                              //   setOrderType(e.target.value);
                              // }}
                              onChange={(e) =>
                                changeHandler(item.id, 'depth1', e.target.value)
                              }
                              required
                            >
                              <MenuItem
                                value={'6'}
                                className="Selectmenustyle"
                                disabled={
                                  item.depth2 == 6 || item.depth3 == 6
                                    ? true
                                    : false
                                }
                              >
                                <Typography className="Selectmenustyle fs16px  ">
                                  6
                                </Typography>
                              </MenuItem>
                              <MenuItem
                                value={'18'}
                                className="Selectmenustyle"
                                disabled={
                                  item.depth2 == 18 || item.depth3 == 18
                                    ? true
                                    : false
                                }
                              >
                                <Typography className="Selectmenustyle fs16px  ">
                                  18
                                </Typography>
                              </MenuItem>
                              <MenuItem
                                value={'26'}
                                className="Selectmenustyle"
                                disabled={
                                  item.depth2 == 26 || item.depth3 == 26
                                    ? true
                                    : false
                                }
                              >
                                <Typography className="Selectmenustyle fs16px  ">
                                  26
                                </Typography>
                              </MenuItem>
                            </TextField>
                          </FormControl> */}
                          <InputBase
                            type="number"
                            className="IntBorder bRadius_8 fs16px"
                            value={item.depth1}
                            onChange={(e) =>
                              changeHandler(item.id, 'depth1', e.target.value)
                            }
                            required
                          />
                        </Grid>
                        <Grid
                          container
                          xs={2}
                          sm={2}
                          md={2}
                          lg={2}
                          item
                          className=" flexDir"
                        >
                          <Typography className=" fs16px g_color  fontWeight500">
                            Depth 2
                          </Typography>
                          {/* <FormControl
                            sx={{
                              minWidth: 40,
                              width: "80%",
                              fontSize: "14px",
                              //   border: "1px solid #DDDDDD",
                              fontFamily: "oswald",
                            }}
                            className="Selectdropstyle"
                            size="small"
                          >
                            <TextField
                              select
                              // InputProps={{ disableUnderline: true }}
                              className="Selectdropstyle-noborder analytics_dropDown "
                              labelid="demo-select-small"
                              id="demo-select-small"
                              // inputProps={{ "aria-label": "Without label" }}

                              value={item.depth2}
                              // onChange={(e) => {
                              //   setOrderType(e.target.value);
                              // }}
                              onChange={(e) =>
                                changeHandler(item.id, "depth2", e.target.value)
                              }
                              required
                            >
                              <MenuItem
                                value={"6"}
                                className="Selectmenustyle"
                                disabled={
                                  item.depth1 == 6 || item.depth3 == 6
                                    ? true
                                    : false
                                }
                              >
                                <Typography className="Selectmenustyle fs16px  ">
                                  6
                                </Typography>
                              </MenuItem>
                              <MenuItem
                                value={"18"}
                                className="Selectmenustyle"
                                disabled={
                                  item.depth1 == 18 || item.depth3 == 18
                                    ? true
                                    : false
                                }
                              >
                                <Typography className="Selectmenustyle fs16px  ">
                                  18
                                </Typography>
                              </MenuItem>
                              <MenuItem
                                value={"26"}
                                className="Selectmenustyle"
                                disabled={
                                  item.depth1 == 26 || item.depth3 == 26
                                    ? true
                                    : false
                                }
                              >
                                <Typography className="Selectmenustyle fs16px  ">
                                  26
                                </Typography>
                              </MenuItem>
                            </TextField>
                          </FormControl> */}
                          <InputBase
                            type="number"
                            className="IntBorder bRadius_8 fs16px"
                            value={item.depth2}
                            onChange={(e) =>
                              changeHandler(item.id, 'depth2', e.target.value)
                            }
                            required
                          />
                        </Grid>
                        <Grid
                          container
                          xs={2}
                          sm={2}
                          md={2}
                          lg={2}
                          item
                          className=" flexDir"
                        >
                          <Typography className=" fs16px g_color  fontWeight500">
                            Depth 3
                          </Typography>
                          {/* <FormControl
                            sx={{
                              minWidth: "60",
                              width: "100%",
                              fontSize: "14px",
                              //   border: "1px solid #DDDDDD",
                              fontFamily: "oswald",
                            }}
                            className="Selectdropstyle"
                            size="small"
                          >
                            <TextField
                              select
                              // InputProps={{ disableUnderline: true }}
                              className="Selectdropstyle-noborder analytics_dropDown "
                              labelid="demo-select-small"
                              id="demo-select-small"
                              // inputProps={{ "aria-label": "Without label" }}

                              value={item.depth3}
                              // onChange={(e) => {
                              //   setOrderType(e.target.value);
                              // }}
                              onChange={(e) =>
                                changeHandler(item.id, "depth3", e.target.value)
                              }
                              required
                            >
                              <MenuItem
                                value={"6"}
                                className="Selectmenustyle"
                                disabled={
                                  item.depth1 == 6 || item.depth2 == 6
                                    ? true
                                    : false
                                }
                              >
                                <Typography className="Selectmenustyle fs16px  ">
                                  6
                                </Typography>
                              </MenuItem>
                              <MenuItem
                                value={"18"}
                                className="Selectmenustyle"
                                disabled={
                                  item.depth1 == 18 || item.depth2 == 18
                                    ? true
                                    : false
                                }
                              >
                                <Typography className="Selectmenustyle fs16px  ">
                                  18
                                </Typography>
                              </MenuItem>
                              <MenuItem
                                value={"26"}
                                className="Selectmenustyle"
                                disabled={
                                  item.depth1 == 26 || item.depth2 == 26
                                    ? true
                                    : false
                                }
                              >
                                <Typography className="Selectmenustyle fs16px  ">
                                  26
                                </Typography>
                              </MenuItem>
                            </TextField>
                          </FormControl> */}
                          <InputBase
                            type="number"
                            className="IntBorder bRadius_8 fs16px"
                            value={item.depth3}
                            onChange={(e) =>
                              changeHandler(item.id, 'depth3', e.target.value)
                            }
                            required
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      className=""
                      // style={{ border: "1px solid red" }}
                    >
                      <Grid
                        container
                        item
                        md={12}
                        sm={12}
                        lg={12}
                        className="p10px"
                        sx={{
                          // border: "1px solid blue",
                          flexDirection: ' column',
                          rowGap: '1rem',
                        }}
                      >
                        <Typography className="fontWeight500 fs18px g_color  fontWeight500">
                          Full Address
                        </Typography>
                        <textarea
                          className="IntBorder  fontWeight500 fs16px   bRadius_8"
                          style={{ height: '10rem' }}
                          value={item.nodeAddress}
                          onChange={(e) =>
                            changeHandler(
                              item.id,
                              'nodeAddress',
                              e.target.value
                            )
                          }
                          required
                        />
                      </Grid>
                      <Grid
                        container
                        style={{
                          // border: "1px solid red",
                          rowGap: '1rem',
                        }}
                        className=" p10px flexDir"
                      >
                        <Grid
                          container
                          style={{
                            flexDirection: 'row',
                            // border: "1px solid red",
                          }}
                          className="flex spaceBetween1 "
                        >
                          <Grid item xs={12} sm={5} md={5}>
                            <Typography className=" fs18px g_color  fontWeight500">
                              Pincode
                            </Typography>
                            <InputBase
                              type="number"
                              className="IntBorder  fontWeight500 fs16px   bRadius_8 Width100"
                              value={item.nodePincode}
                              onChange={(e) =>
                                changeHandler(
                                  item.id,
                                  'nodePincode',
                                  e.target.value
                                )
                              }
                              required
                              readOnly
                            />
                          </Grid>
                          <Grid item xs={12} sm={5} md={5}>
                            <Typography className=" fs18px g_color  fontWeight500">
                              City
                            </Typography>
                            <InputBase
                              className="IntBorder fontWeight500  fs16px   bRadius_8 Width100 "
                              value={item.nodeCity}
                              onChange={(e) =>
                                changeHandler(
                                  item.id,
                                  'nodeCity',
                                  e.target.value
                                )
                              }
                              required
                              readOnly
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Grid item xs={12} sm={5} md={5}>
                            <Typography className="fontWeight500  fs18px g_color  fontWeight500">
                              State
                            </Typography>
                            <InputBase
                              className=" bRadius_8  fontWeight500 IntBorder fs16px  Width100 "
                              value={item.nodeState}
                              onChange={(e) =>
                                changeHandler(
                                  item.id,
                                  'nodeState',
                                  e.target.value
                                )
                              }
                              required
                              readOnly
                            />
                          </Grid>
                          <Grid item xs={12} sm={5} md={5}>
                            <Typography className="fs18px g_color  fontWeight500 ">
                              Country
                            </Typography>
                            <InputBase
                              className="IntBorder  fs16px   bRadius_8 fs16px   fontWeight500 Width100"
                              value={item.nodeCountry}
                              onChange={(e) =>
                                changeHandler(
                                  item.id,
                                  'nodeCountry',
                                  e.target.value
                                )
                              }
                              required
                              readOnly
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* </form> */}
                  </Grid>
                </Grid>

                <Grid
                  item
                  lg={5.9}
                  md={5.9}
                  sm={12}
                  xs={12}
                  // sx={{ height: '475px', overflow: 'hidden' }}
                >
                  <Typography className=" fs20px mb20px bold">
                    Mark Position on map
                  </Typography>
                  <DetailMap
                    updateLat={(e) =>
                      changeHandler(item.id, 'nodeGeoLatitude', e.toString())
                    }
                    updateLng={(e) =>
                      changeHandler(item.id, 'nodeGeoLongitude', e.toString())
                    }
                    changeable={true}
                    update={(lat, lng) => console.log(lat, lng)}
                    height={'430px'}
                  />
                </Grid>

                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    justifyContent: 'flex-end',
                  }}
                  className=" mt10px flex"
                >
                  {i != 0 && (
                    <Button
                      className="fs14px Greenborder d_color Transform_Capital   p_l-r10-30px"
                      onClick={() => removeNodes(item.id)}
                    >
                      Remove
                    </Button>
                  )}
                  <Button className="fs14px Greenborder d_bgcolor white_color p_l-r10-30px Transform_Capital ml10px ">
                    Apply
                  </Button>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  borderBottom: '1px solid silver',
                  margin: ' 3rem 0',
                  position: 'relative',
                }}
              >
                {nodesData.length - 1 == i && (
                  <MdAddCircleOutline
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '5%',
                      // border: "2px solid silver",
                    }}
                    className=" fs45px d_color"
                    onClick={() =>
                      setNodesData((s) => {
                        return [
                          ...s,
                          {
                            id: `node#${
                              +nodesData[nodesData.length - 1].id.split(
                                '#'
                              )[1] + 1
                            }`,
                            nodeID: '',
                            nodeName: '',
                            depth1: 0,
                            depth2: 0,
                            depth3: 0,
                            nodeAddress: '',
                            nodePincode: gatewayPincode,
                            nodeCity: gatewayCity,
                            nodeState: gatewayState,
                            nodeCountry: gatewayCountry,
                            nodeGeoLatitude: '',
                            nodeGeoLongitude: '',
                          },
                        ];
                      })
                    }
                  />
                )}
              </Grid>
            </Grid>
          ))}
      </Container>
    </>
  );
};

export default NodeDetails;
