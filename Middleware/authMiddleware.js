const CustomeErrors = require("../Errors");
const tokenModel = require("../Models/tokenModel");

const { verifyJwt, attachResToCookies } = require("../Utils");
const authMiddleware = async (req, res, next) => {
  const { accessToken, refreshToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload = verifyJwt(accessToken);
      req.user = { ...payload };
      next();
      return;
    }
    const payload = verifyJwt(refreshToken);
    const checkToken = await tokenModel.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!checkToken || !checkToken.isValid) {
      throw new CustomeErrors.UnauthenticatedError("Authentication failed");
    }
    req.user = payload.user;
    attachResToCookies({
      res,
      payload: payload.user,
      refreshToken: payload.refreshToken,
    });
    next();
  } catch (error) {
    throw new CustomeErrors.UnauthenticatedError("Authentication failed");
  }
};
const authorizePermissions = (...params) => {
  return async (req, res, next) => {
    if (!params.includes(req.user.role)) {
      throw new CustomeErrors.UnauthorizedError(
        "Not authorized to acess this route"
      );
    }
    next();
  };
};
module.exports = { authMiddleware, authorizePermissions };
