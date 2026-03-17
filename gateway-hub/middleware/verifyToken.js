const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

  const authHeader = req.headers.authorization;

  /* Check if header exists */
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing"
    });
  }

  /* Check Bearer format */
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(400).json({
      message: "Invalid token format. Use Bearer token"
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, "secretKey");

    /* Attach user to request */
    req.user = decoded;

    console.log(`[Gateway] Token verified for user ${decoded.id}`);

    next();

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired"
      });
    }

    return res.status(403).json({
      message: "Invalid token"
    });

  }
}

module.exports = verifyToken;