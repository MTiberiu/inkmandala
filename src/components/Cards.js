import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import Nav from "./Nav";

const Cards = (props) => {
  // const [pages, setPages] = useState(props.pages);
  const [category, setCategory] = useState("");
  const savePageDataHandler = (getPageData) => {
    props.onClickGetPageData(getPageData);
  };
  const filterCardsHandler = (event) => {
    let id = event.target.id;
    setCategory(id);
  };

  let filterCards = props.pages.filter((card) => {
    if (category == "") {
      return card;
    } else if (card.categories[0] == category) {
      console.log("typeof card.categories[0]", typeof card.categories[0]);
      return card;
    }
  });

  return (
    <>
      <Nav filterCards={filterCardsHandler} />
      {filterCards.map((post, index) => (
        <Card
          key={post.id}
          id={post.id}
          onClickGetPageData={savePageDataHandler}
          index={index}
          post={post}
        />
      ))}
    </>
  );
};
export default Cards;
