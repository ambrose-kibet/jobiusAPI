import React from "react";
import Logo from "./Logo";
import { links } from "../utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);

  return (
    <aside
      className={
        isSidebarOpen ? "aside-container " : "aside-container hide-big-sidebar"
      }
    >
      <div className="bigsidebar-container">
        <Logo />
        <div className="big-links-container">
          {links.map((item) => {
            const { id, name, link, icon } = item;
            return (
              <Link to={link} key={id} className="big-link">
                <p>
                  <span>{icon}</span>
                  {name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default BigSidebar;
