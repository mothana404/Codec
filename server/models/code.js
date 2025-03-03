const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  language: { type: String, required: true },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  views: { type: Number, default: 0 },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
}, { timestamps: true });

module.exports = mongoose.model("Code", codeSchema);
