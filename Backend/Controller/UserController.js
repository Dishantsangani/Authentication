require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../Model/UserModel");

// Login
async function UserSignin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Registered" });
    }
    // Password Validation
    const ValidPassword = await bcrypt.compare(password, user.password);
    if (!ValidPassword) {
      return res
        .status(401)
        .json({ status: false, message: " Incorrect Password " });
    }
    // Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.KEY,
      {
        expiresIn: "2h",
      }
    );

    // Cookie
    res.cookie("Token", token, { httpOnly: true, maxAge: 7200000 });

    return res.status(200).json({
      status: true,
      message: "Login SuccessFully",
      token: token,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
}

// Registor
async function UserSignup(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already Existed" });
    }

    const HashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: HashPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.KEY,
      { expiresIn: "1h" }
    );
    return res
      .status(201)
      .json({ status: true, message: "Created SuccessFully", token });
  } catch (err) {
    console.error("Signup Error:", err);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
}

// Forgot Password
async function UserForgotPassword(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User Not Registered" });
    }

    // Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.KEY,
      {
        expiresIn: "15m",
      }
    );

    // Email
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `Click The Link To Reset Your Password:  http://localhost:5173/resetpassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Email Error: ", error);
        return res
          .status(500)
          .json({ status: false, message: "Error Sending Email" });
      } else {
        return res.json({ status: true, message: "Reset Link  Sent To Email" });
      }
    });
  } catch (err) {
    console.log("Server Error", err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}

// Reset Password
async function UserResetPassword(req, res) {
  const token = req.params.token;
  const { password } = req.body;
  try {
    const Decoded = jwt.verify(token, process.env.KEY);
    const id = Decoded.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Hash New Password
    const HashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(id, { password: HashPassword });

    return res.json({ status: true, message: "Update Password" });
  } catch (err) {
    console.error("Password Reset Error:", err);
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
}

// Verify User
async function Verified(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "No Token" });
    }
    const Decoded = await jet.verify(token, process.env.KEY);
    req.user = Decoded;
    next();
  } catch (err) {
    return res.status(403).json({ status: false, message: "Unauthorized" });
  }
}

module.exports = {
  UserSignin,
  UserSignup,
  UserForgotPassword,
  UserResetPassword,
  Verified,
};
