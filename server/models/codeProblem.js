const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags: [{ type: String }],
  language: { type: String, required: true },
  solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Solution" }],
}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);
