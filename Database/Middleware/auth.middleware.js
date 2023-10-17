import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authmiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded); // Corrected the console.log
    req.user = decoded; // Corrected the assignment
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid user" });
  }
};

export default authmiddleware;
