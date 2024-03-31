import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { Link, useLocation } from "react-router-dom";
import { Button, Dropdown } from "flowbite-react";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";

const packaging = ["Kraft Paper bag package", "Gift box package +$1"];

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
  const [optionPicked, setOptionPicked] = useState([]);
  const [wrapping, setWrapping] = useState("");
  const [pickUp, setPickUp] = useState("");
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

  const handleOptions = (item) => {
    setOptionPicked([...optionPicked, item]);
  };
  const handlePackaging = (item) => {
    setWrapping(item);
  };
  const handlePickUp = (item) => {
    setPickUp(item);
  };

  const handleOptionDelete = (i: number) => {
    setOptionPicked((prev) => {
      const updatedOption = [...prev];
      updatedOption.splice(i, 1);
      return updatedOption;
    });
  };
  const handlePackagingDelete = () => {
    setWrapping("");
  };
  const handlePickUpDelete = () => {
    setPickUp("");
  };
  return (
    <section>
      <div className="flex-col md:flex md:flex-row">
        {/* product image slide */}
        <div className="w-3/5 mx-auto pt-4 md:w-[40%] md:my-6 md:p-3">
          <ImageGallery items={gallery} showPlayButton={false} />
        </div>

        {/* half of product info */}
        <div className="p-3 md:w-1/2 md:my-6 py-3 md:p-4">
          {/* title area */}

          <h1 className=" text-lightBrown font-bold tracking-tight md:text-2xl">
            {title}
          </h1>

          {/* price area */}
          <div className="flex justify-between mt-1 pr-2 md:pr-[10rem]">
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
          <div className="text-center text-sm md:text-md border border-lightBrown rounded-md mr-2 mt-1 lg:mr-[5rem]">
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

          {/* start-point of form */}
          {/* dropdown menu for extra */}
          <form>
            <div className="mt-2 p-2 border border-lightBrown rounded-md mr-2 lg:mr-[5rem] text-sm md:text-md">
              <Dropdown label="Ribbons & Pendants" inline>
                {options.map((item: string[]) => (
                  <Dropdown.Item onClick={() => handleOptions(item)}>
                    {item}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div className="mt-2 p-2 border border-lightBrown rounded-md mr-2 lg:mr-[5rem] text-sm md:text-md">
              <Dropdown label="Packaging" inline>
                {packaging.map((p) => (
                  <Dropdown.Item onClick={() => handlePackaging(p)}>
                    {p}
                  </Dropdown.Item>
                ))}
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
            <div className="mt-2 p-2 border border-lightBrown rounded-md mr-2 lg:mr-[5rem] text-sm md:text-md">
              <div>Pick-up</div>
              <div className="flex gap-2">
                <Button
                  outline
                  gradientDuoTone="redToYellow"
                  className="w-1/2 h-1/4"
                  onClick={() => handlePickUp("1 Yorkville")}
                >
                  1 Yorkville
                </Button>
                <Button
                  outline
                  gradientDuoTone="redToYellow"
                  className="w-1/2 h-1/4"
                  onClick={() => handlePickUp("Finch")}
                >
                  Finch
                </Button>
              </div>
            </div>
            {/* Buy now button */}
            <div className="mt-2 mr-2 lg:mr-[5rem]">
              <Button gradientDuoTone="redToYellow" className="w-full">
                Buy Now
              </Button>
            </div>
          </form>

          <div className="flex gap-1 mt-2 mr-2 lg:mr-[5rem]">
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

          {/* display options */}
          {optionPicked.length > 0 && (
            <>
              <h1 className="mt-3 text-lightBrown tracking-tight md:text-xl">
                Options
              </h1>
              <div className="md:mr-[5rem] my-[1%] border-[0.2px] border-lightBrown/30"></div>
            </>
          )}
          {optionPicked &&
            optionPicked.map((item, index) => (
              <div className="flex justify-between">
                <div className="p-2 mb-1 bg-ivory/50 rounded-md shadow-md text-choco text-sm">
                  {item}
                </div>
                <button
                  key={index}
                  className="self-center pr-2 md:mr-[5rem]"
                  onClick={() => handleOptionDelete(index)}
                >
                  X
                </button>
              </div>
            ))}

          {/* packaging area */}
          {wrapping.length > 0 && (
            <h1 className="mt-3 text-lightBrown tracking-tight md:text-xl">
              Packaging
            </h1>
          )}
          {wrapping && (
            <>
              <div className="md:mr-[5rem] my-[1%] border-[0.2px] border-lightBrown/30"></div>
              <div className="flex justify-between">
                <div className="p-2 bg-ivory/50 rounded-md shadow-md text-choco text-sm">
                  {wrapping}
                </div>
                <button
                  className="self-center pr-2 md:mr-[5rem]"
                  onClick={handlePackagingDelete}
                >
                  X
                </button>
              </div>
            </>
          )}

          {/* packingup area */}
          {pickUp.length > 0 && (
            <h1 className="mt-3 text-lightBrown tracking-tight md:text-xl">
              Pick-up
            </h1>
          )}
          {pickUp && (
            <>
              <div className="md:mr-[5rem] my-[1%] border-[0.2px] border-lightBrown/30"></div>
              <div className="flex justify-between">
                <div className="w-1/2 p-2 bg-ivory/50 rounded-md shadow-md text-choco text-sm text-center">
                  {pickUp}
                </div>
                <button
                  className="self-center pr-2 md:mr-[5rem]"
                  onClick={handlePickUpDelete}
                >
                  X
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
