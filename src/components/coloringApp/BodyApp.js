import React, { useEffect, useRef, useState } from "react";
import "./BodyApp.scss";
import Head from "./Head";
import HeaderApp from "./HeaderApp";
import IconSimbolsLoad from "./IconSimbolsLoad";
import PanelLeft from "./PanelLeft";
import PanelRight from "./PanelRight";
import FooterApp from "./FooterApp";
import { FunctionalityProvider } from "./EventsContext";
import ConvertSvgToXml from "./ConvertSvgToXml";

const BodyApp = (props) => {
  const componentRef = useRef(null);
  const [paths, setPaths] = useState(null);

  useEffect(() => {
    const getPaths = componentRef.current;
    setPaths(getPaths);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const info = props.pageInfo;
  const title = info.title.rendered
    .replace("&#8211;", " ")
    .replace("&#8217;", "'");
  window.history.pushState("", "", info.slug);
  return (
    <div id="container" ref={componentRef}>
      <FunctionalityProvider>
        <Head title={title} slug={info.slug} />
        <HeaderApp />
        <div className="canvas-design">
          <PanelLeft info={info} onClickClosePage={props.onClickClosePage} />
          <div className="canvas">
            {" "}
            <canvas></canvas>
            <ConvertSvgToXml svgXml={info.acf.color_svg} paths={paths} />
          </div>

          <PanelRight />
        </div>

        <FooterApp />
      </FunctionalityProvider>
      {/* <p>
        {info.title.rendered.replace("&#8211;", "-").replace("&#8217;", "'")}{" "}
      </p> */}

      <div>
        <IconSimbolsLoad />
      </div>
    </div>
  );
};

export default BodyApp;
