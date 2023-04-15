import React from "react";
import classes from "../css/Header.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../store/authContext";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "black" : "",
    };
  };

  //check if Logged in
  let isLoggedIn = false;
  if (authCtx.token) {
    isLoggedIn = true;
  }

  return (
    <div className={classes.header}>
      <div className={classes["nav-links"]}>
        <NavLink to="/" style={styleActiveLink}>
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/pets" style={styleActiveLink}>
            Pets
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink to="/profile" style={styleActiveLink}>
            Profile
          </NavLink>
        )}
        {isLoggedIn && (
          <NavLink to="/" onClick={authCtx.logout}>
            Logout
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink to="/login" style={styleActiveLink}>
            Login
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink to="/register" style={styleActiveLink}>
            Sign Up
          </NavLink>
        )}
      </div>
      <h1>PetPlanner</h1>
      <input className={classes["search-bar"]} placeholder="Search" />
    </div>
  );
};

export default Header;
