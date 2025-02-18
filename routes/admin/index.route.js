const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");


module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use("/admin/dashboard", dashboardRoutes);
    
}