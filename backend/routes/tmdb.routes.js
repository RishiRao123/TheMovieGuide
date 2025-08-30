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
import {
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  getTrendingTodayTv,
  getTvDetails,
  searchTv,
} from "../controllers/tmdbTv.controller.js";

const router = express.Router();

// Movies
router.get("/movies/popular", getPopularMovies);
router.get("/movies/trending", getTrendingMovies);
router.get("/movies/top-rated", getTopRatedMovies);
router.get("/movies/now-playing", getNowPlayingMovies);
router.get("/movies/upcoming", getUpcomingMovies);
router.get("/movies/search", searchMovies);
router.get("/movies/:id/cast", getMovieDetails);

// TV Series
router.get("/tv/airing-today", getAiringTodayTv);
router.get("/tv/on-the-air", getOnTheAirTv);
router.get("/tv/popular", getPopularTv);
router.get("/tv/top-rated", getTopRatedTv);
router.get("/tv/trending", getTrendingTodayTv);
router.get("/tv/search", searchTv);
router.get("/tv/:id/cast", getTvDetails);

export default router;
