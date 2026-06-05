const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/v1");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", routes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started listening on PORT: ${PORT}`);
});
