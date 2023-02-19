import express from "express";
import { Blog } from "../db/blogSchema.js";
import { protectRoute } from "../middleware/secureRoute.js";
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.send(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
  .post(protectRoute, async (req, res) => {
    if (!(req.user.email === process.env.ADMIN_EMAIL))
      return res.status(401).json({ message: "only admin can post a blog" });
    const { title, body, image, subTitle } = req.body;
    const blog = await Blog.create({ title, body, image, subTitle });
    res.send(blog);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.send(blog);
  })
  .put(protectRoute, async (req, res) => {
    if (!(req.user.email === process.env.ADMIN_EMAIL))
      return res.status(401).json({ message: "only admin can update a blog" });
    const { title, body, subTitle, image } = req.body;
    const updates = {};
    if (title) updates.title = title;
    if (body) updates.body = body;
    if (subTitle) updates.subTitle = subTitle;
    if (image) updates.image = image;
    const blog = await Blog.findByIdAndUpdate(req.params.id, updates);
    res.send(blog);
  })
  .delete(protectRoute, async (req, res) => {
    if (!(req.user.email === process.env.ADMIN_EMAIL))
      return res.status(401).json({ message: "only admin can delete a blog" });
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.send(blog);
  });
export { router as blogsController };
