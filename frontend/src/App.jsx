import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";
import Moviedetails from "./pages/Moviedetails";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/Moviedetails";
import TvDetails from "./pages/TvDetails";
import { MediaProvider } from "./context/MediaContext";
import Search from "./pages/Search";
import Favourites from "./pages/Favourites";
import TvShows from "./pages/TvShows";

function App() {
  return (
    <>
      <MediaProvider>
        <ToastContainer />
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Signup></Signup>}></Route>
          <Route path='/movies' element={<Movies></Movies>}></Route>
          <Route path='/tvshows' element={<TvShows></TvShows>}></Route>
          <Route path='/search' element={<Search></Search>}></Route>
          <Route
            path='/movie-details'
            element={<Moviedetails></Moviedetails>}
          ></Route>
          <Route path='/watchlist' element={<Watchlist></Watchlist>}></Route>
          <Route path='/favorites' element={<Favourites></Favourites>}></Route>
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/tv/:id' element={<TvDetails />} />
        </Routes>
        <Footer></Footer>
      </MediaProvider>
    </>
  );
}

export default App;
