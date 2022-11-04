const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name value"],
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide name value"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "please provide a valid email",
    },
  },
  lastName: {
    type: String,
    minlength: 3,
    default: "last Name",
    trim: true,
  },
  location: {
    type: String,
    minlength: 3,
    default: "my city",
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifiedDate: Date,
  verificationToken: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "please provide password value"],
    minlength: 7,
  },
  passwordResetToken: { type: String },
  passwordResetTokenExpirationDate: { type: Date },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comparepasswords = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", userSchema);
