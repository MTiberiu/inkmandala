import React from "react";
const HeaderAppButtonIcon = (props) => {
  return (
    <svg className="icon">
      {props.iconHref}
      <use href={props.iconHref} xlinkHref={props.iconHref}></use>
    </svg>
  );
};
export default HeaderAppButtonIcon;
