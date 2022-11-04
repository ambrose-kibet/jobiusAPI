const router = require("express").Router();
const {
  getAllUsers,
  getsingleUser,
  updateUser,
  updateUserPassword,
  showMe,
} = require("../Controllers/userController");
const {
  authMiddleware,
  authorizePermissions,
} = require("../Middleware/authMiddleware");
router
  .route("/")
  .get(authMiddleware, authorizePermissions("admin"), getAllUsers);
router.route("/showMe").get(authMiddleware, showMe);
router.route("/update-user").patch(authMiddleware, updateUser);
router.route("/update-user-password").patch(authMiddleware, updateUserPassword);
router.route("/:id").get(authMiddleware, getsingleUser);
module.exports = router;
