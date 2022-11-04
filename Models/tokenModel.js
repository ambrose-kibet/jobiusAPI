const mongoose = require("mongoose");
const tokenSchema = mongoose.Schema({
  isValid: {
    type: Boolean,
    default: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Token", tokenSchema);
