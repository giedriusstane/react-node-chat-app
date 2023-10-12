import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ChangePicPassModal.scss";

const ChangePicPassModal = ({
  placeholder,
  onBtnXClick,
  inputType,
  onBtnUpdatePic,
}) => {
  const inputRef = useRef();
  const inputRefPass = useRef();

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
      if (response.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBtnUpdate = () => {
    if (onBtnUpdatePic) {
      onBtnUpdatePic();

      if (placeholder === "picture url") {
        const dataToUpdate = {
          updatedPictureUrl: inputRef.current.value,
        };
        updateUser(dataToUpdate);
        console.log("picas");
      } else {
        const dataToUpdate = {
          updatedPassword: inputRefPass.current.value,
        };
        updateUser(dataToUpdate);
        console.log("paswordas");
      }
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
        ref={placeholder === "picture url" ? inputRef : inputRefPass}
      />
      <button
        onClick={handleBtnUpdate}
        className="change-pic-pass-modal__btn-change"
      >
        Change
      </button>
    </div>
  );
};

export default ChangePicPassModal;
