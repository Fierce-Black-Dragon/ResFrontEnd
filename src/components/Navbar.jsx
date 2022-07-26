import "../style/navbar.css";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";

import Dashboard from "./../pages/Dashboard";
import { useEffect, useState } from "react";
import axios from "../app/api/axios";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  let navigate = useNavigate();
  const handleMEnu = () => {
    setShowMediaIcons(!showMediaIcons);
  };
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const handleLogout = async () => {
    console.log(user);
    const { data } = await axios.get("/logout", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${user?.accessToken}`,
      },
    });
    if (data) {
      localStorage.removeItem("profile");
      navigate("/");
      setUser(null);
    }
  };
  useEffect(() => {}, [user]);

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>
            <span onClick={() => setShowMediaIcons(false)}>
              <NavLink to="/"> Restaurant</NavLink>
            </span>
          </h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            {user && user?.accessToken ? (
              <>
                {user.role === "Admin" ? (
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
                    {setShowMediaIcons ? (
                      "My Cart"
                    ) : (
                      <div className="nav-bag">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          fill="currentColor"
                          className="bi bi-handbag-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
                        </svg>
                        <span className="bag-quantity">
                          <span>{cartTotalQuantity}</span>
                        </span>
                      </div>
                    )}
                  </NavLink>
                </li>
                <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                  {" "}
                  Sign out
                </li>
              </>
            ) : (
              <>
                <li onClick={handleMEnu}>
                  <NavLink to="/auth">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="other">
          {/* hamburget menu start  */}

          <div className="hamburger-menu">
            <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
              {showMediaIcons ? <GiHamburgerMenu /> : <GiHamburgerMenu />}
            </li>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      {/* <section className="hero-section">
        <p>Welcome to </p>
        <h1>Thapa Technical</h1>
      </section> */}
    </>
  );
};

export default Navbar;
