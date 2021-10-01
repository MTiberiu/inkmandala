import React from "react";
import HeaderAppButtonIcon from "./HeaderAppButtonIcon";
import "./HeaderAppButton.scss";
const HeaderAppButton = (props) => {
  return (
    <button
      className={props.className}
      id={props.id}
      alt={props.title}
      title={props.title}
      onClick={props.setActive}
    >
      <HeaderAppButtonIcon iconHref={props.icoHref} />
    </button>
  );
};
export default HeaderAppButton;
