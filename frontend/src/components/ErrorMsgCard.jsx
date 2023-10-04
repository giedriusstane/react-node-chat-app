import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ErrorMsgCard.scss";

const ErrorMsgCard = ({ msgText, onBtnXClick }) => {
  const handleBtnXClick = () => {
    if (onBtnXClick) {
      onBtnXClick();
    }
  };

  return (
    <div className="error-msg-card">
      <h4 className="error-msg-card__error-text">{msgText}</h4>
      <FontAwesomeIcon
        onClick={handleBtnXClick}
        className="error-msg-card__x-close"
        icon={faTimes}
      />
    </div>
  );
};

export default ErrorMsgCard;
