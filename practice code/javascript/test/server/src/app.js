const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes/v1");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", routes);

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mern-app";
const PORT = process.env.PORT || 3010;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server started listening on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
