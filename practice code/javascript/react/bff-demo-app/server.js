const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.post("/api/v1/search", (req, res, next) => {
  console.log("searchTerm", req.body.searchTerm);
  res.status(222).json({ message: `Got ${req.body.searchTerm}` });
});

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server started listening on PORT: ${PORT}`);
});
