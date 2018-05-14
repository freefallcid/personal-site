import React from "react";
import Link from "gatsby-link";
import Img from "gatsby-image";

import javascriptIcon from "../assets/icons/tech/javascript.svg";
import reactIcon from "../assets/icons/tech/react.svg";
import rubyOnRailsIcon from "../assets/icons/tech/ruby-on-rails.svg";
import rubyIcon from "../assets/icons/tech/ruby.svg";
import webpackIcon from "../assets/icons/tech/webpack.svg";
import gatsbyIcon from "../assets/icons/tech/gatsby.jpg";
import reduxIcon from "../assets/icons/tech/redux.svg";

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
    default:
      return undefined;
  }
}

export default ({ project }) => {
  return (
    <div className="project">
      <a className="project__link" href={project.githubUrl} target="_blank">
        <Img className="project__image" sizes={project.image.sizes} />
        <div>
          <h3 className="project__title">{project.title}</h3>
          <p className="project__description">{project.description}</p>
          <div className="project__tech">
            <p className="project__techText">Built with:</p>
            <ul className="project__techList">
              {project.tech.map(tech => (
                <li key={tech} className="project__techItem">
                  <img className="project__techIcon" src={getTechIcon(tech)} />
                  <div className="project__techTooltip">{tech}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </a>
    </div>
  );
};

export const query = graphql`
  fragment ProjectFragment on MarkdownRemark {
    id
    frontmatter {
      title
      githubUrl
      description
      tech
    }
    image: childImageSharp {
      sizes {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
