const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500
  const message = err.message || "Internal Server Error!"

  res.status(statusCode).json({
    success: false,
    message,
  })
}

export default errorHandler
