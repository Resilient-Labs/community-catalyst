const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  caption: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
  eventLocation: {
    type: String,
    required: true,
  },
  going: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: { 
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
