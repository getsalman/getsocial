import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Fragment>
      <footer className="border-top text-center small text-muted py-3">
        <p>
          <Link to="/" className="mx-1">
            Home
          </Link>{" "}
          |
          <Link className="mx-1" to="/about-us">
            About Us
          </Link>{" "}
          |
          <Link className="mx-1" to="/terms">
            Terms
          </Link>
        </p>
        <p className="m-0">
          Copyright &copy; 2020{" "}
          <a href="/" className="text-muted">
            getsalman
          </a>
          . All rights reserved.
        </p>
      </footer>
    </Fragment>
  );
};

export default Footer;
