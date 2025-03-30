import { verifyToken } from "../utils/jwt.js";

export const authorize = (req, res, next)=> {
  
  const token = req.headers.authorization?.split(" ")[1]; 
  
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    req.userId = verifyToken(token); 
    next(); 
  } catch(error) {
    res.status(401).json({ message: error.message });
  }
}
