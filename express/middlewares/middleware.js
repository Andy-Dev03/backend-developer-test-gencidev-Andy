const { User, Note } = require("../models");
const { verifyToken } = require("../utils/jwt");

// Middleware for authentication using JWT
const authentication = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Unauthentication");

    const token = authorization.split(" ")[1];
    if (!token) throw new Error("Unauthentication");

    const payload = verifyToken(token);
    const user = await User.findByPk(+payload.id);

    if (!user) throw new Error("Unauthentication");

    req.user = {
      id: user.id,
    };

    next();
  } catch (err) {
    next(err);
  }
};

const authorization = async (req, _res, next) => {
  try {
    const currentUser = req.user.id;
    const { id } = req.params;

    const note = await Note.findByPk(+id);

    if (!note) throw new Error("Note_Not_Found");

    if (note.UserId !== currentUser) throw new Error("forbidden");

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication, authorization };
