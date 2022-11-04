const createUserToken = (user) => {
  return {
    name: user.name,
    role: user.role,
    userId: user._id,
  };
};
module.exports = createUserToken;
