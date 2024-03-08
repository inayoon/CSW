import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import banner from "../../public/csw_white.png";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import axios from "axios";

interface FormValue {
  username: string;
  email: string;
  password: string;
}

export default function SignIn() {
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

      reset();
    } catch (error: any) {
      console.log(error);
    }
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
            <div className="font-extrabold text-lg highlight w-16 text-choco">
              Log In
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
                  <span className="font-semibold text-sm tracking-tight text-red-600">
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
                  <span className="font-semibold text-sm tracking-tighter text-red-600 md:whitespace-nowrap">
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
                "Log In"
              )}
            </Button>
            <p className="text-sm">
              Don&apos;t have an account?
              <Link to="/sign-up" className="text-ivory ml-2">
                Sign Up💘
              </Link>
            </p>
            {errorMessage && (
              <Alert className=" bg-ivory text-red-500 font-bold items-center">
                {errorMessage}
              </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
