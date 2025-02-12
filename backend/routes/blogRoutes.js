import express from "express";
import { getBlogs, createBlog, getBlogById } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById); // ✅ Fetch a single blog by ID
router.post("/", createBlog);

export default router;
