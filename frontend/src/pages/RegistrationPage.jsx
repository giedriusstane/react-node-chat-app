import React from "react";
import "./RegistrationPage.scss";

const RegistrationPage = () => {
  return (
    <div className="registration-page">
      <h4 className="registration-page__error-msg">error</h4>

      <div className="registration-page__inputs-container">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <input type="password" placeholder="password" />

        <button>Register</button>
      </div>
    </div>
  );
};

export default RegistrationPage;
