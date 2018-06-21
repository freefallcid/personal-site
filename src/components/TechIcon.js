import React from "react";

import javascriptIcon from "../assets/icons/tech/javascript.svg";
import reactIcon from "../assets/icons/tech/react.svg";
import rubyOnRailsIcon from "../assets/icons/tech/ruby-on-rails.svg";
import rubyIcon from "../assets/icons/tech/ruby.svg";
import webpackIcon from "../assets/icons/tech/webpack.svg";
import gatsbyIcon from "../assets/icons/tech/gatsby.jpg";
import reduxIcon from "../assets/icons/tech/redux.svg";
import sassIcon from "../assets/icons/tech/sass.png";
import graphqlIcon from "../assets/icons/tech/graphql.png";
import mochaIcon from "../assets/icons/tech/mocha.jpg";
import nodeIcon from "../assets/icons/tech/node.svg";
import expressIcon from "../assets/icons/tech/express.png";

function getTechIcon(tech) {
  switch (tech) {
    case "JavaScript":
      return javascriptIcon;
    case "React":
      return reactIcon;
    case "Ruby on Rails":
      return rubyOnRailsIcon;
    case "Ruby":
      return rubyIcon;
    case "Webpack":
      return webpackIcon;
    case "Gatsby":
      return gatsbyIcon;
    case "Redux":
      return reduxIcon;
    case "Sass":
      return sassIcon;
    case "GraphQL":
      return graphqlIcon;
    case "Mocha":
      return mochaIcon;
    case "Node":
      return nodeIcon;
    case "Express":
      return expressIcon;
    default:
      return undefined;
  }
}

export default ({ tech }) => {
  return <img className="project__techIcon" src={getTechIcon(tech)} />;
};
