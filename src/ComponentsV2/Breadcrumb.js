import React, { useEffect } from "react";
import { Grid, Typography, Breadcrumbs } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Breadcrumb = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = (ele) => {
    const breadcrumb = JSON.parse(localStorage.getItem("livestockBreadcrumb"));
    const jsonObject = breadcrumb.map(JSON.stringify);
    const uniqueSet = new Set(jsonObject);
    const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    const eleIndex = uniqueArray.findIndex((el) => el?.link === ele?.link);
    const newArr = uniqueArray?.slice(0, eleIndex + 1);
    localStorage.setItem("livestockBreadcrumb", JSON.stringify(newArr));
    navigate(`/${ele?.link}`);
  };

  useEffect(() => {
    const handleEve = () => {
      const currentPath = window.location.pathname;
      handleClick({ link: currentPath?.slice(1) });
    };
    window.addEventListener("popstate", handleEve);

    return () => window.removeEventListener("popstate", handleEve);
  }, []);
  return (
    <Grid container direction="row" justifyContent="start">
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        className="fs16px bold"
        sx={{ ml: 1 }}
      >
        <Link to="/" className="textDecorNone" key="1">
          <Typography
            className="bold"
            sx={{ color: "#B58B5D", fontSize: "16px" }}
          >
            Dashboard
          </Typography>
        </Link>
        {data?.map((ele) => (
          <Link
            to={`/${ele.link}`}
            className="textDecorNone"
            key="2"
            onClick={() => handleClick(ele)}
          >
            <Typography
              className="bold "
              sx={{
                color: "#535353",
                fontSize: "16px",
                textTransform: "Capitalize",
              }}
            >
              {ele.label}
            </Typography>
          </Link>
        ))}
      </Breadcrumbs>
    </Grid>
  );
};

export default Breadcrumb;
