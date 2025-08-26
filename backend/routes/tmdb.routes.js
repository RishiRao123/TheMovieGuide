import express from "express";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  searchMovies,
  getMovieDetails,
} from "../controllers/tmdb.controller.js";

const router = express.Router();

// Movies
router.get("/movies/now-playing", getNowPlayingMovies);
router.get("/movies/trending", getTrendingMovies);
router.get("/movies/popular", getPopularMovies);
router.get("/movies/top-rated", getTopRatedMovies);
router.get("/movies/upcoming", getUpcomingMovies);
router.get("/movies/search", searchMovies);
router.get("/movies/:id/cast", getMovieDetails);

export default router;
