import React from "react";
import "./Loading.scss";
function Loading(param) {
  const pageResult = () => {
    const pages = 10;
    let skeletonPages = [];
    for (let i = 0; i < pages; i++) {
      skeletonPages.push(
        <div key={i} className="card-bg skeleton">
          <div className="card">
            <div className="skeleton-card-img skeleton"> </div>
            <div className="title skeleton-title skeleton"></div>
            <div className="page-number skeleton-page-number skeleton"></div>
          </div>
        </div>
      );
    }

    return skeletonPages;
  };
  const loadedData = pageResult();
  // const loadedParams = param.loadedData;
  const showSkeletonPages = [...loadedData];
  return <div className="Pages loading">{showSkeletonPages}</div>;
}

export default Loading;
