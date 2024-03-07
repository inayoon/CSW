import { Footer } from "flowbite-react";
import React from "react";
import footer from "../../public/csw footer.png";
import { FaSquareInstagram } from "react-icons/fa6";

export default function FooterCom() {
  return (
    <Footer
      container
      className=" border border-t-8 border-lightBrown max-h-28 "
    >
      <div className="flex justify-center w-full max-w-6xl ">
        <div className="">
          <img
            src={footer}
            alt="logo"
            className="max-w-[10rem] max-h-16 items-center md:max-h-20"
          />
        </div>
        <div className="flex gap-14 items-center">
          <div className="flex flex-col items-center text-choco">
            <div>Policy</div>
            <FaSquareInstagram />
          </div>
          <div className="flex flex-col items-center text-choco">
            <div>Follow</div>
            <FaSquareInstagram />
          </div>
          <div>
            <Footer.Copyright
              href="#"
              by="Cuties save the world"
              year={new Date().getFullYear()}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
