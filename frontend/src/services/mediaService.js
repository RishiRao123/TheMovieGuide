import axios from "axios";

const api = axios.create({
  baseURL: "https://themovieguide.onrender.com/api/v1",
  timeout: 10000,
});

// Movies
export const getPopularMovies = () => api.get("/movies/popular");
export const getTopRatedMovies = () => api.get("/movies/top-rated");
export const getTrendingMovies = () => api.get("/movies/trending");
export const getUpcomingMovies = () => api.get("/movies/upcoming");

// TV Shows
export const getTrendingTV = () => api.get("/tv/trending");
export const getNowPlayingTV = () => api.get("/tv/now-playing");
