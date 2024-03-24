import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";

export default function CardItems({
  product,
  product: { _id, images, title, price, category },
}) {
  const [hoveredId, setHoveredId] = useState(null);
  const handleButtons = (id) => {
    setHoveredId(id);
  };
  const navigate = useNavigate();
  return (
    <ul
      className="overflow-hidden cursor-pointer"
      onMouseEnter={() => handleButtons(_id)}
      onMouseLeave={() => handleButtons(null)}
      onClick={() => {
        navigate(`/product/${category}/${_id}`, { state: { product } });
      }}
    >
      {/* image tag */}
      <div className="relative">
        <img src={images[0]} alt={title} />
        {hoveredId === _id && (
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
            <Button
              type="button"
              gradientDuoTone="redToYellow"
              className="p-0 w-10 h-10 opacity-60 hover:opacity-90 rounded-full lg:w-12 lg:h-12"
            >
              <FaHeartCirclePlus className="text-choco w-5 h-5 lg:w-7 lg:h-7" />
            </Button>
            <Button
              type="button"
              gradientDuoTone="redToYellow"
              className="p-0 w-10 h-10 opacity-60 hover:opacity-90 rounded-full lg:w-12 lg:h-12"
            >
              <FaCartPlus className="text-choco w-5 h-5 lg:w-7 lg:h-7" />
            </Button>
          </div>
        )}
      </div>

      {/*a box covering title and price  */}
      <div className="m-2 px-1 flex justify-between">
        {/* title and category box */}
        <div className="flex flex-col">
          <h3 className="text-sm font-extrabold md:text-lg">{title}</h3>
          <h3 className=" text-sm text-gray-400">{category}</h3>
        </div>

        {/* price and sale% zone */}
        <PriceZone product={product} />
      </div>
    </ul>
  );
}

export function PriceZone({ product, product: { price } }) {
  return (
    <div className="flex gap-1 ">
      <p className="text-sm font-extrabold text-red-600 md:text-lg">
        {Math.round((1 - `${price}` / `${price * 1.5}`) * 100)}%
      </p>
      <p className="text-sm font-extrabold md:text-lg ml-2">${price}</p>
      <p className="text-sm  line-through md:text-lg text-gray-400">
        ${`${price + price * 0.5}`}
      </p>
    </div>
  );
}
