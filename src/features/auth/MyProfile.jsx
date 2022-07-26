// import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import "../../style/profile.css";

import axios from "../../app/api/axios";
export const MyProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const gwtUser = async () => {
    const { data } = await axios.get("/profile", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        authorization: `Bearer ${user?.accessToken}`,
      },
    });

    if (data) {
      setDetails(data);
    }
  };
  useEffect(() => {
    gwtUser();
  }, []);
  return (
    <main>
      {user?.user ? (
        <>
          <div className="myprofile">
            <div className="myprofile__ba"></div>
            <div className="myprofile__header">
              {/* <Avatar
                alt={user?.user.name}
                src={user?.user.name.charAt(0)}
                style={{
                  width: "86px",
                  height: "86px",
                  fontSize: "34px",
                  background: "#2d6cdf",
                  boxShadow: " 0 6px #364f6b",
                }}
              /> */}
            </div>

            <div className="myprofile___details">
              <div className="myprofile__userName">
                <h4>Name :</h4>
                <p>{details?.name}</p>
              </div>
              <div className="myprofile__userEmail">
                <h4>Email :</h4>
                <p>{details?.email}</p>
              </div>
              <div className="myprofile__userEmail">
                <h4>Mobile Number :</h4>
                <p>{details?.mobile}</p>
              </div>
              <div className="myprofile__userCreated">
                <h4>Created At :</h4>
                <p>{details?.createdAt}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="myprofile">
            <div className="myprofile__ba"></div>
            <div className="myprofile__header">
              {/* <Avatar
                style={{
                  width: "86px",
                  height: "86px",
                  fontSize: "34px",
                  background: "#2d6cdf",
                  boxShadow: " 0 6px #364f6b",
                }}
              /> */}
            </div>

            <div className="myprofile___details">
              <div className="myprofile__userName">
                <h4>Name :</h4>
                <p>Guest</p>
              </div>
              <div className="myprofile__userEmail">
                <h4>Email :</h4>
                <p>Guest Email</p>
              </div>
              <div className="myprofile__userCreated">
                <h4>Created At :</h4>
                <p>none</p>
              </div>
              {/* <div className="myprofile__userMyAdress">
                <h4>All Adress</h4>
                <p>--</p>
              </div> */}
            </div>
          </div>
        </>
      )}{" "}
    </main>
  );
};
