import React, { useState } from "react";
import account from "../assets/account.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      return console.log("Please fill all fields");
    }
    axios
      .post(
        "http://localhost:2700/auth/signup",
        { username, email, password },
        { withCredentials: true }
      )
      .then((res) => {

        if (res.data.token) {
          localStorage.setItem("Token", res.data.token); // Store token
          navigate("/dashboard");
        } else {
          console.log("Signup successful, but no token received.");
        }
      })
      .catch((err) => console.error("Data Inserted Error", err));
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
  <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div className="px-6 py-4">
      {/* Logo */}
      <div className="flex justify-center">
        <img className="w-auto h-7 sm:h-8" src={account} alt="Logo" />
      </div>

      {/* Welcome Text */}
      <h3 className="mt-3 text-xl font-medium text-center text-gray-700 dark:text-gray-200">
        Welcome
      </h3>
      <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
        Create an Account
      </p>

      {/* Form */}
      <form className="mt-4 space-y-4" onSubmit={handlesubmit}>
        <div>
          <label className="block text-sm text-gray-800 dark:text-gray-200">Username</label>
          <input
            type="text"
            onChange={(e) => setusername(e.target.value)}
            placeholder="Enter Your Name"
            className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-800 dark:text-gray-200">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setemail(e.target.value)}
            className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            onChange={(e) => setpassword(e.target.value)}
            className="block w-full px-3 py-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none"
          />
        </div>

        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium tracking-wide text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Create Account
          </button>

          <div className="w-full mt-3 border-t border-gray-300 dark:border-gray-600"></div>

          <button
            onClick={() => navigate("/signin")}
            className="mt-3 text-sm font-medium text-blue-500 dark:text-blue-400 hover:underline"
          >
            Back to Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}

export default Signup;
