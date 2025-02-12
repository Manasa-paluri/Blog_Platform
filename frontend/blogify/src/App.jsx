import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa"; // ✅ Import heart icon

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(() => {
    const savedLikes = localStorage.getItem("likes");
    return savedLikes ? JSON.parse(savedLikes) : {}; // ✅ Load likes from Local Storage on first render
  });
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem("comments");
    return savedComments ? JSON.parse(savedComments) : {}; // ✅ Load comments from Local Storage
  });

  useEffect(() => {
    axios.get("http://localhost:5000/blogs")
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  // ✅ Save likes & comments to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/blogs", { title, content });
      setBlogs([...blogs, response.data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleLike = (id) => {
    setLikes((prevLikes) => {
      const updatedLikes = {
        ...prevLikes,
        [id]: (prevLikes[id] || 0) + 1,
      };

      localStorage.setItem("likes", JSON.stringify(updatedLikes)); // ✅ Save likes immediately
      return updatedLikes;
    });
  };

  const handleComment = (id, commentText) => {
    if (!commentText.trim()) return;

    setComments((prevComments) => {
      const updatedComments = {
        ...prevComments,
        [id]: [...(prevComments[id] || []), commentText],
      };

      localStorage.setItem("comments", JSON.stringify(updatedComments)); // ✅ Save to Local Storage
      return updatedComments;
    });
  };

  return (
    <div style={{
      background: "linear-gradient(to right, #6a11cb, #2575fc)",
      minHeight: "100vh",
      padding: "20px",
      textAlign: "center",
      color: "white",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>My Blog Platform</h1>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: "20px",
        borderRadius: "10px",
        width: "50%",
        margin: "0 auto",
      }}>
        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "none",
            fontSize: "16px"
          }}
        />
        <textarea
          placeholder="Enter Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "none",
            fontSize: "16px",
            height: "120px"
          }}
        />
        <button type="submit" style={{
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "#ff5e62",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "0.3s"
        }}>Add Blog</button>
      </form>

      {/* Blog List */}
      <div style={{ marginTop: "20px" }}>
        {blogs.length === 0 ? <p>No blogs found.</p> : (
          blogs.map((blog) => (
            <div key={blog.id} style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              padding: "20px",
              borderRadius: "10px",
              width: "50%",
              margin: "10px auto",
              textAlign: "left",
            }}>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>{blog.title}</h2>
              <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>{blog.content}</p>
              
              {/* Like Button with Heart Icon ❤️ */}
              <button onClick={() => handleLike(blog.id)} style={{
                padding: "10px",
                fontSize: "16px",
                backgroundColor: "white",
                color: "#ff5e62",
                border: "2px solid #ff5e62",
                borderRadius: "50px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px"
              }}>
                <FaHeart style={{ color: "#ff5e62" }} /> {likes[blog.id] || 0}
              </button>

              {/* Comment Section */}
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleComment(blog.id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                  style={{
                    padding: "8px",
                    width: "70%",
                    marginRight: "5px",
                    borderRadius: "5px",
                    border: "none",
                    fontSize: "14px"
                  }}
                />
                <button style={{
                  padding: "8px 12px",
                  fontSize: "14px",
                  backgroundColor: "#ff5e62",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}>Comment</button>

                {/* Display Comments */}
                {comments[blog.id] && comments[blog.id].length > 0 && (
                  <div style={{ marginTop: "10px", padding: "10px", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "5px" }}>
                    <h4>Comments:</h4>
                    {comments[blog.id].map((comment, index) => (
                      <p key={index} style={{ fontSize: "14px", marginBottom: "5px" }}>- {comment}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
