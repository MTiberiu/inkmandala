import React from "react";
import Layers from "./Layers";
import PanelColorPiker from "./PaneColorPiker";
import "react-color-palette/lib/css/styles.css";
import "./PanelRight.scss";
const PanelRight = () => {
  let pathSelected = { style: { fill: "white" } };
  const selectedPath = (path) => {
    pathSelected = path;
    path.setAttribute("filter", "url(#ciqcd)");
  };

  const colorPathHandler = (color) => {
    pathSelected.style.fill = color;
  };
  return (
    <div className="panel right">
      <div className="color-piker ">
        <PanelColorPiker colorPath={colorPathHandler} />
      </div>
      <div className="active-color"> </div>
      <Layers selectedPath={selectedPath} />
    </div>
  );
};
export default PanelRight;
