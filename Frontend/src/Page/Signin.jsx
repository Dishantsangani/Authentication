import React, { useState } from "react";
import signin from "../assets/signin.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";

function Signin() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Email and Password are required.");
      return;
    }
    axios
      .post(
        "http://localhost:2700/auth/signin",
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status) {
          localStorage.setItem("Token", res.data.token);
          navigate("/dashboard");
        } else {
          console.log("Login Failed", res.data.message);
        }
        console.log("Data Inserted", res);
      })
      .catch((err) => console.log("Data Inserted Eror", err));
  };
  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
  <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800">
    <div className="flex items-center space-x-3">
      <img className="w-auto h-7 sm:h-8" src={signin} alt="sign in" />
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Sign In</h2>
    </div>

    <form className="mt-6" onSubmit={handlesubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter Your Email Address"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-1"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <Link to="/forgotpassword" className="text-xs text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
        <input
          type="password"
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter Your Password"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-1"
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
        >
          Sign In
        </button>
      </div>
    </form>

    <div className="flex items-center justify-between mt-4">
      <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5" />
      <p className="text-xs text-gray-500 uppercase dark:text-gray-400">or login with</p>
      <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5" />
    </div>

    {/* Google Login */}
    <div className="flex justify-center mt-4">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse?.credential);
          localStorage.setItem("Token", JSON.stringify(decoded));
          navigate("/dashboard");
        }}
        onError={() => console.log("Login Failed")}
      />
    </div>

    <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
      Don't have an account?{" "}
      <Link to="/signup" className="text-blue-500 font-medium hover:underline">
        Create Account
      </Link>
    </p>
  </div>
</div>

  );
}

export default Signin;
