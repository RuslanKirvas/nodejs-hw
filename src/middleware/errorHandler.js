import { HttpError } from "http-errors";


export const errorHandler = (err, req, res, _next) => {
  const isProd = process.env.NODE_ENV === "production";



  // Логирование
  if (req.log && typeof req.log.error === "function") {
    req.log.error({
      error: err.message,
      stack: isProd ? undefined : err.stack
    }, "Server error occurred");
  } else {
    console.error("Server error occurred:", err.message);
  }

  // HTTP ошибки (createHttpError)
  if (err instanceof HttpError) {
    const status = err.status || err.statusCode || 500;
    const message = err.message || err.name || "HTTP error";
    return res.status(status).json({ message });
  }

  // Внутренние ошибки сервера
  const message = err.message || err.name || "Internal server error";
  res.status(500).json({
    message: isProd ? "Internal server error" : message
  });
};
