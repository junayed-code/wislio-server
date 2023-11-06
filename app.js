import "dotenv/config";
import "./mongoose/init.js"; // Initialize mongoose
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import CategoriesRoute from "./routes/categories.js";
import decodeCookieKey from "./middlewares/decodeCookieKey.js";
import AuthRoute from "./routes/auth.js";

const { PORT = 4040 } = process.env;

// Initialize express app
const app = express();

// Cookies parser middleware
app.use(cookieParser());
app.use(decodeCookieKey);

// JSON content parser middleware
app.use(express.json());

// CORS policy handler middleware
app.use(cors({ origin: [], credentials: true }));

// Router middlewares
app.use(AuthRoute);
app.use("/categories", CategoriesRoute);

app.get("/", (req, res, next) => {
  console.log(req.cookies);
  res.send({ status: "success", name: "Wislio" });
});

// Not Found handler middleware
app.use(notFound);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
