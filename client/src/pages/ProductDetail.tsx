import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { Link, useLocation } from "react-router-dom";
import { PriceZone } from "../components/CardItems";

interface Product {
  _id: string;
  images: string[];
  title: string;
  stock: number;
  sold: number;
  category: string;
  price: number;
  options: string[];
}

export default function ProductDetail() {
  const [gallery, setGallery] = useState<
    { original: string; thumbnail: string }[]
  >([]);

  const {
    state: {
      product: { _id, images, title, stock, sold, category, price, options },
    },
  } = useLocation();
  useEffect(() => {
    if (images?.length > 0) {
      const bears: string[] = [];
      images.map((imageName: string) => {
        return bears.push({
          original: imageName,
          thumbnail: imageName,
        });
      });
      setGallery(bears);
    }
  }, [images]);
  return (
    <section>
      <div className="flex">
        {/* product image slide */}
        <div className="w-1/2 my-6 p-4">
          <ImageGallery items={gallery} showPlayButton={false} />
        </div>

        {/* half of product info */}
        <div className="w-1/2 my-6 py-3 md:p-4">
          {/* title area */}

          <h1 className=" text-lightBrown font-bold tracking-tight md:text-2xl">
            {title}
          </h1>

          {/* price area */}
          <div className="flex justify-between mt-1 pr-2 lg:pr-[10rem]">
            <div>
              <p className="text-sm font-extrabold text-red-600 md:text-2xl">
                {Math.round((1 - `${price}` / `${price * 1.5}`) * 100)}%
              </p>
            </div>
            <div className="flex gap-1 pr-3">
              <p className="text-sm line-through  self-center md:text-xl text-gray-400">
                ${`${price * 1.5}`}
              </p>
              <p className="text-sm font-extrabold md:text-2xl">${price}</p>
            </div>
          </div>

          {/* stock */}
          <div className="text-sm text-gray-400">
            stock: {stock} {title} left
          </div>

          {/* notice */}
          <div className="text-center text-sm md:text-md border border-lightBrown rounded-md mr-2 mt-1 lg:mr-[10rem]">
            <div className="p-3">✅Before you buy</div>
            <p className="px-3">
              Please read this{" "}
              <Link
                to="/about"
                className="text-choco underline font-extrabold bg-lightPink"
              >
                note
              </Link>
              💌
            </p>
            <p className="px-3 pb-3">
              CSW produces a good quality bear for you🤎
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
