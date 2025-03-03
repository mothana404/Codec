const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./config/database");
const errorHandler = require("./middlewares/errorMiddleware");
const userRoutes = require('./Routes/userRoutes');

require("dotenv").config();
const PORT = process.env.PORT;

connectDB();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});

// app.use(userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
