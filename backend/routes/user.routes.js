import express from "express";
import authUser from "../middlewares/authUser.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/user/profile/:userId", authUser, getUserProfile);
router.put(
  "/user/profile/:userId",
  authUser,
  upload.single("profileImage"),
  updateUserProfile
);
router.delete("/user/profileDelete/:userId", authUser, deleteUserProfile);

export default router;
