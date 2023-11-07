import { Schema, model } from "mongoose";

const required = [true, "`{PATH}` field is required."];

const schema = new Schema(
  {
    email: { type: String, required },
    bookids: { type: [String], required },
  },

  { toJSON: { versionKey: false } }
);

const BorrowedBooks = model("BorrowedBooks", schema);

export default BorrowedBooks;
