import React from "react";
import ErrorMsgCard from "../components/ErrorMsgCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <div className="login-page">
      <ErrorMsgCard msgText={"Incorrect username or password. "} />

      <div className="login-page__inputs-container">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />

        <button className="login-page__btn-login">Login</button>

        <div className="login-page__autologin-container">
          <div className="login-page__checkbox">
            <FontAwesomeIcon icon={faCheck} />
          </div>

          <h4 className="login-page__autoligin-text">Stay signed in</h4>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
