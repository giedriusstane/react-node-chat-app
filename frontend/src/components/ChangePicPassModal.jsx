import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ChangePicPassModal.scss";

const ChangePicPassModal = ({ placeholder, onBtnXClick, inputType }) => {
  const handleBtnXClick = () => {
    if (onBtnXClick) {
      onBtnXClick();
    }
  };
  return (
    <div className="change-pic-pass-modal">
      <FontAwesomeIcon
        onClick={handleBtnXClick}
        className="change-pic-pass-modal__x-close"
        icon={faTimes}
      />
      <input
        className="change-pic-pass-modal__input"
        type={inputType}
        placeholder={placeholder}
      />
      <button className="change-pic-pass-modal__btn-change">Change</button>
    </div>
  );
};

export default ChangePicPassModal;
