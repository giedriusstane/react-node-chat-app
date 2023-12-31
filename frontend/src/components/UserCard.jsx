import React, { useState } from "react";
import "./UserCard.scss";
import UserMsgModal from "./UserMsgModal";
import { useDispatch } from "react-redux";
import { updateSelectedUserId } from "../../features/authSlice";
import {
  updateMsgModalVisibility,
  updateSinglePostVisibility,
} from "../../features/usersSlice";

const UserCard = ({ userImg, username, userId, currentUserId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleBtnSendMsg = () => {
    setIsModalOpen(true);
    dispatch(updateSelectedUserId(userId));
    dispatch(updateMsgModalVisibility(true));
    dispatch(updateSinglePostVisibility(false));
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
      <div className="user-card__box">
        <h3 className="user-card__username">{username}</h3>
        {currentUserId !== userId && (
          <button className="user-card__btn" onClick={handleBtnSendMsg}>
            Write Message
          </button>
        )}

        {isModalOpen && <UserMsgModal onBtnXClick={handleBtnXClick} />}
      </div>
    </div>
  );
};

export default UserCard;
