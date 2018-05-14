import React from "react";
import Link from "gatsby-link";
import redditIcon from "../assets/icons/reddit.svg";
import githubIcon from "../assets/icons/github.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import menuIcon from "../assets/icons/menu.svg";

export default class Navigation extends React.Component {
  state = { open: false };

  handleOutsideClick = this.handleOutsideClick.bind(this);

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  handleOutsideClick(e) {
    if (this.state.open && !this.dropdown.contains(e.target)) {
      this.setState({ open: false });
    }
  }

  toggleNav(e) {
    e.stopPropagation();
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <nav className="navigation">
        <div className="container">
          <div className="navigation__start">
            <h1 className="navigation__brand">
              <Link to="/">bhnywl</Link>
            </h1>
          </div>

          <div className="navigation__middle">
            <img
              onClick={this.toggleNav.bind(this)}
              src={menuIcon}
              className="navigation__toggle"
            />
            <ul
              className={`navigation__primary ${
                this.state.open ? "navigation__primary--active" : ""
              }`}
              ref={node => {
                this.dropdown = node;
              }}
            >
              <li className="navigation__primaryItem">
                <Link
                  className="navigation__link"
                  exact
                  activeClassName="navigation__link--active"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="navigation__primaryItem">
                <Link
                  className="navigation__link"
                  activeClassName="navigation__link--active"
                  to="/blog"
                >
                  Blog
                </Link>
              </li>
              <li className="navigation__primaryItem">
                <Link
                  exact
                  className="navigation__link"
                  activeClassName="navigation__link--active"
                  to="/projects"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>

          <div className="navigation__end">
            <ul className="navigation__social">
              <li className="navigation__socialItem">
                <a
                  className="navigation__socialIcon navigation__socialIcon--github"
                  href="https://github.com/bhnywl"
                  target="_blank"
                >
                  <img src={githubIcon} />
                </a>
              </li>
              <li className="navigation__socialItem">
                <a
                  className="navigation__socialIcon navigation__socialIcon--twitter"
                  href="https://twitter.com/bhnywl"
                  target="_blank"
                >
                  <img src={twitterIcon} />
                </a>
              </li>
              <li className="navigation__socialItem">
                <a
                  className="navigation__socialIcon navigation__socialIcon--reddit"
                  href="https://www.reddit.com/user/bhnywl"
                  target="_blank"
                >
                  <img src={redditIcon} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
