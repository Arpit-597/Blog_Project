const CategoryModel = require("../../models/Category");

class CategoryController {
  static displayCategory = async (req, res) => {
    const data = await CategoryModel.find().sort({ _id: -1 });
    res.render("admin/category/display", { category: data });
  };

  static insertCategory = async (req, res) => {
    try {
      // console.log(req.body)
      const { cat_name } = req.body;
      const result = await CategoryModel.create({
        cat_name,
      });

      res.redirect("/admin/categorydisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static updateCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const update = await CategoryModel.findByIdAndUpdate(id, {
        cat_name: req.body.cat_name,
      });

      res.redirect("/admin/categorydisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteCategory = async (req, res) => {
    const id = req.params.id;
    await CategoryModel.findByIdAndDelete(id);

    res.redirect("/admin/categorydisplay");
  };
}

module.exports = CategoryController;
