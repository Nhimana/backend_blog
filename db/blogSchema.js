import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  image: {
    type: String,
  },
  subTitle: {
    type: String,
  },
});

export const Blog = mongoose.model("blog", blogSchema);
