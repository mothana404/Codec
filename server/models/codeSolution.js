const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  isAccepted: { type: Boolean, default: false },
  votes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Solution", solutionSchema);
