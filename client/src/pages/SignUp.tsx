import React from "react";
import { Link } from "react-router-dom";
import banner from "../../public/csw_white.png";
import { Label, TextInput } from "flowbite-react";

export default function SignUp() {
  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* right side */}
        <div className="w-1/2 bg-bgPink grid place-items-center ">
          <form className="flex flex-col gap-3">
            <div>
              <Label value="Username" />
              <TextInput
                type="text"
                placeholder="Enter your username"
                id="username"
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Enter your email"
                id="email"
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Enter your password"
                id="password"
              />
            </div>
          </form>
        </div>

        {/* left side */}
        <div className="w-1/2 h-screen bg-ivory grid place-items-center">
          <Link to="/">
            <img src={banner} className="" />
          </Link>
        </div>
      </div>
    </div>
  );
}
