import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  const onSignout = () => {
    sessionStorage.removeItem("token");
    onRouteChange("signout");
  };
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={() => onSignout("signout")}>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={() => onRouteChange("login")}>Sign In </p>
        <p onClick={() => onRouteChange("register")}>SignUp</p>
      </nav>
    );
  }
};

export default Navigation;
