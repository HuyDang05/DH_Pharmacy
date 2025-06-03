const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productsHelper = require("../../helpers/products")


// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
      status: "active",
      deleted: false
    }).sort({position: "desc"});

    const newProducts = productsHelper.priceNewProducts(products);

    
    res.render("client/pages/products/index", {
      pageTitle : "Danh sách sản phẩm",
      products: newProducts
    });
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    deleted: false
  });

  const products = await Product.find({
    product_category_id: category.id,
    deleted: false
  }).sort({position: "desc"});

  const newProducts = productsHelper.priceNewProducts(products);

  res.render("client/pages/products/index", {
      pageTitle : category.title,
      products: newProducts
  });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
      const find = {
        deleted: false,
        slug: req.params.slug,
        status:"active"
      };
  
      const product = await Product.findOne(find);
  
      res.render("client/pages/products/detail", {
  
          pageTitle : product.title,
          product: product
            
      });
    } catch (error) {
      req.flash("error", `Không tồn tại sản phẩm`);
      res.redirect(`/products`);
    }
};