import express from "express";

/**
 *
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
const decodeCookieKey = (req, _res, next) => {
  for (const key in req.cookies) {
    if (!key.startsWith("_and")) continue;

    // Decode cookie key from base64url to utf-8
    const cookieKey = Buffer.from(key.replace("_", ""), "base64url").toString(
      "utf-8"
    );

    switch (cookieKey) {
      case "jwt_access_token":
        req.cookies.accessToken = req.cookies[key];
        delete req.cookies[key];
        break;
      case "jwt_refresh_token":
        req.cookies.refreshToken = req.cookies[key];
        delete req.cookies[key];
        break;
    }
  }
  next();
};

export default decodeCookieKey;
