import { isHttpError } from "http-errors";

export const errorHandler = (err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  // Безопасное логирование
  if (req.log && typeof req.log.error === "function") {
    req.log.error({
      error: err.message,
      stack: isProd ? undefined : err.stack
    }, "Server error occurred");
  } else {
    console.error("Server error occurred:", err.message);
  }

  const status = err.status || err.statusCode || 500;
  const message = err.message || err.name || "Internal server error";

  if (isHttpError(err)) {
    return res.status(status).json({ message });
  }

  res.status(status).json({
    message: isProd && status === 500 ? "Internal server error" : message
  });
};
