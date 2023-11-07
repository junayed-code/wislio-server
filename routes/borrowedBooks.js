import { Router } from "express";
import createError from "http-errors";
import Books from "../models/books.js";
import BorrowedBooks from "../models/borrowedBooks.js";

const router = Router();

// Get borrowed books
router.get("/", async (req, res, next) => {
  try {
    const { email } = req.user;
    const borrowedBook = await BorrowedBooks.findOne({ email }, { bookids: 1 });
    if (!borrowedBook) throw createError(404, "No Borrowed Books Found!");

    const borrowedBooks = await Books.find({
      _id: { $in: borrowedBook.bookids },
    });

    if (!borrowedBooks.length)
      throw createError(404, "No Borrowed Books Found!");

    res.status(200).json({
      status: "success",
      length: borrowedBooks.length,
      data: borrowedBooks,
    });
  } catch (error) {
    next(error);
  }
});

// Get borrowed book ids
router.get("/ids", async (req, res, next) => {
  try {
    const { email } = req.user;
    const borrowedBook = await BorrowedBooks.findOne({ email }, { bookids: 1 });
    if (!borrowedBook) throw createError(404, "No Borrowed Book ids Found!");

    res.status(200).json({
      status: "success",
      length: borrowedBook.bookids.length,
      data: borrowedBook,
    });
  } catch (error) {
    next(error);
  }
});

// Add a new borrowed book
router.put("/", async (req, res, next) => {
  try {
    const { email } = req.user;
    const { bookid } = req.body;
    const doc = { email, $push: { bookids: bookid } };
    // prettier-ignore
    const borrowedBook =
      await BorrowedBooks.findOneAndUpdate( { email }, doc, {
        upsert: true,
        returnDocument: 'after',
        projection: { bookids: 1 }
      });

    res.status(200).json({ status: "success", data: borrowedBook });
  } catch (error) {
    next(error);
  }
});

// Delete a borrowed book by id
router.delete("/:id", async (req, res, next) => {
  try {
    const { email } = req.user;
    const { id } = req.params;
    const borrowedBook = await BorrowedBooks.findOneAndUpdate(
      { email, bookids: id },
      { $pull: { bookids: id } },
      { returnDocument: "after" }
    );
    if (!borrowedBook) throw createError(404, "No Borrowed Book Found!");

    const { bookids } = borrowedBook;
    res.status(200).json({ status: "success", data: { bookids } });
  } catch (error) {
    next(error);
  }
});

export default router;
