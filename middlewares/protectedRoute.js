import createError from "http-errors";

const protectedRoute = (req, _res, next) => {
  if (!req.verify) next(createError(401, "Unauthorized user"));
  else next();
};

export default protectedRoute;
