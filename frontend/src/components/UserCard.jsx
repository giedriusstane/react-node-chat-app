import React, { useState } from "react";
import "./UserCard.scss";
import UserMsgModal from "./UserMsgModal";

const UserCard = ({ userImg, username, userId, currentUserId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBtnSendMsg = () => {
    setIsModalOpen(true);
  };

  const handleBtnXClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="user-card">
      <div>
        <img
          className="user-card__user-img"
          src={
            userImg
              ? userImg
              : "https://static.vecteezy.com/system/resources/previews/008/422/689/original/social-media-avatar-profile-icon-isolated-on-square-background-vector.jpg"
          }
          alt="user image"
        />
      </div>
      <div>
        <h3>{username}</h3>
        {currentUserId !== userId && (
          <button onClick={handleBtnSendMsg}>Write Message</button>
        )}

        {isModalOpen && <UserMsgModal onBtnXClick={handleBtnXClick} />}
      </div>
    </div>
  );
};

export default UserCard;
