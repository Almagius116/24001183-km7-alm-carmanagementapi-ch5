const jwt = require("jsonwebtoken");
const { Users } = require("../models");

async function verifyToken(req, res) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).json({
      status: "Failed",
      message: "Token is missing",
      isSuccess: false,
      data: null,
    });
    return;
  }

  try {
    const token = bearerToken.split("Bearer ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findByPk(payload.id);
    return user;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(403).json({
        status: "Failed",
        message: "Token has expired",
        isSuccess: false,
        data: null,
      });
    } else {
      res.status(500).json({
        status: "Failed",
        message: err.message,
        isSuccess: false,
        data: null,
      });
    }
    return null;
  }
}

async function all(req, res, next) {
  const user = await verifyToken(req, res);
  if (user) {
    req.user = user;
    next();
  }
}

async function admin(req, res, next) {
  const user = await verifyToken(req, res);
  if (user) {
    if (user.role === "admin" || user.role === "super admin") {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        status: "Failed",
        message: "You are not authorized",
        isSuccess: false,
        data: null,
      });
    }
  }
}

async function superAdmin(req, res, next) {
  const user = await verifyToken(req, res);
  if (user) {
    if (user.role === "super admin") {
      req.user = user;
      next();
    } else {
      res.status(401).json({
        status: "Failed",
        message: "You are not authorized",
        isSuccess: false,
        data: null,
      });
    }
  }
}

module.exports = {
  all,
  admin,
  superAdmin,
};
