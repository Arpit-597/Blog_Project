const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin");

const checkAdminAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    req.flash("error", "Unauthorized login");
    return res.redirect("/login");
  }

  try {
    const data = jwt.verify(token, "arpitmittal");
    const admin = await AdminModel.findById({ _id: data.id });

    if (!admin) {
      req.flash("error", "Admin not found");
      return res.redirect("/login");
    }

    req.admin = admin;
    res.locals.admin = admin; // ✅ So you can use it directly in EJS without passing manually
    next();
  } catch (err) {
    console.error(err);
    req.flash("error", "Invalid token");
    return res.redirect("/login");
  }
};

module.exports = checkAdminAuth;
