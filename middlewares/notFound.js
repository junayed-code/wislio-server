import { Request, Response, NextFunction } from "express";
import createError from "http-errors";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function notFound(_req, _res, next) {
  next(createError(404, "Not Found!"));
}

export default notFound;
