export default function errorHandler(err, _req, res, _next) {
  const { status = 500, message } = err;
  res
    .status(status)
    .json({ status: "error", error: { statusCode: status, message } });
}
