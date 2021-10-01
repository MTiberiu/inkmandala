import { useState, useEffect } from "react";
import "./Layers.scss";
import Layer from "./Layer";

import { useLayers } from "./EventsContext";
const Layers = () => {
  const [iteratePaths, setIteratePaths] = useState([]);
  const propsLayer = useLayers();
  setIteratePaths(propsLayer);
  function addLayersHandler() {}
  console.log("Check Layers from Layers.js", propsLayer);

  return (
    <div className="layers">
      <button onClick={addLayersHandler}></button>
      You Got {iteratePaths.length} path to color
      {iteratePaths.map((layer, index) => {
        return (
          <Layer key={layer.style.fill} layer={layer} index={layer.index} />
        );
      })}
    </div>
  );
};
export default Layers;
