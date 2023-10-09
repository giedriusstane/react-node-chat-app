import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./UserMsgModal.scss";

const UserMsgModal = ({ onBtnXClick }) => {
  const handleBtnXClick = () => {
    if (onBtnXClick) {
      onBtnXClick();
    }
  };
  return (
    <div className="user-msg-modal">
      <FontAwesomeIcon
        onClick={handleBtnXClick}
        className="user-msg-modal__x-close"
        icon={faTimes}
      />

      <textarea className="user-msg-modal__textarea"
        name=""
        id=""
        cols="30"
        rows="15"
        placeholder="write message here..."
      ></textarea>

      <button className="user-msg-modal__btn-send">Send</button>
    </div>
  );
};

export default UserMsgModal;
