import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../CSS/navbar.css"
function Navbar() {
  //hooks
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const serachHandler = (e) => {
    e.preventDefault(); 
    navigate(`/search?q=${value}`);
    setValue("")
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>

          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <>
                    <Link className="nav-link">{user.email}</Link>
                  </>
                ) : (
                  <>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </>
                )}
              </li>
              
            </ul>
            <form className="d-flex" onSubmit={serachHandler}>
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button className="btn btn-secondary  my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
