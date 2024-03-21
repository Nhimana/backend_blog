import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import { blogsRoutes } from "./routes/blogRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";

const app = express();
if (process.env.NODE_ENV !== "production") {
  import('dotenv').then(({ config }) => {
    config()
  })
  app.use((req, _, next) => {
    console.log(req.path);
    next()
  })
}
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/blogs", blogsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use((req, res) => res.status(404).json({ message: "route not found" }));

connect(process.env.DB_URL, {
  auth: {
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    username: process.env.MONGO_INITDB_ROOT_USERNAME
  },
  serverSelectionTimeoutMS: 5000
}).then(() => {
  app.listen(port, () => console.log(`server started on ${port}`));
}).catch(err => console.log(err.reason));

