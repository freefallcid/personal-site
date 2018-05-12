import "../assets/styles/index.css";
import React from "react";
import Navigation from "../components/Navigation";

export default ({ children }) => {
  return (
    <div>
      <Navigation />
      <main>
        {children()}
      </main>
      <footer>
        My Footer
      </footer>
    </div>
  );
};
