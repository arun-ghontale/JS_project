const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    content: String,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
      }
    ]
  },
  {
    timestamps: true
  }
);

const post = mongoose.model("post", PostSchema);

module.exports = post;
