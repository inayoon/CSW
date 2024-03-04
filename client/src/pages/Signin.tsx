import React from "react";
import { Link } from "react-router-dom";
import banner from "../../public/csw_white.png";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignIn() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row">
        {/* left side */}
        <div className="w-full  bg-ivory grid place-items-center md:w-1/2 md:h-screen md:order-2">
          <Link to="/">
            <img src={banner} className="" />
          </Link>
        </div>

        {/* right side */}
        <div className="w-full py-6 bg-bgPink md:w-1/2 h-screen md:grid md:place-items-center">
          <form className="w-1/2 flex flex-col gap-3 mx-auto">
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
            <Button gradientDuoTone="redToYellow" type="submit">
              Log In
            </Button>
            <p className="text-sm">
              Don&apos;t have an account?
              <Link to="/sign-up" className="text-ivory ml-2">
                Sign Up💘
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
