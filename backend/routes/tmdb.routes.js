import express from "express";
import {
  getMovieDetails,
  getTrendingMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieRecommendations,
  getMovieGenres,
} from "../controllers/tmdbMovie.controller.js";
import {
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
  getTrendingTodayTv,
  getTvDetails,
  getTvGenres,
  getTvRecommendations,
  searchTv,
} from "../controllers/tmdbTv.controller.js";
import { searchMulti } from "../controllers/tmdb.controller.js";

const router = express.Router();

// Movies
router.get("/movies/popular", getPopularMovies);
router.get("/movies/trending", getTrendingMovies);
router.get("/movies/top-rated", getTopRatedMovies);
router.get("/movies/now-playing", getNowPlayingMovies);
router.get("/movies/upcoming", getUpcomingMovies);
router.get("/movies/search", searchMovies);
router.get("/movies/:id", getMovieDetails);
router.get("/movies/recommended/:id", getMovieRecommendations);
router.get("/movies/genres", getMovieGenres);

// TV Series
router.get("/tv/airing-today", getAiringTodayTv);
router.get("/tv/on-the-air", getOnTheAirTv);
router.get("/tv/popular", getPopularTv);
router.get("/tv/top-rated", getTopRatedTv);
router.get("/tv/trending", getTrendingTodayTv);
router.get("/tv/search", searchTv);
router.get("/tv/:id", getTvDetails);
router.get("/tv/recommended/:id", getTvRecommendations);
router.get("/tv/genres", getTvGenres);

// Movie + TV series
router.get("/multi/search", searchMulti);

export default router;
