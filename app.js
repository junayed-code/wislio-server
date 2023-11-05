import "dotenv/config";
import express from "express";

const { PORT = 4040 } = process.env;

// Initialize express app
const app = express();

app.get("/", (req, res, next) => {
  res.send({ status: "success", name: "Wislio" });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
