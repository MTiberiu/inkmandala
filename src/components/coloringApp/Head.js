import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
const Head = (props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <link rel="canonical" href={`https://inkmandala.com/${props.slug}`} />
      </Helmet>
    </HelmetProvider>
  );
};
export default Head;
