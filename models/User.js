const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    phoneNumber: String,
    age: Number,
    gender: {
      type: String,
      enum: ["m", "f"]
    },
    country: String,
    relationship: {
      type: String,
      enum: [
        "single",
        "in a relationship",
        "married",
        "engaged",
        "divorced",
        "it's complicated"
      ]
    },
    profilePhotoUrl: String,
    coverPhotoUrl: String,
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
