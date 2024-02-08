export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)
  console.log('kör middleware errorhandler')
  res.json({
    message: err.message,
    stack:err.stack
  });
}