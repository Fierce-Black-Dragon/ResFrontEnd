import React from "react";
import "../style/sidenav.css";
import { NavLink } from "react-router-dom";
import { MyProfile } from "./../features/auth/MyProfile";
import { MdClose } from "react-icons/md";
const Sidenav = ({ setShowMediaIcons, showMediaIcons }) => {
  console.log(setShowMediaIcons);

  return (
    <div className="sidenav">
      <div className="close">
        <button onClick={() => setShowMediaIcons(!showMediaIcons)}>
          <MdClose />
        </button>
      </div>
      <div className="links">
        <ul>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
        </ul>
      </div>
      <div className="links">
        <ul>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
          <li>
            <NavLink to="/auth">Login</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
