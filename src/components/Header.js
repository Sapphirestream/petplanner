import React from "react";

const Header = () => {
  return (
    <div className="header">
      <div className="nav-links">
        <p>Home</p>
        <p>Pets</p>
        <p>Profile</p>
        <p>Login</p>
      </div>
      <h1>PetPlanner</h1>
      <div className="search-bar">Search Bar</div>
    </div>
  );
};

export default Header;
