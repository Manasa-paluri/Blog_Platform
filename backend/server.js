import express from "express";
import cors from "cors";
import sequelize from "./index.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API!");
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected!");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
};

startServer();
