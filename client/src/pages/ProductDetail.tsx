import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { Link, useLocation } from "react-router-dom";
import { Button, Dropdown } from "flowbite-react";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";

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
            <p className="px-3 pb-3 ">
              CSW produces a good quality bear for you🤎
            </p>
          </div>
          {/* dropdown menu for extra */}
          <div className="mt-2 p-2 border border-lightBrown rounded-md mr-2 lg:mr-[10rem] text-sm md:text-md">
            <Dropdown label="Ribbons & Pendants" inline>
              {options.map((item: string[]) => (
                <Dropdown.Item>{item}</Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <div className="mt-2 p-2 border border-lightBrown rounded-md mr-2 lg:mr-[10rem] text-sm md:text-md">
            <Dropdown label="Packaging" inline>
              <Dropdown.Item>Kraft Paper bag package</Dropdown.Item>
              <Dropdown.Item>Gift box package +$1</Dropdown.Item>
            </Dropdown>
          </div>

          {/* Picking up area */}
          <div className="my-2 text-gray-500 text-xs md:text-sm">
            Did you check the{" "}
            <Link
              to="/about"
              className="text-choco underline font-extrabold bg-lightPink"
            >
              availability
            </Link>
            ?
          </div>
          {/* pickingup area buttons */}
          <div className="mt-2 p-2 border border-lightBrown rounded-md mr-2 lg:mr-[10rem] text-sm md:text-md">
            <div>Pick-up</div>
            <div className="flex gap-2">
              <Button
                outline
                gradientDuoTone="redToYellow"
                className="w-1/2 h-1/4"
              >
                1 Yorkville
              </Button>
              <Button
                outline
                gradientDuoTone="redToYellow"
                className="w-1/2 h-1/4"
              >
                Finch
              </Button>
            </div>
          </div>
          {/* Buy now button */}
          <div className="mt-2 mr-2 lg:mr-[10rem]">
            <Button gradientDuoTone="redToYellow" className="w-full">
              Buy Now
            </Button>
          </div>

          <div className="flex gap-1 mt-2 mr-2 lg:mr-[10rem]">
            {/* Likes button */}
            <Button
              type="button"
              gradientDuoTone="pinkToOrange"
              className="w-1/2"
            >
              <FaHeartCirclePlus className="text-ivory w-5 h-5 lg:w-6 lg:h-6" />
              <span className="pl-2">Add to Likes</span>
            </Button>
            {/* Cart button */}
            <Button
              type="button"
              gradientDuoTone="pinkToOrange"
              className="w-1/2"
            >
              <FaCartPlus className="text-ivory w-5 h-5 lg:w-6 lg:h-6" />{" "}
              <span className="pl-2">Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
