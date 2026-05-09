import { isHttpError } from "http-errors";

export const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  // Безопасное логирование (проверяем, существует ли req.log)
  if (req.log && typeof req.log.error === "function") {
    req.log.error({
      error: err.message,
      stack: isProd ? undefined : err.stack
    }, "Server error occurred");
  } else {
    console.error("Server error occurred:", err.message);
  }

  const status = err.status || err.statusCode || 500;

  if (isHttpError(err)) {
    return res.status(status).json({ message: err.message });
  }

  res.status(status).json({
    message: isProd && status === 500 ? "Internal server error" : err.message
  });
};
