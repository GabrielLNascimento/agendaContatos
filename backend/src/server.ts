import "dotenv/config";
import express from "express";
import cors from 'cors'
import router from './routes/index.js'
import { connectDB } from "./config/prisma.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors())
app.use(express.json());
app.use(router)

// Iniciar servidor
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`📍 http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
        process.exit(1);
    }
};

startServer();  