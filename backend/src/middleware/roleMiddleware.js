export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    console.log("user role:", req.user.role);
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};
