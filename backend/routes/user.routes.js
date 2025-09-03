import express from "express";
import authUser from "../middlewares/authUser.middleware.js";
import upload from "../middlewares/upload.middleware.js";
import {
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import {
  getUserFavourites,
  deleteFavourite,
  addFavourite,
} from "../controllers/favourites.controller.js";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
  toggleWatched,
} from "../controllers/watchlist.controller.js";

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
router.get("/user/favorites", authUser, getUserFavourites);
router.post("/user/favorites", authUser, addFavourite);
router.delete("/user/favorites/:mediaId", authUser, deleteFavourite);

// user watchlist routes
router.post("/user/watchlist/:userId", authUser, addToWatchlist);
router.get("/user/watchlist/:userId", authUser, getWatchlist);
router.delete(
  "/user/watchlist/:userId/:movieId",
  authUser,
  removeFromWatchlist
);
router.patch("/user/watchlist/:userId/:movieId", authUser, toggleWatched);

export default router;
