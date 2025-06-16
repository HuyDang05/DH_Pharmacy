
const settingGeneral = require("../../models/settings-general.model")

// [GET] /admin/settings/general
module.exports.general = async (req, res) => {
  const settingGeneral = await settingGeneral.findOne({});
  res.render("admin/pages/setting/general", {
      pageTitle : "Cài đặt chung",
      settingGeneral: settingGeneral
  });
}

// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {
  const settingGeneral = await settingGeneral.findOne({});

  if (settingGeneral) {
    await settingGeneral.updateOne({_id: settingGeneral.id}, req.body)
  } else {
    const record = new settingGeneral(req.body);
    await record.save();
  }
  

  req.flash("success", "Cập nhật thành công!");

  res.redirect("back");
  
}