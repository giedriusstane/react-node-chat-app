import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./UserMsgModal.scss";
import ErrorMsgCard from "./ErrorMsgCard";
import { updateMsgModalVisibility } from "../../features/usersSlice";

const UserMsgModal = ({ onBtnXClick }) => {
  const [errorText, setErrorText] = useState([]);
  const [showErrorCard, setShowErrorCard] = useState(false);

  const textareaRef = useRef();

  const currentUserId = useSelector((state) => state.auth.currentUserId);
  const selectedUserId = useSelector((state) => state.auth.selectedUserId);
  const modalVisibility = useSelector(
    (state) => state.users.msgModalVisibility
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`currentUserID: ${currentUserId}`);
    console.log(`selectedUserID: ${selectedUserId}`);
  }, []);

  const handleBtnXClick = () => {
    if (onBtnXClick) {
      onBtnXClick();
    }
  };

  const sendMessage = async (messageData) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(messageData),
      };

      const response = await fetch(`http://localhost:3000/messages`, options);
      const jsonData = await response.json();
      if (response.ok) {
        console.log(jsonData);
        dispatch(updateMsgModalVisibility(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendBtn = () => {
    const messageData = {
      msgText: textareaRef.current.value,
      sendersId: currentUserId,
      receiversId: selectedUserId,
    };

    const newErrorText = [];

    if (messageData.msgText.length < 3) {
      newErrorText.push("Message is too short.");
      setShowErrorCard(true);
      setErrorText(newErrorText);
    }

    if (messageData.msgText.length > 1000) {
      newErrorText.push("Message is too long.");
      setShowErrorCard(true);
      setErrorText(newErrorText);
    }

    if (newErrorText.length === 0) {
      setShowErrorCard(false);
      sendMessage(messageData);
    }
  };

  const onBtnXClickError = () => {
    setShowErrorCard(false);
  };

  return (
    <>
      {modalVisibility && (
        <div className="user-msg-modal">
          {showErrorCard && (
            <ErrorMsgCard
              onBtnXClickError={onBtnXClickError}
              msgText={errorText.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            />
          )}

          <FontAwesomeIcon
            onClick={handleBtnXClick}
            className="user-msg-modal__x-close"
            icon={faTimes}
          />

          <textarea
            className="user-msg-modal__textarea"
            cols="30"
            rows="15"
            placeholder="write message here..."
            ref={textareaRef}
          ></textarea>

          <button onClick={handleSendBtn} className="user-msg-modal__btn-send">
            Send
          </button>
        </div>
      )}
    </>
  );
};

export default UserMsgModal;
