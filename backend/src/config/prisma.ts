import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("✅ Conectado ao MongoDB com Prisma!");
    } catch (error) {
        console.error("❌ Erro ao conectar no MongoDB:", error);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    await prisma.$disconnect();
    console.log("🔌 Desconectado do MongoDB");
};

export default prisma;
