const express = require("express");
const router = express.Router();
const {
  UserSignin,
  UserSignup,
  UserForgotPassword,
  UserResetPassword,
  Verified
} = require("../Controller/UserController");

router.post("/signin", UserSignin);
router.post("/signup", UserSignup);
router.post("/forgotpassword", UserForgotPassword);
router.post("/verified", Verified);
router.post("/resetpassword/:token", UserResetPassword);

module.exports = router;
