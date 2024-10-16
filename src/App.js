import "./App.css";
import {  Routes, Route } from "react-router-dom";
import Login from "./Screen/Login";
import Home from "./Screen/Home";
import DetailsEvent from "./Screen/DetailsEvent";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from './Components/Navbar'
import Search from "./Screen/Search";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Test from "./Screen/teest";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <>
          <>
            <Navbar />
          </>
          <>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={<Home />} />
              <Route path="/devent/:evetnId" element={<DetailsEvent />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </>
          <div className="mt-3">

          </div>
        </>
      </AuthContextProvider>
    </div>
  );
}

export default App;
