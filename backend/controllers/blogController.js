import Blog from "../models/blog.js";

// Fetch all blogs
export async function getBlogs(req, res) {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs", details: error.message });
  }
}

// Fetch a single blog by ID
export async function getBlogById(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findByPk(id);

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog", details: error.message });
  }
}

// Create a new blog
export async function createBlog(req, res) {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newBlog = await Blog.create({ title, content });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to create blog", details: error.message });
  }
}
