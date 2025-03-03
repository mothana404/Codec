const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  bio: { type: String, default: "" },
  user_image: { type: String, default: "" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  savedCodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Code" }],
  stats: {
    codesShared: { type: Number, default: 0 },
    solutionsAccepted: { type: Number, default: 0 },
    interactionRate: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
