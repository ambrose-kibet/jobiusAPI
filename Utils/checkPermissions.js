const CustomErrors = require("../Errors");
const checkPermissions = (requestuser, resoucerId) => {
  if (requestuser.role === "admin") return;
  if (requestuser.userId === resoucerId.toString()) return;
  throw new CustomErrors.UnauthorizedError(
    "Not Authorized to acess this resource"
  );
};
module.exports = checkPermissions;
