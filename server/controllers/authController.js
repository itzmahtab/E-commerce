import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import database from "../database/db.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const isAlreadyRegistered = await database.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );

  if (isAlreadyRegistered.length > 0) {
    return next(new ErrorHandler("User already registered", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await database.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword],
  );
  sendToken(user.rows[0], 201, "User registered successfully", res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  const user = await database.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (user.rows.length === 0) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await bcrypt.compare(password, user.rows[0].password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user.rows[0], 200, "User logged in successfully", res);
});

export const getUserProfile = catchAsyncError(async (req, res, next) => {

  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });

});

export const logout = catchAsyncError(async (req, res, next) => {
  res.status(200).cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  }).json({
    success: true,
    message: "User logged out successfully",
  });
});
