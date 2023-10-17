import express from "express";
import {
  forgetpassword,
  getUserbyId,
  getloginUser,
  loginUser,
  registerUser,
  resetPassword,
} from "../Controllers/user.controller.js";
import authmiddleware from "../Database/Middleware/auth.middleware.js";

const router = express.Router();
router.post("/update-password/:id/:token", authmiddleware, resetPassword);
router.post("/forget-password", forgetpassword);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getloginuser", getloginUser);
router.get("/getuser", authmiddleware, getUserbyId);

export default router;
