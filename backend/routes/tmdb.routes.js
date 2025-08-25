import express from "express";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
} from "../controllers/tmdb.controller.js";

const router = express.Router();

router.get("/movies/now-playing", getNowPlayingMovies);
router.get("/movies/trending", getTrendingMovies);
router.get("/movies/popular", getPopularMovies);
router.get("/movies/top-rated", getTopRatedMovies);
router.get("/movies/upcoming", getUpcomingMovies);

export default router;
