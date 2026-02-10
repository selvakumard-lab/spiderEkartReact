import React, { Fragment } from "react";
import { Rating } from "react-simple-star-rating";
import { H3 } from "../../../AbstractElements";
import { ProductReview } from "../../../Constant";

const StarRatings = () => {
  return (
    <Fragment>
      <div className="product-page-details">
        <H3>{"Women white top"}</H3>
        <div className="pro-review">
          <div className="d-flex">
            <Rating fillColor="#ffa800" initialValue={Math.random() * 5} size={17} />
            <span>{ProductReview}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default StarRatings;
