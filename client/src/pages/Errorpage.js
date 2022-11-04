import React from "react";
import { Link } from "react-router-dom";
import notfound from "../assets/notfound.svg";
const Errorpage = () => {
  return (
    <main>
      <section className="section-container">
        <div className="error-img-container">
          <img src={notfound} alt="not found" className="error-img" />
        </div>
        <div className="notfoundinfo">
          <h2>oops! page not found </h2>
          <Link to={"/"} className="login-btn">
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Errorpage;
