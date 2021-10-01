import React from "react";
import { useLayers } from "./EventsContext";
import "./Layer.scss";
const Layer = (props) => {
  const Layers = useLayers();
  function addLayersHandler() {
    props.selectedPath(Layers[props.index]);
  }

  return (
    <div
      className={`layer-container layer-container${Layers[props.index].index}`}
      onClick={addLayersHandler}
    >
      <div
        className="shape-color"
        id={`#path-layer${Layers[props.index].index}`}
        index={props.layer.index}
        // onWheel={Layers[props.index].onwheel}
        key={props.layer}
      ></div>
      <div className="shape-index"> Shape {Layers[props.index].index} </div>
    </div>
  );
};
export default Layer;
