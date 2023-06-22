import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteManageTable from "./userDEviceTable";
import SiteDetail from "../../siteDetail";

const Index = ({ data, reRender }) => {
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
          reRender={reRender}
        />
      )}
    </>
  );
};

export default Index;
