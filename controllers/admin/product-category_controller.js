// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  
  res.render("admin/pages/products-category/index", {
      pageTitle : "Danh sách sản phẩm",

  });
}