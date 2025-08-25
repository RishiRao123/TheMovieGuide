import express from "express";
import authUser from "../middlewares/authUser.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { getUserFavourites, deleteFavourite, addFavourite } from "../controllers/favourites.controller.js";

const router = express.Router();

// user profile routes
router.get("/user/profile/:userId", authUser, getUserProfile);
router.put(
  "/user/profile/:userId",
  authUser,
  upload.single("profileImage"),
  updateUserProfile
);
router.delete("/user/profileDelete/:userId", authUser, deleteUserProfile);

// user favourites route
router.get("/user/favourites", authUser, getUserFavourites);
router.post("/user/favourites", authUser, addFavourite);
router.delete("/user/favourites/:movieId", authUser, deleteFavourite);

export default router;
