const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (password, hashPass) => {
  return bcrypt.compareSync(password, hashPass);
};

module.exports = {
  hashPassword,
  comparePassword,
};
