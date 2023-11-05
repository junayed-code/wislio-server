import express from "express";
import createError from "http-errors";

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function notFound(_req, _res, next) {
  next(createError(404, "Not Found!"));
}

export default notFound;
