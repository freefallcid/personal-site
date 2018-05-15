import "../assets/styles/index.scss";
import React from "react";
import Helmet from "react-helmet";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default ({ children, location }) => {
  return (
    <div>
      <Helmet>
        <title>bhnywl</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta
          name="description"
          content="I am Ben Honeywill, a front-end web developer from Bournemouth, UK. This is my website."
        />
        <meta
          property="og:url"
          content={"https://www.bhnywl.com" + location.pathname}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="bhnywl" />
        <meta property="og:image" content="https://bhnywl.com/brand.png" />
        <meta
          property="og:description"
          content="I am Ben Honeywill, a front-end web developer from Bournemouth, UK. This is my website."
        />
      </Helmet>
      <div className="layout">
        <header>
          <Navigation />
        </header>
        <main>{children()}</main>
        <Footer />
      </div>
    </div>
  );
};
