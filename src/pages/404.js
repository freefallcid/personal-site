import React from "react";
import Link from "gatsby-link";

export default ({ data }) => {
  return (
    <div className="container">
      <div className="page-header">
        <h2 className="page-header__heading">
          <strong> Sorry it looks like that page doesn't exist.</strong>
        </h2>
        <p className="page-header__paragraph">
          Go back to the <Link to="/">Homepage</Link>
        </p>
      </div>
    </div>
  );
};
