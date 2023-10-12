import React from "react";
import "./ConversationCard.scss";

const ConversationCard = ({ userImg, username, onConversationCardClick }) => {
  const handleConversationCardClick = () => {
    if (onConversationCardClick) {
      onConversationCardClick();
    }
  };
  return (
    <div onClick={handleConversationCardClick} className="conversation-card">
      <div>
        <img
          className="conversation-card__user-img"
          src={
            userImg
              ? userImg
              : "https://static.vecteezy.com/system/resources/previews/008/422/689/original/social-media-avatar-profile-icon-isolated-on-square-background-vector.jpg"
          }
          alt="conversation image"
        />
      </div>
      <div>
        <h3>{username}</h3>
      </div>
    </div>
  );
};

export default ConversationCard;
