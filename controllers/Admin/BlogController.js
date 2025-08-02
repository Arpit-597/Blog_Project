const BlogModel = require("../../models/Blog");
const cloudinary = require("../../config/cloudinary");

class BlogController {
  static displayBlog = async (req, res) => {
    try {
      const blog = await BlogModel.find().sort({ _id: -1 });
      res.render("admin/blog/display", {
        blogs: blog,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static insertBlog = async (req, res) => {
    try {
      // console.log(req.files.image)
      // console.log(req.body);
      const { title, description } = req.body;
      // const result = await BlogModel.create({
      //   title,
      //   description,
      // });
      // res.redirect("/admin/blogdisplay");

      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImages",
      });
      // console.log(myimage)

      const result = await BlogModel.create({
        title,
        description,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });

      res.redirect("/admin/blogdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static updateBlog = async (req, res) => {
    try {
      // console.log(req.body)
      // console.log(req.params.id)

      const blog = await BlogModel.findById(req.params.id);
      const imageId = blog.image.public_id;
      // console.log(imageId)
      if (imageId) {
        await cloudinary.uploader.destroy(imageId);
      }

      if (req.files) {
        const file = req.files.image;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "blogImages",
        });

        const id = req.params.id;
        const { title, description } = req.body;

        const result = await BlogModel.findByIdAndUpdate(id, {
          title: title,
          description: description,
          image: {
            public_id: myimage.public_id,
            url: myimage.secure_url,
          },
        });
      } else {
        const id = req.params.id;
        const { title, description } = req.body;

        const result = await BlogModel.findByIdAndUpdate(id, {
          title: title,
          description: description,
        });
      }
      res.redirect("/admin/blogdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteBlog = async (req, res) => {
    try {
      const blog = await BlogModel.findById(req.params.id);
      const imageId = blog.image.public_id;
      // console.log(imageId)
      if (imageId) {
        await cloudinary.uploader.destroy(imageId);
      }
      await BlogModel.findByIdAndDelete(req.params.id);

      res.redirect("/admin/blogdisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static LoadMore = async (req, res) => {
    try {
      const skip = parseInt(req.query.skip) || 0;
      const blogs = await BlogModel.find()
        .sort({ _id: -1 })
        .skip(skip)
        .limit(6);

      res.json({ blogs });
    } catch (err) {
      res.status(500).json({ error: "Failed to load more blogs" });
    }
  };
}

module.exports = BlogController;
