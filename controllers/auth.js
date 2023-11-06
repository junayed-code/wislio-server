import createError from "http-errors";
import User from "../models/user.js";
import { createToken, verifyToken } from "../utils/jwt.js";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const role = "user";
    if (!email) throw createError(400, "The user email is required");

    // Check if the user is already registered
    const isUser = await User.findOne({
      email: { $regex: email, $options: "i" },
    });
    if (isUser) {
      throw createError(
        400,
        "This email is already registered in the database"
      );
    }

    // If not user registered then register the user in the database
    const user = new User({ email, role });
    await user.save();

    res.status(201).json({ status: "success", data: { email, role } });
  } catch (error) {
    if (error.name === "ValidationError") {
      const { email } = error.errors;
      next(createError(400, email?.message || error.message));
    } else next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    if (!req.body?.email) throw createError(400, "The user email is required");

    // Check if the user has registered
    const user = await User.findOne({
      email: { $regex: req.body?.email, $options: "i" },
    });
    if (!user) throw createError(401, "Unauthorized user");
    const { email, role } = user;

    // Create access token and refresh token to authenticate the user.
    const accessToken = createToken({ email, role }, ACCESS_TOKEN_SECRET);
    const refreshToken = createToken(
      { email, role },
      REFRESH_TOKEN_SECRET,
      "30d"
    );

    const tokenCookieKey =
      "_" + Buffer.from("jwt_access_token").toString("base64url");
    const refreshTokenCookieKey =
      "_" + Buffer.from("jwt_refresh_token").toString("base64url");

    res
      .cookie(tokenCookieKey, accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 900_000, // 15 minutes
      })
      .cookie(refreshTokenCookieKey, refreshToken, {
        path: "/refresh-token",
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 2592_000_000, // 30 days
      });

    res
      .status(200)
      .json({ status: "success", data: { accessToken, refreshToken } });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    // Verify user refresh token
    const { verify, playload } = verifyToken(
      refreshToken,
      REFRESH_TOKEN_SECRET
    );
    if (!verify) {
      throw createError(403, "Forbidden user");
    }

    const { email, role } = playload;
    const user = await User.findOne({ email });
    if (!user) throw createError(401, "Unauthorized user");

    // Create access token
    const accessToken = createToken({ email, role }, ACCESS_TOKEN_SECRET);
    const tokenCookieKey =
      "_" + Buffer.from("jwt_access_token").toString("base64url");

    res
      .cookie(tokenCookieKey, accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 900_000, // 15 minutes
      })
      .status(200)
      .send({ status: "success", data: { accessToken } });
  } catch (err) {
    next(err);
  }
};
