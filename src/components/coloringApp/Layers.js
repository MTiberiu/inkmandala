import React from "react";
import { useState } from "react";

import "./Layers.scss";
import Layer from "./Layer";

import { useLayers } from "./EventsContext";
const Layers = ({ selectedPath }) => {
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
      {iteratePaths.map((layer, index) => {
        return (
          <Layer
            key={layer.index}
            layer={layer}
            selectedPath={selectedPath}
            index={layer.index}
          />
        );
      })}
    </div>
  );
};
export default Layers;
