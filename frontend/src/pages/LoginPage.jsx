import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorMsgCard from "../components/ErrorMsgCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { autologin } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./LoginPage.scss";

const LoginPage = () => {
  const [errorText, setErrorText] = useState();
  const [showErrorCard, setShowErrorCard] = useState(false);
  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();

  const autologinIs = useSelector((state) => state.auth.isAutologin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        navigate("/profile");
      } else {
        setShowErrorCard(true);
        setErrorText(data.error);
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

  const onBtnXClickError = () => {
    setShowErrorCard(false);
  };

  const handleCheckBoxAutologin = () => {
    dispatch(autologin(!autologinIs));
  };

  useEffect(() => {
    console.log("autologinIs:", autologinIs);
  }, [autologinIs]);

  return (
    <div className="login-page">
      <h2 className="login-page__login-text">Login</h2>
      {showErrorCard && (
        <ErrorMsgCard onBtnXClickError={onBtnXClickError} msgText={errorText} />
      )}

      <div className="login-page__inputs-container">
        <input
          className="login-page__input"
          type="text"
          placeholder="username"
          ref={inputUsernameRef}
        />
        <input
          className="login-page__input"
          type="password"
          placeholder="password"
          ref={inputPasswordRef}
        />

        <button onClick={handleLoginBtn} className="login-page__btn-login">
          Login
        </button>

        <div className="login-page__autologin-container">
          <div
            onClick={handleCheckBoxAutologin}
            className="login-page__checkbox"
          >
            {autologinIs && (
              <FontAwesomeIcon className="login-page__icon" icon={faCheck} />
            )}
          </div>

          <h4 className="login-page__autoligin-text">Stay signed in</h4>
        </div>
        <div className="login-page__line"></div>
        <div className="login-page__question-text">
          Don't have an account?{" "}
          <Link className="login-page__register-link" to={"/"}>
            Create here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
