const jwt = require("jsonwebtoken");
const createJwt = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};
const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
const attachResToCookies = ({ res, payload, refreshToken }) => {
  const accessTokenjwt = createJwt(payload);
  const refreshTokenjwt = createJwt({ user: payload, refreshToken });
  const oneDay = 1000 * 60 * 60 * 24;
  const LongerLifeTime = 1000 * 60 * 60 * 24 * 30;
  res.cookie("accessToken", accessTokenjwt, {
    signed: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    expires: new Date(Date.now() + oneDay),
  });
  res.cookie("refreshToken", refreshTokenjwt, {
    signed: true,
    httpOnly: true,
    expires: new Date(Date.now() + LongerLifeTime),
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
};

module.exports = { createJwt, verifyJwt, attachResToCookies };
