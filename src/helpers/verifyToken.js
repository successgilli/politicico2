import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
function checkToken(req, res, next) {
  if (typeof req.headers.authorization === 'undefined') {
    res.status(401).json({
      status: 400,
      message: 'unauthorised',
    });
  } else {
    try {
      const decoded = jwt.verify(req.headers.authorization, process.env.jwt_key);
      req.userId = decoded.userId;
      req.isAdmin = decoded.isAdmin;
      next();
    } catch (e) {
      res.status(401).json({
        status: 401,
        message: e.message,
      });
    }
  }
}

export default checkToken;
