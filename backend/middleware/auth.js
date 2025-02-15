const jwt from 'jsonwebtoken';

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.header('Authorization'); // Get the token from the request headers

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET); // Verify token

    if (!decoded || decoded.role !== 'admin') { // Ensure user is an admin
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = verifyAdmin;
