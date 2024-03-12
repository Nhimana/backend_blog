import { Router } from "express";
const router = Router();
import { protectRoute } from "../middleware/secureRoute.js";
import { createBlogController, deleteBlogController, getAllBlogsController, getBlogController, updateBlogController } from "../controller/blogsController.js";

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
