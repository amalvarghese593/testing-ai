const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.get("/api/v1/health", async (req, res, next) => {
  res.json({ success: true, data: "Healthy service" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started listening on PORT: ${PORT}`);
});
