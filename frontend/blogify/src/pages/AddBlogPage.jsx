import AddBlog from "../components/AddBlog";
import { Link } from "react-router-dom";

function AddBlogPage() {
  return (
    <div style={{
      backgroundImage: "url('/background.gif')",
      backgroundSize: "cover",
      minHeight: "100vh",
      padding: "20px",
      textAlign: "center"
    }}>
      <h1>Add a Blog</h1>
      <AddBlog />
      <Link to="/">
        <button style={{ padding: "10px", fontSize: "16px" }}>Back to Home</button>
      </Link>
    </div>
  );
}

export default AddBlogPage;
