import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
const Head = ({ title, slug }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <link rel="canonical" href={`https://inkmandala.com/${slug}`} />
      </Helmet>
    </HelmetProvider>
  );
};
export default Head;
