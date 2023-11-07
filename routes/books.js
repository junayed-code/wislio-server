import { Router } from "express";
import { Error } from "mongoose";
import createError from "http-errors";
import Books from "../models/books.js";

const router = Router();

// Get all books
router.get("/", async (_req, res, next) => {
  try {
    const books = await Books.find();
    if (!books.length) throw createError(404, "No Books Found!");

    res
      .status(200)
      .json({ status: "success", length: books.length, data: books });
  } catch (error) {
    next(error);
  }
});

// Get a book by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    if (!book) throw createError(404, "No Book Found!");

    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    if (error instanceof Error.CastError) {
      return next(createError(422, "Invalid book ID"));
    }

    next(error);
  }
});

// Get a book by slug
router.get("/slug/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const book = await Books.findOne({ slug });
    if (!book) throw createError(404, "No Book Found!");

    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    next(error);
  }
});

// Get books based on category
router.get("/category/:category", async (req, res, next) => {
  try {
    const { category } = req.params;
    const books = await Books.findByCategory(category);
    if (!books.length) throw createError(404, "No Books Found!");

    res.status(200).json({ status: "success", data: books });
  } catch (error) {
    next(error);
  }
});

// Add new book
router.post("/", async (req, res, next) => {
  try {
    const { name, image, author, category, quantity, rating, description } =
      req.body;

    // Add new book into the database
    const doc = {
      name,
      image,
      author,
      category,
      quantity,
      rating,
      description,
    };
    const book = await Books.create(doc);

    res.status(201).json({ status: "success", data: book });
  } catch (error) {
    if (error.name === "ValidationError") {
      const { name, image, author, category, quantity, rating, description } =
        error.errors;

      const errorMessage =
        name?.message ||
        image?.message ||
        author?.message ||
        category?.message ||
        quantity?.message ||
        rating?.message ||
        description?.message ||
        error.message;

      next(createError(400, errorMessage));
    } else next(error);
  }
});

// Update a book by id
router.patch("/:id", async (req, res, next) => {
  try {
    const updatedDoc = { ...req.body };
    const { id } = req.params;

    const updatedBook = await Books.findByIdAndUpdate(id, updatedDoc, {
      returnDocument: "after",
    });

    if (!updatedBook) throw createError(404, "No Book Found!");

    res.status(200).json({ status: "success", data: updatedBook });
  } catch (error) {
    next(error);
  }
});

// Delete a book by id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Books.findByIdAndDelete(id, { returnDocument: "after" });
    if (!book) throw createError(404, "No book found for delete operation!");

    res.status(200).json({ status: "success", data: book });
  } catch (error) {
    next(error);
  }
});

export default router;
