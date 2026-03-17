function checkAdmin(req, res, next) {

  /* Ensure user exists */
  if (!req.user) {
    return res.status(401).json({
      message: "User not authenticated"
    });
  }

  /* Role validation */
  if (req.user.role !== "admin") {

    console.warn(`[Gateway] Unauthorized admin access attempt by user ${req.user.id}`);

    return res.status(403).json({
      message: "Admin access required"
    });

  }

  next();
}

module.exports = checkAdmin;