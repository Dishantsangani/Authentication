import React from "react";
import Home from "./Page/Home";
import Signin from "./Page/Signin";
import Signup from "./Page/Signup";
import Dashboard from "./Page/Dashboard";
import ResetPassword from "./Page/Password/ResetPassword";
import ForgotPassword from "./Page/Password/ForgotPassword";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
