import React from "react";
import jobius from "../assets/jobius.svg";
const Logo = () => {
  return (
    <div className="logo-container">
      <img src={jobius} alt="logo" className="logo" />
    </div>
  );
};

export default Logo;
