const express = require("express");

const web = require("./routes/web");
const app = express();
const connectDB = require("./db/connectdb");
connectDB();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const setUserInfo = require("./middlewares/setUserInfo")


const dotenv = require("dotenv");
dotenv.config();

//ejs setup  template-engine
app.set("view engine", "ejs");

//public folder setup
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(fileUpload({ useTempFiles: true }));

app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(cookieParser());

app.use(setUserInfo)

//router load
app.use("/", web);

// server start
app.listen(process.env.PORT, () => {
  console.log(`server start localhost:${process.env.PORT}`);
});
