import React, { Component } from "react";
import Link from "gatsby-link";

export default () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__left">
          <h3 className="footer__brand">bhnywl.com</h3>
          <p className="footer__message">
            Thank you for visiting my website. I am Ben Honeywill, a web
            developer from sunny Bournemouth in the UK.
          </p>
          <p className="footer__copyright">Copyright Ben Honeywill 2018</p>
        </div>
        <div className="footer__right">
          <div className="footer__section">
            <h3 className="footer__section-title">My Website</h3>
            <ul className="footer__list">
              <li className="footer__list-item">
                <Link to="/">Home</Link>
              </li>
              <li className="footer__list-item">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="footer__list-item">
                <Link to="/projects">Projects</Link>
              </li>
            </ul>
          </div>
          <div className="footer__section">
            <h3 className="footer__section-title">Social media</h3>
            <ul className="footer__list">
              <li className="footer__list-item">
                <a href="https://github.com/bhnywl" target="_blank">
                  Github
                </a>
              </li>
              <li className="footer__list-item">
                <a href="https://twitter.com/bhnywl" target="_blank">
                  Twitter
                </a>
              </li>
              <li className="footer__list-item">
                <a href="https://reddit.com/user/bhnywl" target="_blank">
                  Reddit
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
