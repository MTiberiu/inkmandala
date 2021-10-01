import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEvents } from "./EventsContext";

const ConvertSvgToXml = (props) => {
  const [iteratePaths, setIteratePaths] = useState(false);
  const clonedFunction = useEvents();
  const [svgXml, setSvgXml] = useState("");
  axios({
    method: "GET",
    url: props.svgXml,
  }).then((res) => {
    setSvgXml(res.data);
  });

  useEffect(() => {
    setIteratePaths(true);
  }, []);

  if (iteratePaths) {
    clonedFunction(props.paths);
  }

  return (
    <>
      <div id="svg" dangerouslySetInnerHTML={{ __html: svgXml }} />
    </>
  );
};
export default ConvertSvgToXml;
