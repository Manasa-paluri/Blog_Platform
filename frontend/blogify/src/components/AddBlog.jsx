import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Both fields are required!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/blogs", { title, content });
      navigate("/"); // Redirect to home after adding a blog
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <div>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default AddBlog;
