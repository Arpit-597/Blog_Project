const ContactModel = require("../../models/contact");

class ContactController {
  static contactDisplay = async (req, res) => {
    try {
      const data = await ContactModel.find().sort({ _id: -1 });
      res.render("admin/contact/display", { contacts: data });
    } catch (error) {
      console.log(error);
    }
  };

  static insertContact = async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      const result = await ContactModel.create({
        name,
        email,
        phone,
        message,
      });

      res.redirect("/contact");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteContact = async (req, res) => {
    try {
      await ContactModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/contactdisplay");
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = ContactController;
