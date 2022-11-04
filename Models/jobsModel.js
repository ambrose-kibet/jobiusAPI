const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
      required: [true, "please provide company value"],
    },
    position: {
      type: String,
      trim: true,
      required: [true, "please provide position  value"],
    },
    status: {
      type: String,

      enum: {
        values: ["interview", "pending", "declined"],
        message: "{Value} is not supported",
      },
      default: "pending",
    },

    jobLocation: {
      type: String,
      default: "my city",
      trim: true,
    },
    jobType: {
      type: String,
      default: "full-time",
      enum: {
        values: ["remote", "full-time", "part-time", "internship"],
        message: "{Value} is not supported",
      },
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Job", jobSchema);
