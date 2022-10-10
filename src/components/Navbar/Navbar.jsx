import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import { useState } from "react";

const Navbar = (props) => {
  const [isActive, setisActive] = useState(false);

  return (
    <>
      <nav
        class="navbar navbar-start"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a
            class="navbar-item"
            href="https://bulma.io"
            width="112"
            height="28"
            color="black"
          >
            <Link to={PATHS.HOMEPAGE} className="navLink Logo">
              Schluckreflex
            </Link>
          </a>
          <Link
            to={PATHS.RECIPES}
            className="navbar-item navbar-rezepte"
            width="100%"
          >
            Rezepte
          </Link>
        </div>

        <a
          onClick={() => {
            setisActive(!isActive);
          }}
          role="button"
          className={`navbar-burger burger ${
            isActive ? "is-active" : ""
          }  is-full`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>

        <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
          {/* <a className="navbar-link">
      Mehr
    </a> */}

          <div class="navbar-start ">
            <a className="navbar-item dropped">Über uns</a>
            <a className="navbar-item dropped">Impressum</a>
            <hr class="navbar-divider"></hr>
          </div>

          <div className="navbar-item">
            <div className="buttons dropped-buttons">
              {props.user ? (
                <>
                  <Link to={PATHS.POSTRECIPE} className="button is-primary">
                    + Rezept
                  </Link>
                  <button
                    className="button is-light"
                    onClick={props.handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to={PATHS.SIGNUPPAGE} className="button is-primary">
                    Signup
                  </Link>
                  <Link to={PATHS.LOGINPAGE} className="button is-light">
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
