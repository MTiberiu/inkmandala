import React from "react";
import { useLayers } from "./EventsContext";
import { useColorPalette } from "./EventsContext";
import "./Layer.scss";
const Layer = (props) => {
  const Layers = useLayers();
  const colorPallete = useColorPalette();
  function addLayersHandler(event) {
    props.selectedPath(Layers[props.index]);
    colorPallete(
      event.target.dataset.fillH,
      event.target.dataset.fillS,
      event.target.dataset.fillL
    );
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
      <div className="shape-index"> Shape {Layers[props.index].index - 5} </div>
    </div>
  );
};
export default Layer;
