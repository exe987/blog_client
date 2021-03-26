import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav
      className="navbar is-black is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <span className="title is-3 has-text-white">
            BLOG
            <i className="fab fa-blogger ml-2" />
          </span>
        </Link>

        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            <span className="title is-6 has-text-white">POSTS</span>
          </Link>
          <Link className="navbar-item" to="/create">
            <span className="title is-6 has-text-white">CREATE A POST</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
