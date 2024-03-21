import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "./ImageSlider";

export default function CardItems({
  product,
  product: { _id, images, title, price, category },
}) {
  return (
    <ul className="overflow-hidden cursor-pointer">
      {/* image tag */}
      <div className="">
        <img className="" src={images[0]} alt={title} />
      </div>

      {/*a box covering title and price  */}
      <div className="m-2 px-1 flex justify-between">
        {/* title and category box */}
        <div className="flex flex-col">
          <h3 className="text-sm font-extrabold md:text-lg">{title}</h3>
          <h3 className=" text-sm text-gray-400">{category}</h3>
        </div>

        {/* price and sale% zone */}
        <div className="flex gap-1 ">
          <p className="text-sm font-extrabold md:text-lg">${price}</p>
          <p className="text-sm  line-through md:text-lg text-gray-400">
            ${`${price + price * 0.5}`}
          </p>
          <p className="text-sm font-extrabold text-lightBrown md:text-lg">
            {Math.round((1 - `${price}` / `${price * 1.5}`) * 100)}%
          </p>
        </div>
      </div>
    </ul>
  );
}
