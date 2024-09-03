import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa"; // Importing FaUserCircle icon
import config from "../config";
import logo from "../images/logo.png"


function BarNav() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("loggedIn");
    setLoggedIn(loginStatus === "true");

    if (loginStatus === "true") {
      const id = sessionStorage.getItem("customerid");
      setCustomerId(id);
    }
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${config.url}/products/search/${searchQuery}`);

      navigate("/search-results", { state: { products: response.data } });
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="container-fluid p-0 fixed-top">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="nav-link" aria-current="page" to="/Home">
          <img src={logo} alt="Logo" style={{ width: " 90px" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav mx-auto">
              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {loggedIn ? (
                <>
                  <li className="nav-item me-3">
                    <Link to="/profile">
                      <FaUserCircle size={30} /> {/* Increase icon size */}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/Wishlist">
                      Wishlist
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/Cart">
                      Cart
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/About">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/Contact"
                    >
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default BarNav;
