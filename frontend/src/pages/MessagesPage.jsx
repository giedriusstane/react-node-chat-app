import React, { useEffect, useState } from "react";
import "./MessagesPage.scss";
import ConversationCard from "../components/ConversationCard";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUserId } from "../../features/authSlice";

const MessagesPage = () => {
  const [responseDataAllMessages, setReponseDataAllMessages] = useState([]);
  const [responseDataAllUsers, setReponseDataAllUsers] = useState([]);
  const [conversations, setConversations] = useState([]);

  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.currentUserId);

  const getAllMessages = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(`http://localhost:3000/messages`, options);
      const jsonData = await response.json();
      if (response.ok) {
        setReponseDataAllMessages(jsonData.messages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(`http://localhost:3000/users`, options);
      const jsonData = await response.json();
      if (response.ok) {
        setReponseDataAllUsers(jsonData.usersData);
        dispatch(updateCurrentUserId(jsonData.currentUserId));
        // console.log(responseDataAllUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllMessages();
    getAllUsers();
  }, []);

  useEffect(() => {
    if (responseDataAllMessages.length > 0 && responseDataAllUsers.length > 0) {
      const usersInMessages = [];

      responseDataAllUsers.forEach((user) => {
        const hasMessage = responseDataAllMessages.some(
          (message) =>
            (message.sendersId === user._id ||
              message.receiversId === user._id) &&
            user._id !== currentUserId
        );

        if (hasMessage) {
          usersInMessages.push(user);
        }
      });

      setConversations(usersInMessages);
      console.log(conversations);
    }
  }, [responseDataAllUsers, responseDataAllMessages, currentUserId]);

  return (
    <div className="messages-page">
      <div className="messages-page__conversations-container">
        {conversations.length > 0 &&
          conversations.map((conversation, index) => (
            <ConversationCard key={index} username={conversation.username} />
          ))}
      </div>
      <div className="messages-page__chat-container">
        <div className="messages-page__chat-field"></div>
        <div className="messages-page__inputs-container">
          <input type="text" placeholder="write message here..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
