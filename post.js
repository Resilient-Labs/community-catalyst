const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.getProfile("/profile", ensureAuth, postsController.getProfile);

router.getPost("/:id", ensureAuth, postsController.getPost);

router.getFeed("/getFeed", ensureAuth, postsController.getFeed);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/goingPost/:id", postsController.goingPost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
