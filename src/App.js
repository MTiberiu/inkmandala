import React, { useState } from "react";
// import Nav from "./components/Nav";
import Footer from "./components/Footer";

import "./App.scss";
import Posts from "./components/Posts";
import BodyApp from "./components/coloringApp/BodyApp";

function App() {
  const [displaySinglePage, setDisplaySinglePage] = useState(false);
  const [singlePageInfo, setSinglePageInfo] = useState({});

  const savePageDataHandler = (getPageData) => {
    setSinglePageInfo(getPageData);
    setDisplaySinglePage(true);
  };

  const closePageDataHandler = () => {
    setDisplaySinglePage(false);
  };

  return (
    <div className="App">
      {displaySinglePage && (
        <BodyApp
          onClickClosePage={closePageDataHandler}
          pageInfo={singlePageInfo}
        />
      )}
      <Posts onClickGetPageData={savePageDataHandler} />
      <Footer />
    </div>
  );
}

export default App;
