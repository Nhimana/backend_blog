import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  },
});

export const Blog = model("blog", blogSchema);
