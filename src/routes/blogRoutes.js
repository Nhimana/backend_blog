import { Router } from "express";
const router = Router();
import {
	createBlogController,
	deleteBlogController,
	getAllBlogsController,
	getBlogController,
	updateBlogController,
} from "../controller/blogsController.js";
import { protectRoute } from "../middleware/secureRoute.js";

router
	.route("/")
	.get(getAllBlogsController)
	.post(protectRoute, createBlogController);

router
	.route("/:id")
	.get(getBlogController)
	.put(protectRoute, updateBlogController)
	.delete(protectRoute, deleteBlogController);

export { router as blogsRoutes };
