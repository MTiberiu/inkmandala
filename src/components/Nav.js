import React, { useState } from "react";
import "./Nav.scss";
function Nav(props) {
  const [activeMenuButton, setActiveMenuButton] = useState("");

  const filterCardsHandler = (e) => {
    props.filterCards(e);
    setActiveMenuButton(e.target.id);
  };
  return (
    <div className="Nav" style={{ width: "100%" }}>
      <ul>
        <li>
          <button
            id=""
            className={`${activeMenuButton === "" ? "active" : ""}`}
            onClick={filterCardsHandler}
          >
            Home
          </button>
        </li>
        <li>
          <button
            id={4}
            className={`${activeMenuButton === "4" ? "active" : ""}`}
            onClick={filterCardsHandler}
          >
            Easy
          </button>
        </li>
        <li>
          <button
            id={5}
            className={`${activeMenuButton === "5" ? "active" : ""}`}
            onClick={filterCardsHandler}
          >
            Medium
          </button>
        </li>
        <li>
          <button
            id={9}
            className={`${activeMenuButton === "9" ? "active" : ""}`}
            onClick={filterCardsHandler}
          >
            Hard
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
