const fs = require("fs");
const express = require("express");

const requiredFields = [
  "sourcecode",
  "iacode",
  "pmcCode",
  "shortName",
  "productName",
  "cardHeadline",
  "cardTitle",
  "active",
  "decommissioned",
];

const readFromFile = (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        console.log("Error:", err);
        rej(err);
      }
      res(data);
    });
  });
};

const cardsFilter = async (allowedAttributes) => {
  try {
    const path = "./cardsdata.json";
    const data = await readFromFile(path);
    const parsed = JSON.parse(data);

    const result = [];
    for (const item of parsed) {
      const filteredItem = {};
      for (const attribute of allowedAttributes) {
        filteredItem[attribute] = item[attribute];
      }
      result.push(filteredItem);
    }

    return result;
  } catch (err) {
    console.log(err);
  }
};

// cardsFilter(requiredFields)
//   .then((data) => {
//     console.log("data: ", data);
//   })
//   .catch((err) => console.log(err));

const app = express();

app.get("/", async (req, res, next) => {
  try {
    const data = await cardsFilter(requiredFields);
    res.status(200).json({ data });
  } catch (error) {
    console.log("Couldnt retrieve data", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server started listening on PORT: ${PORT}`);
});
