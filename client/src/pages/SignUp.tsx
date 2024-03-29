import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import banner from "../../public/csw_white.png";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import axios from "axios";
import OAuth from "../components/OAuth";

interface FormValue {
  username: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValue>({ mode: "onChange" });

  const onSubmit = async ({ username, email, password }: FormValue) => {
    const body = {
      username,
      email,
      password,
    };
    try {
      setLoading(true);
      setErrorMessage("");
      const res = await axios.post("/api/auth/signup", body);
      const data = await res.data;
      console.log(data);
      setLoading(false);
      reset();
      if (res.status === 200) {
        navigate("/sign-in");
      }
      return data;
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 && data === "User already exists") {
          setErrorMessage("User already exists.");
        }
      }
      setLoading(false);
    }
  };

  const userName = {
    required: "This field is required",
    minLength: {
      value: 2,
      message: "Username must be at least 2 characters",
    },
  };
  const userEmail = {
    required: "This field is required",
  };
  const userPassword = {
    required: "This field is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    pattern: {
      value: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{6,}$/,
      message: "Minimum 6 with letters, numbers, and special",
    },
  };

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-1/2 flex flex-col gap-3 mx-auto"
          >
            <div className="font-[900] text-xl  text-choco md:text-2xl">
              Sign Up
            </div>
            <div>
              <Label htmlFor="username" value="Username" />
              <TextInput
                type="text"
                placeholder="Enter your username"
                id="username"
                {...register("username", userName)}
              />
              {errors?.username && (
                <div>
                  <span className="font-semibold text-sm tracking-tight text-choco">
                    📛{errors.username.message}
                  </span>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                type="email"
                placeholder="Enter your email"
                id="email"
                {...register("email", userEmail)}
              />
              {errors?.email && (
                <div>
                  <span className="font-semibold text-sm tracking-tight text-choco">
                    📛{errors.email.message}
                  </span>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput
                type="password"
                placeholder="Enter your password"
                id="password"
                {...register("password", userPassword)}
              />
              {errors?.password && (
                <div>
                  <span className="font-semibold text-sm tracking-tighter text-choco md:whitespace-nowrap">
                    📛{errors.password.message}
                  </span>
                </div>
              )}
            </div>
            <Button
              gradientDuoTone="redToYellow"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-2">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
            <p className="text-sm">
              Have an account?
              <Link to="/sign-in" className="text-ivory ml-2">
                Log In💘
              </Link>
            </p>
            {errorMessage && (
              <Alert className=" bg-choco text-bgPink font-bold items-center p-2 ">
                {errorMessage}
              </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
