import React from "react";
import Page from "./Page";
const Card = (props) => {
  const savePageDataHandler = (getPageData) => {
    props.onClickGetPageData(getPageData);
  };
  return (
    <Page
      id={props.post.id}
      onClickGetPageData={savePageDataHandler}
      info={props}
    />
  );
};
export default Card;
