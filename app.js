import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { blogsController } from "./controller/blogsController.js";
import { authController } from "./controller/authController.js";

const app = express();
if (process.env.NODE_ENV !== "production") config();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL, () => {
  console.log("connected to db");
});
app.use(express.json());
app.use("/api/v1/blogs", blogsController);
app.use("/api/v1/auth", authController);
app.use((req, res) => res.status(404).json({ message: "route not found" }));
app.listen(port, () => console.log(`server started on ${port}`));
