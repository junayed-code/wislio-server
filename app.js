import "dotenv/config";
import "./mongoose/init.js"; // Initialize mongoose
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const { PORT = 4040 } = process.env;

// Initialize express app
const app = express();

app.get("/", (req, res, next) => {
  res.send({ status: "success", name: "Wislio" });
});

// Not Found handler middleware
app.use(notFound);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
