const express = require("express");
const {
  getUser,
  createUser,
  login,
} = require("../../controllers/userController");

const router = express.Router();

router.get("/:id", getUser);
router.post("/", createUser);
router.post("/login", login);

module.exports = router;
