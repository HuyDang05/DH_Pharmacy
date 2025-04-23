const Account = require("../../models/account.model")
const systemConfig = require("../../config/system")

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Account.find(find);

    res.render("admin/pages/accounts/index", {
        pageTitle : "Danh sách tài khoản",
        records: records
    });
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    

    res.render("admin/pages/accounts/create", {
        pageTitle : "Thêm mới tài khoản",
    });
}


