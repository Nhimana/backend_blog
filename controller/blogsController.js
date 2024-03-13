import Joi from 'joi'
import { Blog } from "../db/blogSchema.js";

/**
 * 
 * @param {import("express").Response} res 
 * @returns 
 */

export async function getAllBlogsController(_, res) {
  try {
    const blogs = await Blog.find();
    res.json({ data: blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */

export async function createBlogController(req, res) {
  const schema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    body: Joi.string().required(),
    subTitle: Joi.string()
  })

  const { error, value, warning } = schema.validate(req.body)
  if (error)
    return res.status(400).json(error)
  if (warning) return res.status(400).json(warning)

  try {
    if (!(req.user.email === process.env.ADMIN_EMAIL))
      return res.status(401).json({ message: "only admin can post a blog" });
    const { title, body, image, subTitle } = req.body;
    const blog = await Blog.create(value);
    res.json({ data: blog, warning, message: 'created successfuly' });

  } catch (error) {
    res.status(500).json(error)
  }

}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */

export async function getBlogController(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json({ data: blog });

  } catch (error) {
    res.status(500).json({ error })

  }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
export async function deleteBlogController(req, res) {
  try {

    if (!(req.user.email === process.env.ADMIN_EMAIL))
      return res.status(401).json({ message: "only admin can delete a blog" });

    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.json({ data: blog });
  } catch (error) {
    res.status(500).json({ error })

  }
}



/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
export async function updateBlogController(req, res) {
  try {
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

  } catch (error) {
    res.status(500).json({ error })

  }
}

