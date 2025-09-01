import dotenv from "dotenv";
dotenv.config();

export const DB_NAME = "cineflix";
export const TMDB_KEY = process.env.TMDB_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";

export const handleError = (res, error) => {
  console.error(error.response?.data || error.message);
  res.status(500).json({
    message: "Internal server error",
    success: false,
    error: error.message,
  });
};
