const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/role_controller")

router.get("/", controller.index);

router.get("/create", controller.create);

router.get("/create", controller.createPost);



module.exports = router;