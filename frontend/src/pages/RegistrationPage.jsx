import React, { useRef, useState } from "react";
import ErrorMsgCard from "../components/ErrorMsgCard";
import "./RegistrationPage.scss";

const RegistrationPage = () => {
  const [errorText, setErrorText] = useState([]);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const inputUsernameRef = useRef();
  const inputPassword_1Ref = useRef();
  const inputPassword_2Ref = useRef();

  const registerNewUser = async (newUserData) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    };
    const response = await fetch(`http://localhost:3000/registration`, options);
    const jsonData = await response.json();
    console.log(jsonData);
  };

  const handleRegisterBtn = () => {
    const newUserData = {
      username: inputUsernameRef.current.value,
      password_1: inputPassword_1Ref.current.value,
      password_2: inputPassword_2Ref.current.value,
    };

    const newErrorText = [];

    if (newUserData.username.length < 4) {
      newErrorText.push("Username must be at least 4 characters long.");
      setShowErrorCard(true);
      setErrorText(newErrorText);
    }

    if (newUserData.username.length > 20) {
      newErrorText.push("Username must be less than 20 characters long.");
      setShowErrorCard(true);
      setErrorText(newErrorText);
    }

    if (newUserData.password_1.length < 4) {
      newErrorText.push("Password must be at least 4 characters long.");
      setShowErrorCard(true);
      setErrorText(newErrorText);
    }

    if (newUserData.password_1.length > 20) {
      newErrorText.push("Password must be less than 20 characters long.");
      setShowErrorCard(true);
      setErrorText(newErrorText);
    }

    if (/[A-Z]/.test(newUserData.password_1) === false) {
      newErrorText.push("Password must include an uppercase letter.");
      setShowErrorCard(true);
      setErrorText(newErrorText);
    }

    if (newErrorText.length === 0) {
      setShowErrorCard(false);
      registerNewUser(newUserData);
    }
  };

  const onBtnXClick = () => {
    setShowErrorCard(false);
  };

  return (
    <div className="registration-page">
      <h2 className="registration-page__registration-text">Registration</h2>

      {showErrorCard && (
        <ErrorMsgCard
          onBtnXClick={onBtnXClick}
          msgText={errorText.map((error) => error)}
        />
      )}

      <div className="registration-page__inputs-container">
        <input type="text" placeholder="username" ref={inputUsernameRef} />

        <input
          type="password"
          placeholder="password"
          ref={inputPassword_1Ref}
        />

        <input
          type="password"
          placeholder="password"
          ref={inputPassword_2Ref}
        />

        <button
          onClick={handleRegisterBtn}
          className="registration-page__btn-register"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegistrationPage;
