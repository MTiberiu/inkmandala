import React from "react";
import { useState } from "react";
import "./Layers.scss";
import Layer from "./Layer";

import { useLayers } from "./EventsContext";
const Layers = (props) => {
  const [iteratePaths, setIteratePaths] = useState([]);
  const propsLayer = useLayers();
  function addLayersHandler() {
    setIteratePaths(propsLayer);
  }

  function test() {
    setTimeout(() => {
      addLayersHandler();
    }, 100);
  }
  test();

  return (
    <div className="layers">
      {/* <button onClick={addLayersHandler}></button>
      You Got {iteratePaths.length - 1} path to color */}
      {iteratePaths.map((layer, index) => {
        return (
          <Layer
            key={layer.index}
            layer={layer}
            selectedPath={props.selectedPath}
            index={layer.index}
          />
        );
      })}
    </div>
  );
};
export default Layers;
