import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export { protect };
