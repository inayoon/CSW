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
  const [productInfo, setProductInfo] = useState();
  const location = useLocation();
  const [optionPicked, setOptionPicked] = useState([]);
  const [pickUp, setPickUp] = useState("");
  const [numOfItems, setNumOfItems] = useState(1);
  const [gallery, setGallery] = useState<
    { original: string; thumbnail: string }[]
  >([]);

  useEffect(() => {
    // 페이지가 처음 렌더링될 때만 실행
    setProductInfo(location.state);
  }, []);
  const data = location.state.product;

  const { title, images, stock, sold, category, price, options } = data;

  console.log(title);

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
  const handlePickUp = (item) => {
    setPickUp(item);
  };

  const handleOptionDelete = (i: number) => {
    const updatedOptions = [...optionPicked];
    updatedOptions.splice(i, 1);
    setOptionPicked(updatedOptions);
  };

  const handlePickUpDelete = () => {
    setPickUp("");
  };

  const increaseNum = () => {
    setNumOfItems((prev) => prev + 1);
  };
  const decreaseNum = () => {
    if (numOfItems > 1) {
      setNumOfItems((prev) => prev - 1);
    }
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
          <div className="flex justify-between mt-1 lg:mr-[5rem]">
            <div>
              <p className="text-sm font-extrabold text-red-600 md:text-2xl">
                {Math.round((1 - `${price}` / `${price * 1.5}`) * 100)}%
              </p>
            </div>
            <div className="flex gap-1">
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
              <Dropdown label="Ribbons & Necklaces" inline>
                {options.map((item: string[], index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleOptions(item)}
                  >
                    {item}
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
            {/* display options */}
            {optionPicked.length > 0 && (
              <>
                <h1 className="mt-3 text-lightBrown tracking-tight font-semibold">
                  Options
                </h1>
                <div className="mr-2 mt-1 lg:mr-[5rem] my-[1%] border-[0.2px] border-lightBrown/30"></div>
              </>
            )}
            {optionPicked &&
              optionPicked.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div className="p-2 mb-1 bg-ivory/50 rounded-md shadow-md text-choco text-sm">
                    {item}
                  </div>
                  <button
                    key={index}
                    className="self-center pr-2 lg:mr-[5rem]"
                    onClick={() => handleOptionDelete(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            {/* packingup area */}
            {pickUp.length > 0 && (
              <h1 className="mt-3 text-lightBrown tracking-tight font-semibold">
                Pick-up
              </h1>
            )}
            {pickUp && (
              <>
                <div className="mr-2 mt-1 lg:mr-[5rem] my-[1%] border-[0.2px] border-lightBrown/30"></div>
                <div className="flex justify-between">
                  <div className="w-1/2 p-2 bg-ivory/50 rounded-md shadow-md text-choco text-sm text-center">
                    {pickUp}
                  </div>
                  <button
                    className="self-center pr-2 lg:mr-[5rem]"
                    onClick={handlePickUpDelete}
                  >
                    X
                  </button>
                </div>
              </>
            )}

            {/* Total price area */}
            {(optionPicked.length > 0 || pickUp) && (
              <>
                <h1 className="mt-3 text-lightBrown tracking-tight font-semibold">
                  Total Price
                </h1>
                <div className="mr-2 mt-1 lg:mr-[5rem] my-[1%] border-[0.2px] border-lightBrown/30"></div>
                {/* div wrapping the amount and price areas */}
                <div className="flex justify-between lg:mr-[5rem] ">
                  <div>
                    <button onClick={decreaseNum}>
                      <div className="py-2 px-5 w-6 bg-ivory rounded-l-lg font-bold text-xl">
                        -
                      </div>
                    </button>
                    <button
                      onClick={increaseNum}
                      className="py-2 px-5 font-bold"
                    >
                      {numOfItems}
                    </button>
                    <button>
                      <div className="py-2 px-5 w-6 bg-ivory rounded-r-lg font-bold text-xl">
                        +
                      </div>
                    </button>
                  </div>
                  {optionPicked.length === 0 && pickUp && <div>${price}</div>}
                  {optionPicked.length > 0 && (
                    <div className="mr-2 font-semibold text-red-500">
                      ${price * numOfItems + optionPicked.length}
                    </div>
                  )}
                </div>
              </>
            )}

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
        </div>
      </div>
    </section>
  );
}
