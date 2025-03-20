import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2700/auth/forgotpassword", { email })
      .then((res) => {
        if (res.data.status) {
          console.log("Check Your Email", res);
          navigate("/Signin");
        }
      })
      .catch((err) => console.log("Forgot Password error", err));
  };
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center px-4 bg-gray-100">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="text-center">
                <div className="mb-4 inline-block rounded-full bg-blue-200 p-2 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <h1 className="block text-2xl font-bold text-gray-800">
                  Forgot password?
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Don't worry, we'll send you reset instructions.
                </p>
              </div>
              <div className="mt-6">
                {/* Form */}
                <form onSubmit={handlesubmit}>
                  <div className="grid gap-y-4">
                    {/* Form Group */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm text-gray-600"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="Enter Your Email Address"
                          onChange={(e) => setemail(e.target.value)}
                          className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500"
                          aria-describedby="email-error"
                        />
                        <div className="pointer-events-none absolute top-3 right-0 hidden items-center px-3 peer-invalid:flex">
                          <svg
                            className="h-5 w-5 text-rose-500"
                            width={16}
                            height={16}
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                        <p
                          className="mt-2 hidden text-xs text-rose-600 peer-invalid:block"
                          id="email-error"
                        >
                          Valid email address required for the account recovery
                          process
                        </p>
                      </div>
                    </div>
                    {/* /Form Group */}
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Reset password
                    </button>
                  </div>
                </form>
                {/* /Form */}
              </div>
            </div>
          </div>
          <p className="mt-3 flex items-center justify-center divide-x divide-gray-300 text-center">
            <span className="inline pr-3 text-sm text-gray-600">
              Remember your password?
              <Link
                to="/signin"
                className="font-medium text-blue-600 decoration-2 hover:underline"
              >
                {" "}
                Sign in here{" "}
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
