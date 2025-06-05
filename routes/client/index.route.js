const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const searchRoutes = require("./search.route");


module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use("/", homeRoutes);
    app.use("/search", searchRoutes);
    app.use("/products", productRoutes);
}