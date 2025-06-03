const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products")
// [GET] 
module.exports.index = async (req, res) => {
  //Lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured : "1",
    deleted : false,
    status: "active"
  })

  const newProducts = productsHelper.priceNewProducts(productsFeatured);

  res.render("client/pages/home/index", {
      pageTitle : "Trang chủ",
      productsFeatured : newProducts
  });
}