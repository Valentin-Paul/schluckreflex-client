import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

const Navbar = (props) => {
  return (
    <nav>
      <Link to={PATHS.HOMEPAGE} className="navLink Logo">
        Schluckreflex
      </Link>

      <div className="nav__authLinks">
        {props.user ? (
          <>
            <Link to={PATHS.PROTECTEDPAGE} className="authLink">
              Protected Page
            </Link>
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
          <Link to="/recipes" className="navLink">
          Recipes
          </Link>
          <Link to="/contact" className="navLink">
            Kontakt
          </Link>
            <Link to={PATHS.SIGNUPPAGE} className="navLink">
              Signup
            </Link>
            <Link to={PATHS.LOGINPAGE} className="navLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
