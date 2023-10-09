import React from "react";
import "./MessagesPage.scss";
import ConversationCard from "../components/ConversationCard";

const MessagesPage = () => {
  return (
    <div className="messages-page">
      <div className="messages-page__conversations-container">
        <ConversationCard />
      </div>
      <div className="messages-page__chat-container"></div>
    </div>
  );
};

export default MessagesPage;
