import { verifyToken } from "../config/jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    req.user = verifyToken(token);
    console.log("avaliable user: ",req.user)
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
