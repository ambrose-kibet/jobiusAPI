const router = require("express").Router();
const {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
  showStats,
} = require("../Controllers/jobsController");
const {
  authMiddleware,
  authorizePermissions,
} = require("../Middleware/authMiddleware");
const ratelimiter = require("express-rate-limit");
const apiLimiter = ratelimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "Too many requests from this ip please try agin after 15 minutes",
  },
});
router.route("/").get(authMiddleware, getAllJobs);
router.route("/").post(authMiddleware, createJob);
router.route("/showStats").get(authMiddleware, showStats);
router.route("/:id").get(authMiddleware, getSingleJob);
router.route("/:id").patch(authMiddleware, updateJob);
router.route("/:id").delete(authMiddleware, deleteJob);
module.exports = router;
