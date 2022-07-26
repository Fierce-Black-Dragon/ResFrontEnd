import React from "react";
import { useState } from "react";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

const Auth = () => {
  const [IsSignUp, setIsSignUp] = useState(false);
  const handleShift = () => {
    setIsSignUp(!IsSignUp);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <div
        style={{
          backgroundColor: "lightgray",
          width: "max-content",
          height: "max-content",
          borderRadius: "15px",
        }}
      >
        {IsSignUp ? (
          <>
            <Register />
          </>
        ) : (
          <>
            <Login />
          </>
        )}
        <div
          onClick={handleShift}
          style={{
            color: "black",

            textDecorationLine: "underline",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            marginBottom: "2%",
            marginLeft: "3%",
          }}
        >
          {" "}
          {IsSignUp ? "Already registered" : "Create new account"}
        </div>
      </div>
    </div>
  );
};

export default Auth;
