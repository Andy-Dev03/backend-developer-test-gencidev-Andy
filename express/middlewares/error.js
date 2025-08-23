const isError = (err, _req, res, _next) => {
  console.log(err);

  let statusError = 500;
  let messageError = "Internal Server Error";

  res.status(statusError).json({
    statusCode: statusError,
    error: {
      message: messageError,
    },
  });
};

module.exports = isError;
