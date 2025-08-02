const express = require("express");
const FrontController = require("../controllers/FrontController");
const AdminController = require("../controllers/Admin/AdminController");
const BlogController = require("../controllers/Admin/BlogController");
const CategoryController = require("../controllers/Admin/CategoryController");
const AboutController = require("../controllers/Admin/AboutController");
const ContactController = require("../controllers/Admin/ContactController");
const auth = require("../middlewares/auth");
// console.log("auth middleware loaded:", typeof auth); // should log "function"
const router = express.Router();

//router //path
router.get("/", FrontController.home); //method
router.get("/about", FrontController.about); //method
router.get("/contact", FrontController.contact); //method
router.get("/blog", FrontController.blog); //method
router.get("/login", FrontController.login); //method
router.get("/signup", FrontController.signup); //method
router.get("/blog-details/:id", FrontController.readmore); //method
router.get("/load-more-blogs", BlogController.LoadMore); //method

//admin
router.get("/admin/dashboard", auth, AdminController.dashboard);
router.get("/admin/blogdisplay", auth, BlogController.displayBlog);
router.get("/admin/categorydisplay", auth, CategoryController.displayCategory);
router.get("/admin/aboutdisplay", auth, AboutController.displayAbout);
router.get("/admin/contactdisplay", auth, ContactController.contactDisplay);

router.post("/register", AdminController.register);
router.post("/verifylogin", AdminController.verifyLogin);
router.get("/logout", AdminController.logout);

router.post("/insertblog", auth, BlogController.insertBlog);
router.post("/blogupdate/:id", auth, BlogController.updateBlog);
router.get("/blogdelete/:id", auth, BlogController.deleteBlog);

router.post("/insertcategory", auth, CategoryController.insertCategory);
router.post("/updatecategory/:id", auth, CategoryController.updateCategory);
router.get("/categorydelete/:id", auth, CategoryController.deleteCategory);

router.post("/aboutupdate", auth, AboutController.updateAbout);

router.post("/insertContact", auth, ContactController.insertContact);
router.get("/contactdelete/:id", auth, ContactController.deleteContact);

module.exports = router;
