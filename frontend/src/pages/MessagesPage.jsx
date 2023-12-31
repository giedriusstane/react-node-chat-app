import React, { useEffect, useRef, useState } from "react";
import "./MessagesPage.scss";
import ConversationCard from "../components/ConversationCard";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentUserId,
  updateSelectedUserId,
} from "../../features/authSlice";
import ErrorMsgCard from "../components/ErrorMsgCard";

const MessagesPage = () => {
  const [responseDataAllMessages, setReponseDataAllMessages] = useState([]);
  const [responseDataAllUsers, setReponseDataAllUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [chatText, setChatText] = useState("");
  const [errorText, setErrorText] = useState([]);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [noConversationText, setNoconversationText] =
    useState("No conversation");

  const inputMsgSendRef = useRef();

  const dispatch = useDispatch();

  const currentUserId = useSelector((state) => state.auth.currentUserId);
  const selectedUserId = useSelector((state) => state.auth.selectedUserId);

  useEffect(() => {
    dispatch(updateSelectedUserId(""));
  }, []);

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
      setNoconversationText(`Error: ${error}`);
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
      setNoconversationText(`Error: ${error}`);
    }
  };

  useEffect(() => {
    getAllMessages();
    getAllUsers();
  }, []);

  useEffect(() => {
    if (responseDataAllMessages.length > 0 && responseDataAllUsers.length > 0) {
      const conversationsMap = new Map();

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
            message.pictureUrl = user.pictureUrl;

            if (message.sendersId === message.msgUserId) {
              message.senderName = user.username;
            } else {
              message.senderName = currentUserName.username;
            }
          }
        });

        if (message.username) {
          if (!conversationsMap.has(message.username)) {
            conversationsMap.set(message.username, {
              username: message.username,
              pictureUrl: message.pictureUrl,
              messages: [],
            });
          }
          conversationsMap.get(message.username).messages.push(message);
        }
      });

      const sortedConversations = Array.from(conversationsMap.values());
      setConversations(sortedConversations);
    }
  }, [responseDataAllUsers, responseDataAllMessages, currentUserId]);

  const handleConversationCardClick = (selectedUsername) => {
    const selectedUsersMsgText = [];
    const selectedUsersSenderNameText = [];

    const selectedUser = responseDataAllUsers.find(
      (user) => user.username === selectedUsername
    );

    if (selectedUser) {
      const userId = selectedUser._id;

      dispatch(updateSelectedUserId(userId));
    }

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
      getAllMessages();
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
    } catch (error) {
      setErrorText(error);
      setErrorText(true);
    }
  };

  const handleSendBtn = () => {
    const messageData = {
      msgText: inputMsgSendRef.current.value,
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
      inputMsgSendRef.current.value = "";

      const senderName = responseDataAllUsers.find(
        (user) => user._id === messageData.sendersId
      );
      setChatText((prevChatText) => {
        if (prevChatText) {
          return `${prevChatText}\n${senderName.username}:\n${messageData.msgText}`;
        } else {
          return `${senderName.username}:\n${messageData.msgText}`;
        }
      });
    }
  };

  useEffect(() => {
    getAllMessages();
  }, [responseDataAllMessages]);

  const onBtnXClickError = () => {
    setShowErrorCard(false);
  };

  return (
    <div className="messages-page">
      <div className="messages-page__conversations-container">
        {conversations.length > 0 ? (
          conversations.map((conversation, index) => (
            <ConversationCard
              key={index}
              userImg={conversation.pictureUrl}
              username={
                <div className="messages-page__with">
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
          <div className="messages-page__no-conversation-selected">
            {noConversationText}
          </div>
        )}
      </div>
      <div className="messages-page__chat-container">
        <div className="messages-page__chat-field">
          {chatText ? (
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
            ))
          ) : (
            <p className="messages-page__no-conversation-selected">
              No conversation selected
            </p>
          )}
        </div>

        {showErrorCard && (
          <ErrorMsgCard
            onBtnXClickError={onBtnXClickError}
            msgText={errorText.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          />
        )}

        {selectedUserId !== "" && (
          <div className="messages-page__inputs-container">
            <textarea
              className="messages-page__text-input"
              type="text"
              placeholder="write message here..."
              ref={inputMsgSendRef}
              cols="30"
              rows="10"
            ></textarea>
            <button onClick={handleSendBtn} className="messages-page__btn-send">
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
