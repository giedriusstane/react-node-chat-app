import "./CreatePostModal.scss";
import ErrorMsgCard from "../components/ErrorMsgCard";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUserId } from "../../features/authSlice";

const CreatePostModal = ({ onBtnXClick, onBtnCreatePost }) => {
  const [errorText, setErrorText] = useState([]);
  const [showErrorCard, setShowErrorCard] = useState(false);
  const [userData, setUserData] = useState();

  const inputTitleRef = useRef();
  const inputPostImgRef = useRef();

  const currentUserId = useSelector((state) => state.auth.currentUserId);

  const dispatch = useDispatch();

  const handleBtnXClick = () => {
    if (onBtnXClick) {
      onBtnXClick();
    }
  };

  const getUserData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(`http://localhost:3000/profile`, options);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
        dispatch(updateCurrentUserId(data.userData._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const createPost = async (postData) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postData),
      };

      const response = await fetch(`http://localhost:3000/posts`, options);
      const jsonData = await response.json();
      if (response.ok) {
        console.log(jsonData);
        // dispatch(updateMsgModalVisibility(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePostBtn = () => {
    if (onBtnCreatePost) {
      if (userData) {
        const postData = {
          postTitle: inputTitleRef.current.value,
          postImage: inputPostImgRef.current.value,
          sendersId: currentUserId,
        };

        const newErrorText = [];

        if (postData.postTitle.length < 3) {
          newErrorText.push("Post title is too short.");
          setShowErrorCard(true);
          setErrorText(newErrorText);
        }

        if (postData.postTitle.length > 30) {
          newErrorText.push("Post title is too long.");
          setShowErrorCard(true);
          setErrorText(newErrorText);
        }

        if (!postData.postImage.startsWith("http")) {
          newErrorText.push("Bad img url.");
          setShowErrorCard(true);
          setErrorText(newErrorText);
        }

        if (newErrorText.length === 0) {
          setShowErrorCard(false);
          createPost(postData);
          onBtnCreatePost();
        }
      }
    }
  };

  const onBtnXClickError = () => {
    setShowErrorCard(false);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="create-post-modal">
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
            className="create-post-modal__x-close"
            icon={faTimes}
          />

          <input
            className="create-post-modal__input"
            type="text"
            placeholder="post title"
            ref={inputTitleRef}
          />
          <input
            className="create-post-modal__input"
            type="text"
            placeholder="post image url"
            ref={inputPostImgRef}
          />

          <button
            onClick={handleCreatePostBtn}
            className="create-post-modal__btn-add-post"
          >
            Add Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePostModal;
