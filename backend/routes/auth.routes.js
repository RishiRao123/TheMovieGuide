import express from "express";
import { signUp, login, getMe } from "../controllers/auth.controller.js";
import {
  signUpValidation,
  loginValidation,
} from "../middlewares/auth.middleware.js";
import authUser from "../middlewares/authUser.middleware.js";

const router = express.Router();

router.post("/signup", signUpValidation, signUp);
router.post("/login", loginValidation, login);
router.get("/me", authUser, getMe);

export default router;
