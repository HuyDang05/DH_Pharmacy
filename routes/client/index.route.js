const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require("../../middlewares/client/user.middleware");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");



module.exports = (app) => {
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.settingGeneral);


    app.use("/", homeRoutes);
    app.use("/search", searchRoutes);
    app.use("/products", productRoutes);
    app.use("/cart", cartRoutes);
    app.use("/checkout", checkoutRoutes);
    app.use("/user", userRoutes);


}