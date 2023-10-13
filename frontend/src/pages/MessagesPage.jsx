import React, { useEffect, useState } from "react";
import "./MessagesPage.scss";
import ConversationCard from "../components/ConversationCard";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentUserId,
  updateSelectedUserId,
} from "../../features/authSlice";

const MessagesPage = () => {
  const [responseDataAllMessages, setReponseDataAllMessages] = useState([]);
  const [responseDataAllUsers, setReponseDataAllUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [chatText, setChatText] = useState("");

  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.auth.currentUserId);
  const selectedUserId = useSelector((state) => state.auth.selectedUserId);

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
      const usernameToMessagesMap = {};

      const currentUserName = responseDataAllUsers.find(
        (user) => user._id === currentUserId
      );

      responseDataAllMessages.forEach((message) => {
        if (message.sendersId === currentUserId) {
          message.msgUserId = message.receiversId;
        } else if (message.receiversId === currentUserId) {
          message.msgUserId = message.sendersId;
        }

        responseDataAllUsers.forEach((user) => {
          if (user._id === message.msgUserId) {
            message.username = user.username;

            if (message.sendersId === message.msgUserId) {
              message.senderName = user.username;
            } else {
              message.senderName = currentUserName.username;
            }
          }
        });

        if (message.username) {
          if (!usernameToMessagesMap[message.username]) {
            usernameToMessagesMap[message.username] = [];
          }
          usernameToMessagesMap[message.username].push(message);
        }
      });

      const sortedConversations = Object.keys(usernameToMessagesMap).map(
        (username) => {
          return {
            username,
            messages: usernameToMessagesMap[username],
          };
        }
      );

      console.log(sortedConversations);
      console.log(responseDataAllMessages);
      setConversations(sortedConversations);
    }
  }, [responseDataAllUsers, responseDataAllMessages, currentUserId]);

  const handleConversationCardClick = (selectedUsername) => {
    const selectedUsersMsgText = [];
    const selectedUsersSenderNameText = [];

    const conversationWithSelectedUser = conversations.find(
      (conversation) => conversation.username === selectedUsername
    );

    if (conversationWithSelectedUser) {
      const messageTextArray = conversationWithSelectedUser.messages.map(
        (message) => message.messageText
      );

      const messageSenderNameArray = conversationWithSelectedUser.messages.map(
        (message) => message.senderName
      );
      selectedUsersSenderNameText.push(...messageSenderNameArray);

      selectedUsersMsgText.push(...messageTextArray);

      setChatText(selectedUsersMsgText.join("\n"));

      const combinedChat = selectedUsersSenderNameText
        .map((sender, index) => {
          const message = selectedUsersMsgText[index];
          return `${sender}:\n${message}`;
        })
        .join("\n");

      setChatText(combinedChat);
    }

    dispatch(updateSelectedUserId(selectedUsername));
    console.log(`selecteduserid ${selectedUsername}`);
  };

  return (
    <div className="messages-page">
      <div className="messages-page__conversations-container">
        {conversations.length > 0 ? (
          conversations.map((conversation, index) => (
            <ConversationCard
              key={index}
              username={
                <div>
                  Conversation with{" "}
                  <h3 className="messages-page__conversation-username">
                    {conversation.username}
                  </h3>
                </div>
              }
              onConversationCardClick={() =>
                handleConversationCardClick(conversation.username)
              }
            />
          ))
        ) : (
          <div>No conversation</div>
        )}
      </div>
      <div className="messages-page__chat-container">
        <div className="messages-page__chat-field">
          {chatText &&
            chatText.split("\n").map((line, index) => (
              <h3
                key={index}
                className={
                  index % 2 === 0
                    ? "messages-page__sender-name"
                    : "messages-page__msg-text"
                }
              >
                {line}
              </h3>
            ))}
        </div>

        <div className="messages-page__inputs-container">
          <input
            className="messages-page__text-input"
            type="text"
            placeholder="write message here..."
          />
          <button className="messages-page__btn-send">Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
