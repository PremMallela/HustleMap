import { verifyToken } from "../utils/jwt.js";

export const authorize = (req, res, next)=> {
  
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    req.user = verifyToken(token); 
    next(); 
  } catch(error) {
    res.status(401).json({ message: error.message });
  }
}
