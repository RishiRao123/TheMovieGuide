import axios from "axios";
import { TMDB_KEY, BASE_URL, handleError } from "../constants/constants.js";

// Popular movies
const getPopularMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });

    res.status(200).json({
      message: "Success getting trending movies",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Trending movies
const getTrendingMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: {
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });
    res.status(200).json({
      message: "Success getting trending movies",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// TopRated movies
const getTopRatedMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });

    res.status(200).json({
      message: "Success getting top rated movies",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Upcoming movies
const getUpcomingMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });

    res.status(200).json({
      message: "Success getting upcoming movies",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Nowplaying movies
const getNowPlayingMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: TMDB_KEY,
        language: "en-US",
      },
    });

    res.status(200).json({
      message: "Success getting now playing movies",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Search movies
const searchMovies = async (req, res) => {
  try {
    const { q, page = 1 } = req.query;
    if (!q || q.trim() === "") {
      return res
        .status(400)
        .json({ message: "Query parameter q is required", success: false });
    }

    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_KEY,
        query: q,
        language: "en-US",
        page,
      },
    });

    res.status(200).json({
      message: "Success searching movies",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Movie Details
const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const [details, credits, providers] = await Promise.all([
      axios.get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: TMDB_KEY,
          language: "en-US",
        },
      }),
      axios.get(`${BASE_URL}/movie/${id}/credits`, {
        params: { api_key: TMDB_KEY, language: "en-US" },
      }),
      axios.get(`${BASE_URL}/movie/${id}/watch/providers`, {
        params: { api_key: TMDB_KEY, language: "en-US" },
      }),
    ]);

    const providerData =
      providers.data.results?.IN?.flatrate ||
      providers.data.results?.US?.flatrate ||
      [];

    const actors = credits.data.cast
      .slice(0, 9)
      .map(({ id, name, character, profile_path }) => ({
        id,
        name,
        character,
        profile_path,
      }));
    const directorData = credits.data.crew.find(
      (person) => person.job === "Director"
    );

    const director = directorData
      ? {
          id: directorData.id,
          name: directorData.name,
          profile_path: directorData.profile_path,
          known_for_department: directorData.known_for_department,
          gender: directorData.gender,
          popularity: directorData.popularity,
        }
      : null;

    res.status(200).json({
      message: "Success getting movie details",
      success: true,
      result: {
        ...details.data,
        credits: actors,
        director,
        streamingProviders: providerData,
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Movie Recommendations
const getMovieRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/recommendations`,
      {
        params: { api_key: TMDB_KEY, language: "en-US" },
      }
    );

    res.status(200).json({
      message: "Success getting movie recommendations",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Movie genres
const getMovieGenres = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: TMDB_KEY, language: "en-US" },
    });

    res.status(200).json({
      message: "Success getting movie genres",
      success: true,
      response: response.data,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  searchMovies,
  getMovieDetails,
  getTrendingMovies,
  getMovieRecommendations,
  getMovieGenres,
};
