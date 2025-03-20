const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userrouter = require("./Routes/UserRoutes.js");
const { Connection } = require("./Database/Connection.js");

const app = express();
const port = 2700;

// Database Connection
Connection();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userrouter);

// Controller
app.use("/", (req, res) => {
  return res.send("Hello From Server");
});

// Port Live
app.listen(port, () => {
  console.log(`Server Started at Port ${port}`);
});
