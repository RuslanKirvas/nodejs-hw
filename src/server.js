


// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import "dotenv/config";
// import { connectMongoDB } from "./db/connectMongoDB.js";
// import { notFoundHandler } from "./middleware/notFoundHandler.js";
// import { errorHandler } from "./middleware/errorHandler.js";
// import notesRoutes from "./routes/notesRoutes.js";
// import { logger } from "./middleware/logger.js";

// const app = express();


// app.use(logger);

// app.use(cors({
//   methods: ["GET", "POST", "PATCH", "DELETE"],
//   origin: "*",
// }));
// app.use(helmet());
// app.use(express.json());

// // Маршруты
// app.use(notesRoutes);

// // 404 и errorHandler
// app.use(notFoundHandler);
// app.use(errorHandler);

// // Запуск сервера
// const startServer = async () => {
//   await connectMongoDB();
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log(`Available routes: GET, POST, PATCH, DELETE /notes`);
//   });
// };
//  startServer();





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

app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

// ========== ДИАГНОСТИКА ==========
console.log("=== ENV CHECK ===");
console.log("PORT:", process.env.PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("MONGO_URL:", process.env.MONGO_URL ? "defined" : "undefined");
console.log("=================");

console.log("1. Diagnostic: About to connect to MongoDB...");

// ========== ЗАПУСК СЕРВЕРА (ОДИН РАЗ!) ==========
async function startServer() {
  console.log("2. Diagnostic: Inside startServer function...");
  console.log("3. Diagnostic: Calling connectMongoDB...");
  await connectMongoDB();
  console.log("4. Diagnostic: Back from connectMongoDB...");

  const PORT = process.env.PORT || 3000;
  console.log(`5. Diagnostic: Trying to listen on port ${PORT}...`);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  console.log("6. Diagnostic: app.listen called, waiting for callback...");
}

console.log("7. Diagnostic: Calling startServer function...");
startServer();
