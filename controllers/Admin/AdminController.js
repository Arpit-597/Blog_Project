const AdminModel = require("../../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name, email } = req.admin;
      res.render("admin/dashboard", {
        name,
        email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      // console.log(req.body)
      const { name, email, password, confirmpassword } = req.body;
      const admin = await AdminModel.findOne({ email: email });
      if (admin) {
        req.flash("error", "Couldn't SignUp! Email already Exists");
        return res.redirect("/signup");
      } else {
        if (name && email && password && confirmpassword) {
          if (password === confirmpassword) {
            const hashPassword = await bcrypt.hash(password, 10);
            const result = new AdminModel({
              name,
              email,
              password: hashPassword,
            });

            await result.save();

            req.flash("success", "Registration Successfull");
            return res.redirect("/login");
          } else {
            req.flash("error", "Couldn't SignUp! Passwords does not match");
            return res.redirect("/signup");
          }
        } else {
          req.flash("error", "All Fields are required");
          return res.redirect("/signup");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static verifyLogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      if (email && password) {
        const admin = await AdminModel.findOne({ email: email });
        if (admin != null) {
          const isMatch = await bcrypt.compare(password, admin.password);
          if (isMatch) {
            //generate jwt token
            const token = jwt.sign(
              { id: admin._id, email: email },
              "arpitmittal" //secret key
            );
            // console.log(token)
            res.cookie("token", token);
            if (admin.role == "admin") {
              return res.redirect("/admin/dashboard");
            } else {
              return res.redirect("/");
            }
          } else {
            req.flash("error", "Wrong Email or Password!");
            return res.redirect("/login");
          }
        } else {
          req.flash("error", "Email Not Found! Registration required.");
          return res.redirect("/login");
        }
      } else {
        req.flash("error", "All Fields are required");
        return res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      req.flash("success", "Logged Out Successfully");
      return res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = AdminController;
