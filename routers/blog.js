import express from "express";
import { isAuthenticated } from "../middlewares/auth.js"
import { createBlog, myBlog, updateBlog, deleteBlog, allBlogs, getBlogById } from "../controllers/blogController.js";


const router = express.Router();

router.post("/new", createBlog)
router.get("/myblogs", isAuthenticated, myBlog)
router.put("/:id", updateBlog)
router.delete("/:id", deleteBlog);
router.get("/allblogs", allBlogs);
router.get("/blogs/:id", isAuthenticated, getBlogById)


export default router;