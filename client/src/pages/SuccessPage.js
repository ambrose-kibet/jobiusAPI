import React from "react";
import { useSelector } from "react-redux";
import { Logo } from "../components";

const SuccessPage = () => {
  const { info } = useSelector((store) => store.user);

  return (
    <main>
      <section className="section-center">
        <Logo />
        <p className="success-text">{info}</p>
      </section>
    </main>
  );
};

export default SuccessPage;
