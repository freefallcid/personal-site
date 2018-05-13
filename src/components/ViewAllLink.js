import React, { Component } from "react";
import Link from "gatsby-link";

export default ({ to, name }) => {
  return (
    <div className="view-all-link">
      <Link className="view-all-link__link" to={to}>View all my {name} →</Link>
    </div>
  );
};
