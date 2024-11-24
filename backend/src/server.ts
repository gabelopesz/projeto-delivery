import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./config/database";
import { productRoutes } from "./routes/productRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Inicializar banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado!");

    // Registrar rotas após a inicialização do banco
    app.use("/products", productRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
