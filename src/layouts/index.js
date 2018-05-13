import "../assets/styles/index.scss";
import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default ({ children }) => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        {children()}
      </main>
      <Footer />
    </div>
  );
};
