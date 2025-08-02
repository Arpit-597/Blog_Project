const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin"); // adjust path if needed

const setUserInfo = async (req, res, next) => {
  const { token } = req.cookies;
  res.locals.admin = null; // always define it

  if (token) {
    try {
      const decoded = jwt.verify(token, "arpitmittal"); // or process.env.JWT_SECRET
      const admin = await AdminModel.findById(decoded.id);
      if (admin) {
        res.locals.admin = admin;
      }
    } catch (err) {
      console.error("Token error:", err.message);
    }
  }

  next();
};

module.exports = setUserInfo;
