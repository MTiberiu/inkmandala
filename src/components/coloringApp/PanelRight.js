import React from "react";
import Layers from "./Layers";
import PanelColorPiker from "./PaneColorPiker";
import "react-color-palette/lib/css/styles.css";
import "./PanelRight.scss";
const PanelRight = () => {
  let pathSelected = { style: { fill: "white" } };
  const selectedPath = (path) => {
    // when layer is clicked points to the actived path
    pathSelected = path;
  };

  const colorPathHandler = (color) => {
    // piker should color selected path from layer
    pathSelected.style.fill = color;
  };
  return (
    <div className="panel right">
      <div className="color-piker ">
        <PanelColorPiker
          selectedPathFromLayer={pathSelected}
          colorPath={colorPathHandler}
        />
      </div>
      <div className="active-color"> </div>
      <Layers selectedPath={selectedPath} />
    </div>
  );
};
export default PanelRight;
