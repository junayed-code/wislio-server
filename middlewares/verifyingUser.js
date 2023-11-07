import User from "../models/user.js";
import { verifyToken } from "../utils/jwt.js";

const { ACCESS_TOKEN_SECRET } = process.env;

/**
 *
 * @param {object} options
 * @returns {Function}
 */
const verifyingUser = options => {
  return async function (req, _res, next) {
    const { accessToken } = req.cookies;

    req.verify = false;
    req.user = null;

    const { verify, playload } = verifyToken(accessToken, ACCESS_TOKEN_SECRET);
    if (!verify) return next();

    const user = await User.findOne({ email: playload.email });
    if (!user) return next();
    const { email, role } = user;

    req.verify = verify;
    req.user = { email, role };

    next();
  };
};

export default verifyingUser;
