const Post = require("../models/Post");
const cloudinary = require("../middleware/cloudinary");

module.exports = {

getProfile: async (req,res) => {
try{
  const posts = await Post.find({ user: req.user.id });
  res.render("profile.ejs", { posts: posts, user: req.user, });
}catch (err) {
  console.log(err);
}
},

getFeed: async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: "desc" }).lean();
    res.render("feed.ejs", { posts: posts });
  } catch (err) {
    console.log(err);
  }
  
},

goingPost: async (req, res) => {
  try {
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      {
        $inc: { going: 1 },
      }
    );
    console.log("Going +1");
    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
},
createPost: async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    await Post.create({
      title: req.body.title,
      image: result.secure_url,
      cloudinaryId: result.public_id,
      caption: req.body.caption,
      time: req.body.time,
      eventDate: req.body.eventDate,
      user: req.user.id,
      userName: req.user.userName,
    });
    console.log("Post has been added!");
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
},
deletePost: async (req, res) => {
  try {
    // Find post by id
    let post = await Post.findById({ _id: req.params.id });
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(post.cloudinaryId);
    // Delete post from db
    await Post.remove({ _id: req.params.id });
    console.log("Deleted Post");
    res.redirect("/profile");
  } catch (err) {
    res.redirect("/profile");
  }
},



};