const mongoose = require("mongoose");
async function Connection() {
  mongoose
    .connect(
      "mongodb+srv://devsmi168:dishantdb@cluster27.n53q5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster27"
    )
    .then(() => console.log("DataBase Connected"))
    .catch((err) => console.log("Database Connection Error", err));
}

module.exports = { Connection };
