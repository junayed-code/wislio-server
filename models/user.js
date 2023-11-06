import { Schema, model } from "mongoose";

// Create a schema for user model
const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  role: String,
});

// Create the User model
const User = model("User", schema);

export default User;
