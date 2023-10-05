import React, { useRef, useState } from "react";
import ErrorMsgCard from "../components/ErrorMsgCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./LoginPage.scss";

const LoginPage = () => {
  const [errorText, setErrorText] = useState([]);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();

  const loginUser = async (userData) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      const response = await fetch(`http://localhost:3000/login`, options);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
      } else {
        const errorArray = Array.isArray(data.error)
          ? data.error
          : [data.error];

        console.log(errorArray);
        setShowErrorCard(true);
        setErrorText(errorArray);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLoginBtn = () => {
    const userData = {
      username: inputUsernameRef.current.value,
      password: inputPasswordRef.current.value,
    };

    loginUser(userData);
  };

  const onBtnXClick = () => {
    setShowErrorCard(false);
  };

  return (
    <div className="login-page">
      {showErrorCard && (
        <ErrorMsgCard
          onBtnXClick={onBtnXClick}
          msgText={errorText.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        />
      )}

      <div className="login-page__inputs-container">
        <input type="text" placeholder="username" ref={inputUsernameRef} />
        <input type="password" placeholder="password" ref={inputPasswordRef} />

        <button onClick={handleLoginBtn} className="login-page__btn-login">
          Login
        </button>

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
