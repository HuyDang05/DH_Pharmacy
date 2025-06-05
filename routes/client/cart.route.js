const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/cart_controller")

router.post("/add/:productId", controller.addPost);

module.exports = router;