import React from "react";

const StatComponent = ({ info, amount, icon, status }) => {
  return (
    <article className={`single-stat stats-${status}`}>
      <div className="stat-info">
        <h2>
          <span>{amount}</span> <span className={status}>{icon}</span>
        </h2>
        <p>{info}</p>
      </div>
    </article>
  );
};

export default StatComponent;
