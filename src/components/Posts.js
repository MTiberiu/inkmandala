import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Cards from "./Cards";
import Loading from "./Loading";
import "./Posts.scss";

export default function Posts(props) {
  const savePageDataHandler = (getPageData) => {
    props.onClickGetPageData(getPageData);
  };
  const observer = useRef();
  const [pageNumber, setPageNumber] = useState(1);
  const [remainingPosts, setRemainingPosts] = useState("");
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([]);
  const ROUTE = process.env.REACT_APP_API;
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${ROUTE}posts?page=${pageNumber}&per_page=10`,
    }).then((res) => {
      setPages((prevPages) => {
        return [...prevPages, ...res.data];
      });
      setLoading(false);
      // let totalPages = res.headers["x-wp-totalpages"];
      const totalPosts = res.headers["x-wp-total"];
      setRemainingPosts(totalPosts - 10 * pageNumber);
    });
  }, [pageNumber]);

  const lastPageElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && remainingPosts > 0) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, remainingPosts]
  );
  return (
    <div className="Pages">
      <Cards onClickGetPageData={savePageDataHandler} pages={pages} />

      <div>{loading && <Loading />}</div>

      <div ref={lastPageElementRef} className="card-bg">
        <div className="card">{!loading && "No more Pages"}</div>
      </div>
    </div>
  );
}
