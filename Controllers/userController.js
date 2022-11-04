const User = require("../Models/userModel");
const CustomErrors = require("../Errors");
const { StatusCodes } = require("http-status-codes");
const checkPermissions = require("../Utils/checkPermissions");
const { createUserToken, attachResToCookies } = require("../Utils");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password -verificationToken");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};
const getsingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select(
    "-password -verificationToken"
  );
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};
const showMe = async (req, res) => {
  res.status(StatusCodes.OK).json({ ...req.user });
};
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new CustomErrors.BadRequestError("please provieall values");
  }
  const user = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    { email, name, lastName, location },
    { runValidators: true, new: true }
  ).select("-password -isVerified -verificationToken -verifiedDate");
  const userToken = createUserToken(user);
  attachResToCookies({ res, payload: userToken });
  res.status(StatusCodes.OK).json({ user });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomErrors.BadRequestError(
      "please provie newPassword and oldpassword"
    );
  }
  const user = await User.findOne({ _id: req.user.userId });
  const isCorrect = await user.comparepasswords(oldPassword);
  if (!isCorrect) {
    throw new CustomErrors.UnauthenticatedError("Incorrect password");
  }
  user.password = newPassword;
  await user.save();
  res.send("password updated");
};
module.exports = {
  getAllUsers,
  getsingleUser,
  updateUser,
  updateUserPassword,
  showMe,
};
