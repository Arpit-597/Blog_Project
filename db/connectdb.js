const mongoose = require("mongoose");
require("dotenv").config()

const connectDB = () => {
  return mongoose
    .connect(process.env.MONGODB_LIVE)

    .then(() => {
      console.log("Database Connection successful");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
