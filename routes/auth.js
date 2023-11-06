import { Router } from "express";
import {
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/auth.js";

// Create router for user authentication
const router = Router();

// User register route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

// Refresh access token route
router.post("/refresh-token", refreshAccessToken);

export default router;
