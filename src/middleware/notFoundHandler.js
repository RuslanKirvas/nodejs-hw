export const notFoundHandler =(req, res) => {
  req.log.warn(`Route not found: ${req.method} ${req.url}`);
  return res.status(404).json({
    message: "Route not found"
  });
}
