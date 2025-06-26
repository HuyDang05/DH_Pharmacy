const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/users_controller");

router.get("/not-friend", controller.notFriend);
router.get("/request", controller.request);


module.exports = router;