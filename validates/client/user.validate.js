module.exports.registerPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Họ tên không được để trống!");
        res.redirect("back");
        return;
    }

    if (!req.body.email) {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    if (!req.body.password) {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.loginPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    if (!req.body.password) {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.forgotPasswordPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Email không được để trống!");
    res.redirect("back");
    return;
  }

    next();
}

module.exports.resetPasswordPost = (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", "Mật khẩu không được để trống!");
    res.redirect("back");
    return;
  }

  if (!req.body.confirmPassword) {
    req.flash("error", "Vui lòng xác nhận lại mật khẩu!");
    res.redirect("back");
    return;
  }

  if (req.body.password != req.body.confirmPassword) {
    req.flash("error", "Xác nhận mật khẩu không trùng khớp!");
    res.redirect("back");
    return;
  }

    next();
}