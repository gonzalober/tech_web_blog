const { Router } = require("express");
const router = new Router();
const controller = require("../controller");

router.get("/", (req, res) => {
  controller.getPosts(req, res);
});

module.exports = router;
