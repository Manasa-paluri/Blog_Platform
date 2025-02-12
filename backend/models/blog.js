import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../index.js";

class Blog extends Model {}

Blog.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false }
  },
  { sequelize, modelName: "Blog" }
);

export default Blog;
