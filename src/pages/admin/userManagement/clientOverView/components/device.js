import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteManageTable from "./siteTable";
import SiteDetail from "../../siteDetail";

const Index = ({ data, reRander }) => {
  const { state } = useLocation();

  const [showSiteDetail, setShowSiteDetail] = useState(false);
  const showDetail = (val) => {
    setShowSiteDetail(val);
  };

  useEffect(() => {
    console.log("site>", state);
    console.log("site>>", data);
  }, [state]);
  return (
    <>
      {showSiteDetail ? (
        <SiteDetail showDetail={showDetail} data={data && data} />
      ) : (
        <SiteManageTable
          showDetail={showDetail}
          data={data && data}
          reRander={reRander}
        />
      )}
    </>
  );
};

export default Index;
