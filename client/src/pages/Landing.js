import React from "react";
import { Link } from "react-router-dom";

import mainImg from "../assets/main.svg";
import { Logo } from "../components";
const Landing = () => {
  return (
    <main>
      <div className="section-container">
        <nav>
          <Logo />
        </nav>
        <section className="landing-container">
          <article className="landing-text">
            <h1>
              Job <span className="landing-variant">Tracking</span> App
            </h1>
            <p>
              Big mood gatekeep 8-bit raclette gluten-free chartreuse
              succulents. Cray seitan fashion axe enamel pin succulents marfa
              tousled selvage tumblr portland pinterest hashtag. Pabst deep v
              unicorn XOXO, poutine organic kinfolk single-origin coffee before
              they sold out ethical salvia drinking vinegar tote bag.
            </p>
            <Link to="/register" className="login-btn">
              login/ register
            </Link>
          </article>
          <article className="landing-img">
            <img src={mainImg} alt=" job hunt" className="img-landing" />
          </article>
        </section>
      </div>
    </main>
  );
};

export default Landing;
