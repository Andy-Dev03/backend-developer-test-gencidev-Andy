const isError = (err, _req, res, _next) => {
  console.log(err);

  let statusError = 500;
  let messageError = "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    statusError = 400;
    messageError = err.errors[0].message;
  } else if (err.name === "SequelizeUniqueConstraintError") {
    statusError = 400;
    messageError = err.errors[0].message;
  } else if (err.message === "EmptyEmail") {
    statusError = 400;
    messageError = "Email is required";
  } else if (err.message === "EmptyPassword") {
    statusError = 400;
    messageError = "Password is required";
  } else if (err.message === "InvalidUser") {
    statusError = 401;
    messageError = "Invalid email or password";
  } else if (err.message === "Unauthentication") {
    statusError = 401;
    messageError = "You need to login first";
  } else if (err.name === "JsonWebTokenError") {
    statusError = 401;
    messageError = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusError = 401;
    messageError = "Your token is expired";
  } else if (err.message === "forbidden") {
    statusError = 403;
    messageError = "You are not authorized to access this note";
  } else if (err.message === "Note_Not_Found") {
    statusError = 404;
    messageError = "Note not found";
  }

  res.status(statusError).json({
    statusCode: statusError,
    error: {
      message: messageError,
    },
  });
};

module.exports = isError;
