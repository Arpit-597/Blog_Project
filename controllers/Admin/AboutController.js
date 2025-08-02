const AboutModel = require("../../models/about");
const cloudinary = require("../../config/cloudinary");

class AboutController {
  static displayAbout = async (req, res) => {
    try {
      const about = await AboutModel.findOne(); // only one document expected
      res.render("admin/about/display", { about });
    } catch (error) {
      console.log("Display About Error:", error);
    }
  };

  static updateAbout = async (req, res) => {
    try {
      const existing = await AboutModel.findOne();

      let imageData = existing?.image || {};

      if (req.files && req.files.image) {
        const file = req.files.image;

        if (imageData.public_id) {
          await cloudinary.uploader.destroy(imageData.public_id);
        }

        const uploadResult = await cloudinary.uploader.upload(
          file.tempFilePath,
          {
            folder: "blogImages",
          }
        );

        imageData = {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        };
      }

      if (existing) {
        await AboutModel.findByIdAndUpdate(existing._id, {
          about_desc: req.body.about_desc,
          image: imageData,
        });
      } else {
        await AboutModel.create({
          about_desc: req.body.about_desc,
          image: imageData,
        });
      }

      res.redirect("/admin/aboutdisplay");
    } catch (error) {
      console.log("Update About Error:", error);
      res.status(500).send("Something went wrong while updating About.");
    }
  };
}

module.exports = AboutController;
