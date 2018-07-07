const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: String,
    userId: String,
    likes: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
      }
    ]
  },
  {
    timestamps: true
  }
);

const comment = mongoose.model("comment", CommentSchema);

module.exports = comment;
