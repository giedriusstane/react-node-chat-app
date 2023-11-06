import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ChangePicPassModal.scss";
import ErrorMsgCard from "../components/ErrorMsgCard";

const ChangePicPassModal = ({
  placeholder,
  onBtnXClick,
  inputType,
  onBtnUpdate,
}) => {
  const [errorText, setErrorText] = useState([]);
  const [showErrorCard, setShowErrorCard] = useState(false);

  const inputRef = useRef();
  const inputRefPass = useRef();
  const inputRefPass_2 = useRef();

  const handleBtnXClick = () => {
    if (onBtnXClick) {
      onBtnXClick();
    }
  };

  const updateUser = async (dataToUpdate) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataToUpdate),
      };
      const response = await fetch(
        `http://localhost:3000/updateProfile`,
        options
      );
      const data = await response.json();
    } catch (error) {
      alert(error);
    }
  };

  const handleBtnUpdate = () => {
    if (onBtnUpdate) {
      if (placeholder === "picture url") {
        const dataToUpdate = {
          updatedPictureUrl: inputRef.current.value,
        };
        const newErrorText = [];

        if (!dataToUpdate.updatedPictureUrl.startsWith("http")) {
          newErrorText.push("Wrong picture url");
          setShowErrorCard(true);
          setErrorText(newErrorText);
        }

        if (newErrorText.length === 0) {
          setShowErrorCard(false);
          updateUser(dataToUpdate);
          onBtnUpdate();
        }
      } else {
        const dataToUpdate = {
          updatedPassword: inputRefPass.current.value,
          updatedPassword_2: inputRefPass_2.current.value,
        };

        const newErrorText = [];

        if (dataToUpdate.updatedPassword.length < 4) {
          newErrorText.push("Password must be at least 4 characters long.");
          setShowErrorCard(true);
          setErrorText(newErrorText);
        }

        if (dataToUpdate.updatedPassword.length > 20) {
          newErrorText.push("Password must be less than 20 characters long.");
          setShowErrorCard(true);
          setErrorText(newErrorText);
        }

        if (/[A-Z]/.test(dataToUpdate.updatedPassword) === false) {
          newErrorText.push("Password must include an uppercase letter.");
          setShowErrorCard(true);
          setErrorText(newErrorText);
        }

        if (dataToUpdate.updatedPassword !== dataToUpdate.updatedPassword_2) {
          newErrorText.push("Password must match.");
          setShowErrorCard(true);
          setErrorText(newErrorText);
        }

        if (newErrorText.length === 0) {
          setShowErrorCard(false);
          updateUser(dataToUpdate);
          alert("password updated");

          onBtnUpdate();
        }
      }
    }
  };

  const onBtnXClickError = () => {
    setShowErrorCard(false);
  };

  return (
    <div className="modal-overlay">
      <div className="change-pic-pass-modal">
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
          className="change-pic-pass-modal__x-close"
          icon={faTimes}
        />

        <input
          className="change-pic-pass-modal__input"
          type={inputType}
          placeholder={placeholder}
          ref={placeholder === "picture url" ? inputRef : inputRefPass}
        />
        {placeholder === "password" && (
          <input
            className="change-pic-pass-modal__input"
            type={inputType}
            placeholder={placeholder}
            ref={inputRefPass_2}
          />
        )}
        <button
          onClick={handleBtnUpdate}
          className="change-pic-pass-modal__btn-change"
        >
          Change
        </button>
      </div>
    </div>
  );
};

export default ChangePicPassModal;
