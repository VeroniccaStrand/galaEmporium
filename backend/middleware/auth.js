import jwt  from "jsonwebtoken"
import User from '../models/userModel.js'



export const protect = async (req, res, next) => {
  let token;

 
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      
      return next();
    }
  } catch (error) {
    console.error(error);
  }

  
  res.status(401).json({ message: 'Not authorized' });
};

