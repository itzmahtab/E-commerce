import ErrorHandler from "../middlewares/errorMiddlewares";
import { catchAsyncError } from "../middlewares/catchAsyncEroor";
import database from "../database/db";
import bcrypt from "bcryptjs";

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
});

export const login = catchAsyncError(async (req, res, next) => {});

export const getUserProfile = catchAsyncError(async (req, res, next) => {});

const logout = catchAsyncError(async (req, res, next) => {});
