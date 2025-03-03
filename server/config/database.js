const mongoose = require('mongoose');
const userModel = require('../models/user');
const codeModel = require('../models/code');
const commentModel = require('../models/comment');
const activityModel = require('../models/activity');
const notificationModel = require('../models/notification');
const ratingModel = require('../models/rating');
const tagModel = require('../models/tag');
const solutionsModel = require('../models/codeSolution');
const problemModel = require('../models/codeProblem');

function connectDB() {
  const url = process.env.DB_URL;

  try {
    mongoose.connect(url);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log("Database connected");
  });

  dbConnection.on("error", (error) => {
    console.error(`Connection error: ${error}`);
  });

  return;
}

module.exports = { connectDB };
