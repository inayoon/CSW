import { Button } from "flowbite-react";
import logo from "../../public/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleNav = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <>
      {/* full container */}
      <div className="flex bg-bgPink justify-between">
        {/* image logo container */}
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="max-w-[12rem] md:max-w-[16rem] self-center "
            />
          </Link>
        </div>

        {/* navbar links container */}
        <div className="flex self-center gap-10 px-4 ">
          {/* navigators */}
          <div className="gap-4 self-center text-sm md:text-lg hidden md:flex ">
            <Link to="/rabbit" className="hover:text-ivory">
              Rabbit
            </Link>
            <Link to="/bear" className="hover:text-ivory">
              Bear
            </Link>
            <Link to="/diy-kit" className="hover:text-ivory">
              Kit
            </Link>
          </div>
          {/* Login link container */}
          <div className="flex gap-2">
            <Link to="/sign-in">
              <Button gradientDuoTone="pinkToOrange" className="rounded-full">
                Log In
              </Button>
            </Link>

            {/* Hamburger menu */}
            <div className="flex self-center md:hidden">
              <button onClick={toggleNav}>
                <RxHamburgerMenu />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {" "}
        {showDropdown && (
          <div className="flex flex-col bg-bgPink text-center py-2 md:hidden">
            <span className="hover:highlight w-16 mx-auto">
              {" "}
              <Link to="/rabbit"> Rabbit</Link>
            </span>
            <span className="hover:highlight w-12 mx-auto">
              <Link to="/bear">Bear</Link>
            </span>
            <span className="hover:highlight w-8 mx-auto">
              <Link to="/diy-kit">Kit</Link>
            </span>
          </div>
        )}
      </div>
    </>
  );
}
