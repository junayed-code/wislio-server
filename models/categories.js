import mongoose from "mongoose";

// Create schema for Categories model
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Create Categories mongoose model
const Categories = mongoose.model("Categories", schema);

export default Categories;
