import { Button } from "flowbite-react";
import logo from "../../public/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import axios from "axios";
import { singOutSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";

export default function Header({ isAuth }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleNav = () => {
    setShowDropdown((prev) => !prev);
  };
  const handleLogOut = async () => {
    try {
      const response = await axios.post("/api/user/signout");
      const data = response.data;
      if (response.status !== 200) {
        console.log(data.response.data);
      }
      dispatch(singOutSuccess());
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
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
            <Link to="/product/rabbit" className="hover:text-ivory">
              Rabbit
            </Link>
            <Link to="/product/bear" className="hover:text-ivory">
              Bear
            </Link>
            <Link to="/product/diy-kit" className="hover:text-ivory">
              Kit
            </Link>
            <Link to="/product/new" className="hover:text-ivory">
              <RiAdminFill />
            </Link>
            {isAuth ? (
              <Link to="/favorite">
                <FaHeartCirclePlus className="w-6 h-6 hover:text-ivory" />
              </Link>
            ) : (
              ""
            )}
          </div>
          {/* Login link container */}

          <div className="flex gap-2">
            {isAuth ? (
              <Button
                gradientDuoTone="pinkToOrange"
                onClick={handleLogOut}
                className="rounded-full"
              >
                Log Out
              </Button>
            ) : (
              <Link to="/sign-in">
                <Button gradientDuoTone="pinkToOrange" className="rounded-full">
                  Log In
                </Button>
              </Link>
            )}

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
