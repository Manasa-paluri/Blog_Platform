import { useEffect, useState } from "react";
import axios from "axios";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {blogs.length === 0 ? <p>No blogs found.</p> : (
        blogs.map((blog) => (
          <div key={blog.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogList;
