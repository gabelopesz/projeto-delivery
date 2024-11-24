import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/userRoutes";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use("/api", userRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("Database connection error:", error));
