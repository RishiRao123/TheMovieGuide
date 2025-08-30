import express from "express";
import {
  getMovieDetails,
  getTrendingMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
} from "../controllers/tmdbMovie.controller.js";

const router = express.Router();

// Movies
router.get("/movies/popular", getPopularMovies);
router.get("/movies/trending", getTrendingMovies);
router.get("/movies/top-rated", getTopRatedMovies);
router.get("/movies/now-playing", getNowPlayingMovies);
router.get("/movies/upcoming", getUpcomingMovies);
router.get("/movies/search", searchMovies);
router.get("/movies/:id/cast", getMovieDetails);

export default router;
