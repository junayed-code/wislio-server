import "dotenv/config";
import jwt from "jsonwebtoken";

/**
 *
 * @param {object} playload
 * @param {string} playload.email
 * @param {string=} playload.role
 * @param {jwt.Secret} secret
 * @param {string} [expiry='15m']
 */
export const createToken = (playload, secret, expiry = "15m") => {
  return jwt.sign(playload, secret, {
    algorithm: "HS512",
    expiresIn: expiry,
  });
};

/**
 *
 * @param {string} token
 * @param {jwt.Secret} secret
 */
export const verifyToken = (token, secret) => {
  try {
    const playload = jwt.verify(token, secret, {
      algorithms: ["HS512"],
    });
    return { playload, verify: true };
  } catch (err) {
    return { verify: false, error: err.message };
  }
};
