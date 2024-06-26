import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareH } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const authContext = useAuth();
  const { isLoggedIn, logout, user } = authContext;
  const logoutUser = () => {
    logout();
  };
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#153448", padding: "10px 20px" }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" style={{ color: "white" }}>
          <FontAwesomeIcon
            icon={faSquareH}
            size="lg"
            style={{ marginRight: "5px" }}
          />{" "}
          Habitiser
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto"></ul>

          {isLoggedIn ? (
            <>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "white" }}
                  >
                    Welcome,{user.name}
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                    style={{ backgroundColor: "#153448" }}
                  >
                    <li className="nav-item">
                      <Link
                        className="dropdown-item text-white"
                        to="/login"
                        onClick={logoutUser}
                      >
                        Log out
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "white" }}
                  >
                    Account
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                    style={{ backgroundColor: "#153448" }}
                  >
                    <li>
                      <Link className="dropdown-item text-white" to={`/login`}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-white"
                        to={`/register`}
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
      <style jsx="true">{`
        .dropdown-item:hover {
          color: #ffec9e !important; /* Change text color on hover */
          background-color: #153448 !important; /* Keep background color */
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
