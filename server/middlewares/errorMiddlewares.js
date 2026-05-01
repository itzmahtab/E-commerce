class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = "Duplicate field value entered";
  }
  if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "Invalid token";
  }
  if (err.name === "TokenExpiredError") {
    err.statusCode = 401;
    err.message = "Token expired";
  }

  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  // console.error(err);
  const errorMeassage = err.errors
    ? Object.values(err.errors)
        .map((el) => el.message)
        .join(", ")
    : err.message;
  console.error(errorMeassage);
};

export default ErrorHandler;
