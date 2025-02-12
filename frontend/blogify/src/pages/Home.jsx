import BlogList from "../components/BlogList";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{
      backgroundImage: "url('/background.gif')",
      backgroundSize: "cover",
      minHeight: "100vh",
      padding: "20px",
      textAlign: "center"
    }}>
      <h1>Welcome to the Blog Platform</h1>
      <Link to="/add-blog">
        <button style={{ padding: "10px", fontSize: "16px" }}>Add New Blog</button>
      </Link>
      <BlogList />
    </div>
  );
}

export default Home;
