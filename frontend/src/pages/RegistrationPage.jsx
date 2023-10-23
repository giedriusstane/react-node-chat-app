import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorMsgCard from "../components/ErrorMsgCard";
import "./RegistrationPage.scss";

const RegistrationPage = () => {
  const [errorText, setErrorText] = useState([]);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const inputUsernameRef = useRef();
  const inputPassword_1Ref = useRef();
  const inputPassword_2Ref = useRef();

  const navigate = useNavigate();

  const registerNewUser = async (userData) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      const response = await fetch(
        `http://localhost:3000/registration`,
        options
      );
      const data = await response.json();

      if (data.registration === "ok") {
        navigate("/login");
      } else {
        console.log(data.error);
        setErrorText(data.error);
        setShowErrorCard(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
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

    if (newUserData.password_1 !== newUserData.password_2) {
      newErrorText.push("Password must match.");
      setShowErrorCard(true);
      setErrorText(newErrorText);
    }

    if (newErrorText.length === 0) {
      setShowErrorCard(false);
      registerNewUser(newUserData);
    }
  };

  const onBtnXClickError = () => {
    setShowErrorCard(false);
  };

  return (
    <div className="registration-page">
      <h2 className="registration-page__registration-text">Registration</h2>

      {showErrorCard && (
        <ErrorMsgCard
          onBtnXClickError={onBtnXClickError}
          msgText={errorText.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        />
      )}

      <div className="registration-page__inputs-container">
        <input
          className="registration-page__input"
          type="text"
          placeholder="username"
          ref={inputUsernameRef}
        />

        <input
          className="registration-page__input"
          type="password"
          placeholder="password"
          ref={inputPassword_1Ref}
        />

        <input
          className="registration-page__input"
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
        <div className="registration-page__line"></div>
        <div className="registration-page__question-text">
          Already have an account?{" "}
          <Link className="registration-page__login-link" to={"/login"}>
            Login here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
