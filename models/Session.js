const mongoose = require("mongoose");

const UserSession = new mongoose.Schema({
    sessioncookie: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
}, {
    timestamps: true
});

const session = mongoose.model("usersession", UserSession);

module.exports = session;