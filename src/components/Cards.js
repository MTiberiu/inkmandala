import React from "react";
import { useState } from "react";
import Card from "./Card";
import Nav from "./Nav";

const Cards = ({ pages, onClickGetPageData }) => {
  // const [pages, setPages] = useState(props.pages);
  const [category, setCategory] = useState(0);
  const savePageDataHandler = (getPageData) => {
    onClickGetPageData(getPageData);
  };
  const filterCardsHandler = (event) => {
    let id = Number(event.target.id);
    setCategory(id);
  };

  let filterCards = pages.filter((card) => {
    const postCategory = card.categories[0];
    if (category === 0 || postCategory === category) {
      return card;
    }
    return null;
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
