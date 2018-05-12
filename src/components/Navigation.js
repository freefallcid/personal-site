import React from "react";
import Link from "gatsby-link";

export default () => {
  return (
    <nav>
      <div className="start">
        <h1>
          <Link to="/">bhnywl</Link>
        </h1>
      </div>

      <div className="middle">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
        </ul>
      </div>

      <div className="end">
        <Link to="/contact">
          Contact me
        </Link>
      </div>
    </nav>
  );
};
