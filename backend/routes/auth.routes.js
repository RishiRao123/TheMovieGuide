import express from "express";
import { signUp, login } from "../controllers/auth.controller.js";
import {
  signUpValidation,
  loginValidation,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUpValidation, signUp);
router.post("/login", loginValidation, login);

export default router;
