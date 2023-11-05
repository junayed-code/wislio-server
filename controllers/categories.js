import express from "express";
import Categories from "../models/categories.js";

/**
 *
 * @param {express.Request} _req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export const getAllCategories = async (_req, res, next) => {
  try {
    const result = await Categories.find();
    res
      .status(200)
      .json({ status: "success", length: result.length, data: result });
  } catch (err) {
    next(err);
  }
};
