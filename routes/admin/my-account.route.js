const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/my-account_controller");

router.get("/", controller.index);

module.exports = router;