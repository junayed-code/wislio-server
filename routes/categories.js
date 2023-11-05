import express from "express";
import { getAllCategories } from "../controllers/categories.js";

// Create express router for categories route
const router = express.Router();

// Get all categories
router.get("/", getAllCategories);

export default router;
