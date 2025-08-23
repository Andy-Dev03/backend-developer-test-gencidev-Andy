const isError = (err, _req, res, _next) => {
  console.log(err);

  let statusError = 500;
  let messageError = "Internal Server Error";

  if (err.name === "SequelizeValidationError") {
    statusError = 400;
  } else if (err.name === "SequelizeUniqueConstraintError") {
    statusError = 400;
    messageError = err.errors[0].message;
  } else if (err.name === "EmptyEmail") {
    statusError = 400;
    messageError = "Email is required";
  } else if (err.name === "EmptyPassword") {
    statusError = 400;
    messageError = "Password is required";
  } else if (err.name === "InvalidUser") {
    statusError = 401;
    messageError = "Invalid email or password";
  }

  res.status(statusError).json({
    statusCode: statusError,
    error: {
      message: messageError,
    },
  });
};

module.exports = isError;
