import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setpassword] = useState("");

  axios.defaults.withCredentials = true;
  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2700/auth/resetpassword/" + token, { password })
      .then((res) => {
        if (res.data.status) {
          alert("Password Reset Successful! Redirecting to Sign In...");
          navigate("/signin");
        } else {
          alert(res.data.message);
        }
        console.log("Reset Password Successfully", res);
      })
      .catch((err) => {
        console.log("Reset Password Error", err);
        alert("Failed to reset password. Please try again.");
      });
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm sm:max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex justify-center">
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
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-center text-gray-800 md:text-3xl dark:text-white">
          Reset password?
        </h1>

        <form className="mt-6" onSubmit={handlesubmit}>
          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your New Password"
              onChange={(e) => setpassword(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {" "}
            Reset Password
          </button>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
            By clicking "Sign in", you agree to our{" "}
            <p className="text-blue-600 dark:text-blue-400 ">
              Terms & Conditions and Privacy Policy
            </p>
          </p>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
