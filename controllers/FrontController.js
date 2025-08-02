const AboutModel = require("../models/about");
const BlogModel = require("../models/Blog");
const CategoryModel = require("../models/Category");

class FrontController {
  static home = async (req, res) => {
    try {
      const blogs = await BlogModel.find().sort({ _id: -1 }).limit(6);
      // console.log(blogs)
      res.render("home", { blogs });
    } catch (error) {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      const about = await AboutModel.findOne();
      res.render("about", { about });
    } catch (error) {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      res.render("contact");
    } catch (error) {
      console.log(error);
    }
  };
  static blog = async (req, res) => {
    try {
      const blogs = await BlogModel.find().sort({ _id: -1 });
      res.render("blog", { blogs });
    } catch (error) {
      console.log(error);
    }
  };
  static login = async (req, res) => {
    try {
      res.render("login", {
        msg_error: req.flash("error"),
        msg_success: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static signup = async (req, res) => {
    try {
      res.render("signup", {
        msg_error: req.flash("error"),
        msg_success: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static readmore = async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await BlogModel.findById(id);
      const recentblogs = await BlogModel.find().limit(5);
      const categories = await CategoryModel.find();
      res.render("blog-details", { blog, recentblogs, categories });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = FrontController;
