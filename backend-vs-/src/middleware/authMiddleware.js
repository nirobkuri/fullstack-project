const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

const admin = (req, res) => {
  if (req.user && req.user.role === "admin") {
  } else {
    res.status(403);
    throw new Error("Not authorized as admin");
  }
};

module.exports = { protect, admin };
