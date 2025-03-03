const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const secretKey = process.env.SECRETKEY;

const authenticate = (requiredRoles = []) => {
  return (req, res, next) => {
    const accessToken = req.headers["authorization"];
    const refreshToken = req.cookies["refreshToken"];

    if (!accessToken && !refreshToken) {
      logger.warn("Access denied: No token provided.");
      return res.status(401).send("Access Denied. No token provided.");
    }

    try {
      const decoded = jwt.verify(accessToken, secretKey);
      logger.info(`User ${req.user.username} authenticated successfully.`);

      if (requiredRoles.length && !requiredRoles.includes(req.user.role)) {
        logger.warn(
          `User ${req.user.username} (role: ${req.user.role}) tried to access a restricted route.`
        );
        return res.status(403).send("Forbidden. Insufficient permissions.");
      }

      req.user = decoded.user;
      next();
    } catch (error) {
      logger.error(`Access token verification failed: ${error.message}`);

      if (!refreshToken) {
        logger.warn("Access denied: No refresh token provided.");
        return res
          .status(401)
          .send("Access Denied. No refresh token provided.");
      }

      try {
        const decoded = jwt.verify(refreshToken, secretKey);
        const newAccessToken = jwt.sign({ user: decoded.user }, secretKey, {
          expiresIn: "1h",
        });

        res
          .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
          })
          .header("Authorization", newAccessToken);

        logger.info(`Access token refreshed for user ${req.user.username}.`);

        if (requiredRoles.length && !requiredRoles.includes(req.user.role)) {
          logger.warn(
            `User ${req.user.username} (role: ${req.user.role}) tried to access a restricted route.`
          );
          return res.status(403).send("Forbidden. Insufficient permissions.");
        }

        req.user = decoded.user;
        next();
      } catch (error) {
        logger.error(`Refresh token verification failed: ${error.message}`);
        return res.status(400).send("Invalid Token.");
      }
    }
  };
};

module.exports = authenticate;
