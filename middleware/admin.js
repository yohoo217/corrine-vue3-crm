// middleware/admin.js
const isAdmin = (req, res, next) => {
  // 確認 req.user 中包含 id 和 role，並且 role 為 'admin'
  if (req.user && req.user.role === "admin") {
    next(); // 如果是 admin，用 next() 進入下一個處理函數
  } else {
    // 否則返回 403 錯誤，阻止繼續處理
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = isAdmin;
