import React from "react";
import Img from "./Image";
import TechIcon from "./TechIcon";

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
                  <TechIcon tech={tech} />
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
