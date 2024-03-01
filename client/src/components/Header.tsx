import { Button, Navbar } from "flowbite-react";
import logo from "../../public/logo.png";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <div className="flex bg-bgPink justify-between self-center">
      <div className="flex ">
        <Link to="/" className="self-center ">
          <img src={logo} className="max-w-[180px] md:max-w-[14rem]" />
        </Link>
      </div>
      <div className="flex self-center gap-10">
        <div className="flex gap-4 self-center text-sm md:text-lg">
          <Link to="/">Home</Link>
          <Link to="/all">All</Link>
          <Link to="/diy-kit">Kit</Link>
        </div>

        <div className="flex gap-2">
          <Link to="/sign-up">
            <Button gradientDuoTone="pinkToOrange" className="rounded-full">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
