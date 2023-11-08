import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/auth.js";

// Create router for user authentication
const router = Router();

// User register route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

// User logout route
router.post("/logout", logoutUser);

// Refresh access token route
router.post("/refresh-token", refreshAccessToken);

export default router;
