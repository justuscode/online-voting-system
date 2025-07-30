import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'mysecretkey';

// ✅ Middleware to verify JWT token and attach user to request
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // decoded will contain { id, role, iat, exp }
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// ✅ Middleware to restrict access to admin only
export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access denied' });
  }
  next();
};
