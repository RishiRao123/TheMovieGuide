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
import { MediaProvider } from "./context/MediaContext";

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
          <Route
            path='/movie-details'
            element={<Moviedetails></Moviedetails>}
          ></Route>
          <Route path='/watchlist' element={<Watchlist></Watchlist>}></Route>
        </Routes>
        <Footer></Footer>
      </MediaProvider>
    </>
  );
}

export default App;
