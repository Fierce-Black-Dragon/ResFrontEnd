import "../style/navbar.css";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";

import Dashboard from "./../pages/Dashboard";
import { useEffect, useState } from "react";
import axios from "../app/api/axios";
import { useSelector } from "react-redux";
import Sidenav from "./Sidenav";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  let navigate = useNavigate();
  const handleMEnu = () => {
    setShowMediaIcons(!showMediaIcons);
  };
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const handleLogout = async () => {
    // const { data } = await axios.get("/logout", {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",

    //     authorization: `Bearer ${user?.accessToken}`,
    //   },
    // });

    localStorage.removeItem("profile");
    navigate("/");
    setUser(null);
  };
  useEffect(() => {}, [user]);

  return (
    <nav className="">
      {/* 1st logo part  */}
      <div className="logo">
        <h2>
          <span onClick={() => setShowMediaIcons(false)}>
            <NavLink to="/"> Restaurant</NavLink>
          </span>
        </h2>
      </div>

      {/* 2nd menu part  */}
      {showMediaIcons ? (
        <div className="sidenav links">
          <ul>
            {user && user?.role === "Admin" ? (
              <li onClick={handleMEnu}>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            ) : (
              ""
            )}

            <li onClick={handleMEnu}>
              <NavLink to="/profile"> My Profile</NavLink>
            </li>
            <li onClick={handleMEnu}>
              <NavLink to="/cart">
                Cart <span className="cart-quantity">{cartTotalQuantity}</span>
              </NavLink>
            </li>

            {/* user123@Vk */}
            {user?.name ? (
              <button onClick={handleLogout} style={{ cursor: "pointer" }}>
                {" "}
                Sign out
              </button>
            ) : (
              <>
                <li onClick={handleMEnu}>
                  <NavLink to="/auth">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : (
        ""
      )}

      <div className="other">
        {/* hamburget menu start  */}

        <div className="hamburger-menu">
          {showMediaIcons ? (
            <div className="close">
              <button onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <MdClose />
              </button>
            </div>
          ) : (
            <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
              {showMediaIcons ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
            </li>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
