const UserService = require("../services/userService");
const catchError = require("../utils/catchError");
const userService = new UserService();

exports.getUser = catchError(async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.getUser(id);
  res.status(200).json({ user });
});

exports.createUser = catchError(async (req, res, next) => {
  const { message, id } = await userService.createUser(req.body);
  res.status(201).json({ message, id });
});

exports.login = catchError(async (req, res, next) => {
  const token = await userService.login(req.body);
  res.cookie("user-token", token, {
    httpOnly: true,
  });

  res.status(200).json({ message: "login successfull" });
});
