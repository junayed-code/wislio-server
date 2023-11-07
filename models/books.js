import slugify from "slugify";
import { Schema, model } from "mongoose";

const cast = "{VALUE} is not a number.";
const required = [true, "`{PATH}` field is required."];

const schema = new Schema(
  {
    name: { type: String, required, cast },
    image: { type: String, required, cast },
    author: { type: String, required, cast },
    category: { type: String, required, cast },
    quantity: { type: Number, required, cast },
    rating: { type: Number, required, cast },
    description: { type: String, required, cast },
    slug: String,
  },
  {
    toJSON: {
      versionKey: false,
    },
  }
);

// Mongoose middleware function
schema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    trim: true,
    remove: /[*+~.()'"!:@%$#]/g, // Remove all spceial characters
  });
  next();
});

// Define schema static function to get books by category
schema.statics.findByCategory = function (category) {
  return this.find({ category: new RegExp(category, "i") });
};

const Books = model("Books", schema);

export default Books;
