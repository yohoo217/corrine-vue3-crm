// middleware/auth.js
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7).trim() : token;
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    
    // 確認 decoded 是否包含 id 和 role
    console.log("Decoded Token:", decoded); // 添加這行以檢查解碼的結果
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
