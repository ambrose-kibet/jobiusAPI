import React from "react";
import { links } from "../utils";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../features/user/userSlice";

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <aside
      className={
        isSidebarOpen
          ? "small-sidebar-container"
          : "small-sidebar-container  hide-small-sidebar"
      }
    >
      <nav className="small-sidebar">
        <button
          className="close-small-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaTimes />
        </button>

        <div className="small-links">
          <Logo />
          <div className="big-links-container">
            {links.map((item) => {
              const { id, name, link, icon } = item;
              return (
                <Link
                  to={link}
                  key={id}
                  className="big-link"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  <p>
                    <span>{icon}</span>
                    {name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SmallSidebar;
