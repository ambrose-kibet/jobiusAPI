const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../Errors");
const crypto = require("crypto");
const User = require("../Models/userModel");
const Token = require("../Models/tokenModel");
const {
  sendVerificationEmail,
  createUserToken,
  attachResToCookies,
  createHash,
  sendPasswordResetEmailEmail,
} = require("../Utils");
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = (await User.countDocuments()) === 0 ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString("hex");
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = "http://localhost:3000";

  await sendVerificationEmail({
    email: user.email,
    name: user.name,
    token: user.verificationToken,
    origin,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Success! please check your email to verify your account" });
};
const verifyUser = async (req, res) => {
  const { token, email } = req.body;
  if (!token || !email) {
    throw new CustomErrors.BadRequestError("provide all values");
  }
  const user = await User.findOne({ email });

  if (!user || user.verificationToken !== token) {
    throw new CustomErrors.BadRequestError("Verification failed");
  }
  user.isVerified = true;
  user.verifiedDate = Date.now();
  user.verificationToken = "";
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Your email has been verified successfully " });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomErrors.BadRequestError(`Please provide email and password`);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomErrors.UnauthenticatedError("invalid credentials");
  }
  if (!user?.isVerified === "true") {
    throw new CustomErrors.UnauthenticatedError("please verify email");
  }
  const isCorrect = await user.comparepasswords(password);
  if (!isCorrect) {
    throw new CustomErrors.UnauthenticatedError("invalid credentials");
  }
  const userToken = createUserToken(user);
  let refreshToken = "";
  const existiingToken = await Token.findOne({ user: userToken.userId });
  if (existiingToken) {
    const { isValid } = existiingToken;
    if (!isValid) {
      throw new CustomErrors.UnauthenticatedError("Invalid Credentials");
    }
    refreshToken = existiingToken.refreshToken;
    attachResToCookies({ res, payload: userToken, refreshToken });
    res.status(StatusCodes.OK).json({
      ...userToken,
      location: user.location,
      email: user.email,
      lastName: user.lastName,
    });
    return;
  }
  refreshToken = crypto.randomBytes(70).toString("hex");
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];
  await Token.create({
    ip,
    userAgent,
    user: userToken.userId,
    refreshToken,
  });
  attachResToCookies({ res, payload: userToken, refreshToken });
  res.status(StatusCodes.OK).json({
    ...userToken,
    location: user.location,
    email: user.email,
    lastName: user.lastName,
  });
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomErrors.BadRequestError("please provide valid email");
  }
  const user = await User.findOne({ email });
  if (user) {
    const tenMinutes = 1000 * 60 * 10;
    const origin = "http://localhost:3000";
    const passwordResetToken = crypto.randomBytes(40).toString("hex");
    sendPasswordResetEmailEmail({
      email: user.email,
      name: user.name,
      origin,
      token: passwordResetToken,
    });
    user.passwordResetToken = createHash(passwordResetToken);
    user.passwordResetTokenExpirationDate = new Date(Date.now() + tenMinutes);
    await user.save();
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for password reset link" });
};
const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new CustomErrors.BadRequestError("please provide valid credentials");
  }
  const user = await User.findOne({ email });
  if (user) {
    const currentDate = new Date();

    if (
      user.passwordResetToken === createHash(token) &&
      currentDate < user.passwordResetTokenExpirationDate
    ) {
      user.passwordResetToken = null;
      user.passwordResetTokenExpirationDate = null;
      user.password = password;
      await user.save();
    }
  }

  res.status(StatusCodes.OK).json({ msg: "password reset successfully" });
};
const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });
  res.cookie("accessToken", "logout", {
    secure: process.env.NODE_ENV === "production" ? true : false,
    signed: true,
    sameSite: false,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    secure: process.env.NODE_ENV === "production" ? true : false,
    signed: true,
    httpOnly: true,
    sameSite: false,
    expires: new Date(Date.now()),
  });
  res.send("logged out user");
};
module.exports = {
  registerUser,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logout,
};
