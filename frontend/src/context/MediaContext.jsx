import { createContext, useState, useEffect } from "react";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  getTrendingTV,
  getPopularTV,
} from "../services/mediaService";

export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [movies, setMovies] = useState({
    popular: [],
    topRated: [],
    trending: [],
    upcoming: [],
  });
  const [tvShows, setTvShows] = useState({ trending: [], popular: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMedia = async () => {
      try {
        setLoading(true);
        const [
          popularRes,
          topRatedRes,
          trendingMoviesRes,
          upcomingRes,
          trendingTVRes,
          popularTVRes,
        ] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getTrendingMovies(),
          getUpcomingMovies(),
          getTrendingTV(),
          getPopularTV(),
        ]);

        setMovies({
          popular: popularRes?.data?.response.results || [],
          topRated: topRatedRes?.data?.response?.results || [],
          trending: trendingMoviesRes?.data?.response?.results || [],
          upcoming: upcomingRes?.data?.response?.results || [],
        });

        setTvShows({
          trending: trendingTVRes?.data?.response?.results || [],
          popular: popularTVRes?.data?.response?.results || [],
        });
      } catch (err) {
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMedia();
  }, []);

  return (
    <MediaContext.Provider value={{ movies, tvShows, loading }}>
      {children}
    </MediaContext.Provider>
  );
};
