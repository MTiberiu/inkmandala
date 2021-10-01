import React from "react";
import "./Nav.scss";
function Nav(props) {
  const filterCardsHandler = (event) => {
    props.filterCards(event);
  };
  return (
    <div className="Nav" style={{ width: "100%" }}>
      <ul>
        <li>
          <a id="" onClick={filterCardsHandler}>
            Home
          </a>
        </li>
        <li>
          <a id={4} onClick={filterCardsHandler}>
            Easy
          </a>
        </li>
        <li>
          <a id={5} onClick={filterCardsHandler}>
            Medium
          </a>
        </li>
        <li>
          <a id={9} onClick={filterCardsHandler}>
            Hard
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
