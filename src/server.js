

import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino-http";
import "dotenv/config";

const app = express();

app.use(pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  }
}));

// Стандартние middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// ========== МАРШРУТЫ ДЛЯ НОТАТОК ==========

// GET /notes - получення всіх заміток
app.get("/notes", (req, res) => {
  req.log.info("GET /notes request received");
  res.status(200).json({
    message: "Retrieved all notes"
  });
});

// GET /notes/:noteId - получення одной замітки по ID
app.get("/notes/:noteId", (req, res) => {
  const { noteId } = req.params;
  req.log.info(`GET /notes/${noteId} request received`);
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`
  });
});

// ========== ТЕСТОВИЙ МАРШРУТ ДЛЯ ПОМИЛКИ ==========

app.get("/test-error", () => {
  throw new Error("Simulated server error");
});

// ========== MIDDLEWARE ДЛЯ 404 ==========

app.use((req, res) => {
  req.log.warn(`Route not found: ${req.method} ${req.url}`);
  return res.status(404).json({
    message: "Route not found"
  });
});

// ========== MIDDLEWARE ДЛЯ ОБРОБКИ ПОМИЛОК (500) ==========

app.use((err, req, res) => {
  const isProd = process.env.NODE_ENV === "production";

  req.log.error({
    error: err.message,
    stack: isProd ? undefined : err.stack
  }, "Server error occurred");

  res.status(500).json({
    message: isProd ? "Internal server error" : err.message
  });
});

// ========== ЗАПУСК СЕРВЕРА ==========

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Available routes:`);
  console.log(`  GET /notes`);
  console.log(`  GET /notes/:noteId`);
  console.log(`  GET /test-error`);
});
