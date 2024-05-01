


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv').config();
const authRoutes = require("./routes/Auth");
const userRoutes = require("./routes/User");
// const adminRoutes = require("./routes/Admin");
// const taskRoutes = require('./routes/Task')

// Express middleware for parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS middleware
app.use(cors());

// CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
app.use("/api", authRoutes);
app.use("/", userRoutes);



// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT);
    console.log("Connected to DB", "on port:", process.env.PORT);
  })
  .catch((err) => {
    console.log("Not Connected");
    console.log(err, "ERROR");
  });

module.exports = app;




