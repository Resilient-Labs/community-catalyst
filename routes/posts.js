const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

router.get("/profile", ensureAuth, postsController.getProfile);

router.get("/:id", ensureAuth, postsController.getPost);

router.get("/getFeed", ensureAuth, postsController.getFeed);



router.post("/createPost", upload.single("file"), postsController.createPost);

// router.post("/newpost", ensureAuth, postsController.newPost)

// router.post("/upload", upload.single("file"), postsController.upload );

router.put("/goingPost/:id", postsController.goingPost);


// router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
