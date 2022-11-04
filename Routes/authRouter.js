const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
  logout,
} = require("../Controllers/authController");
const ratelimiter = require("express-rate-limit");
const apiLimiter = ratelimiter({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    msg: "Too many requests from this ip please try agin after 15 minutes",
  },
});
const { authMiddleware } = require("../Middleware/authMiddleware");
router.post("/register", apiLimiter, registerUser);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
router.post("/forgot-password", apiLimiter, forgotPassword);
router.post("/reset-password", resetPassword);
router.delete("/logout", authMiddleware, logout);
module.exports = router;
