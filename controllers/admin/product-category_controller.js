const ProductCategory = require("../../models/product-category.model")
const systemConfig = require("../../config/system")


// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    res.render("admin/pages/products-category/index", {
      pageTitle : "Danh sách sản phẩm",

  });
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products-category/create", {
      pageTitle : "Tạo danh mục sản phẩm",

  });
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if ( req.body.position == "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const record = new ProductCategory(req.body);
  await record.save();
  
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  res.send("OK");
}