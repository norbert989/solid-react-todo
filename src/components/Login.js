import React from "react";
import loginToInruptDotCom from "../utils/login";
import SolidEmblem from "../images/solid-emblem.svg";

function Login({ isLoggedIn }) {
  return (
    <section id="login">
      <button
        name="btnLogin"
        className="btn"
        id="btnLogin"
        onClick={() => loginToInruptDotCom()}
      >
        <span className="pr-1">
          <img
            width="33.2"
            height="30.2"
            src={SolidEmblem}
            alt="Solid Emblem"
          />
        </span>
        <span className="text">Connect Pod</span>
      </button>
      {isLoggedIn && <p id="labelStatus">Your session is Logged In</p>}
    </section>
  );
}

export default Login;
