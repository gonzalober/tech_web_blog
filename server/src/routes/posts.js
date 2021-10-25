const { Router } = require("express");
const router = new Router();
const controller = require("../controller");

router.get("/", (req, res) => {
  controller.getPosts(req, res);
});

router.get("/:id", (req, res) => {
  controller.getPostsById(req, res);
});

router.post("/add", (req, res) => {
  controller.addPosts(req, res);
});

router.delete("/:id", (req, res) => {
  controller.deletePost(req, res);
});

router.put("/:id", (req, res) => {
  controller.updatePost(req, res);
});

module.exports = router;
