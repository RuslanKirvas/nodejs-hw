


import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import notesRoutes from "./routes/notesRoutes.js";
import { logger } from "./middleware/logger.js";

const app = express();


app.use(logger);

app.use(cors({
  methods: ["GET", "POST", "PATCH", "DELETE"],
  origin: "*",
}));
app.use(helmet());
app.use(express.json());

// Маршруты
app.use(notesRoutes);

// 404 и errorHandler
app.use(notFoundHandler);
app.use(errorHandler);

// Запуск сервера
const startServer = async () => {
  await connectMongoDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Available routes: GET, POST, PATCH, DELETE /notes`);
  });
};
 startServer();




