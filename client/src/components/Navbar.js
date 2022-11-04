import React, { useState } from "react";

import { FaRegUserCircle, FaBars } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, clearStore } from "../features/user/userSlice";
const Navbar = () => {
  const [openLogout, setopenLogout] = useState(false);
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <nav className="user-nav">
      <div className="bars-container">
        <button
          className="btn bars-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaBars />
        </button>
      </div>
      <div className="title-container">
        <div className="big-logo">
          <Logo />
        </div>
        <div>
          <h2>Dashboard</h2>
        </div>
      </div>
      <div className="logout-container">
        <button
          className="btn user-btn "
          onClick={() => setopenLogout(!openLogout)}
        >
          <FaRegUserCircle />
          <span>{user?.name}</span>
          <MdKeyboardArrowDown />
        </button>
        <button
          className={
            openLogout ? "btn logout-btn show-logout" : "btn logout-btn"
          }
          disabled={isLoading}
          onClick={() => dispatch(clearStore())}
        >
          logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
