import "dotenv/config";
import "./mongoose/init.js"; // Initialize mongoose
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/auth.js";
import CategoriesRoute from "./routes/categories.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import decodeCookieKey from "./middlewares/decodeCookieKey.js";
import verifyingUser from "./middlewares/verifyingUser.js";
import protectedRoute from "./middlewares/protectedRoute.js";

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

// Verifying user middleware
app.use(verifyingUser());

// Router middlewares
app.use(AuthRoute);
app.use("/categories", protectedRoute, CategoriesRoute);

app.get("/", (_req, res, _next) => {
  res.send({ status: "success", name: "Wislio" });
});

// Not Found handler middleware
app.use(notFound);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
