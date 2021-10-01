import React from "react";
const Page = (props) => {
  const post = props.info.post;
  const svgLink = post.acf.color_svg;
  const title = post.title.rendered;
  const designRatioLength = post.acf.design_ratio.length;

  function getPageInfoHandler() {
    props.onClickGetPageData(post);
  }

  return (
    <>
      <div onClick={getPageInfoHandler} className="card-bg" key={props.id}>
        <div className={designRatioLength === 1 ? "card full-page" : "card"}>
          <img src={svgLink} alt={title} />
          <div className="title">
            {title.replace("&#8211;", "-").replace("&#8217;", "'").slice(0, 25)}{" "}
            ...
          </div>
          <div className="page-number">- {post.id} -</div>
        </div>
      </div>
    </>
  );
};
export default Page;
