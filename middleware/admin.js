// middleware/admin.js
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // 如果是 admin，用 next() 進入下一個處理函數
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = isAdmin;