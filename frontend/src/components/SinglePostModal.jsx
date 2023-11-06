import React, { useEffect, useRef, useState } from "react";
import "./SinglePostModal.scss";
import UserCard from "../components/UserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import ErrorMsgCard from "./ErrorMsgCard";

const SinglePostModal = ({
  img,
  title,
  likes,
  userPic,
  creatorName,
  idUser,
  currentUserId,
  onBtnLikeClick,
  selectedPost,
  allComments,
  onModalBtnXClick,
}) => {
  const inputCommentRef = useRef();
  const [errorText, setErrorText] = useState([]);
  const [showErrorCard, setShowErrorCard] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);

  const [comments, setComments] = useState(allComments);

  const singlePostVisibility = useSelector(
    (state) => state.users.singlePostVisibility
  );

  const selectedPostSendersId = useSelector(
    (state) => state.users.selectedPostSendersId
  );

  const sendersIdMadeLike = useSelector(
    (state) => state.users.sendersIdMadeLike
  );

  const defaultImage = "https://pbs.twimg.com/media/FLrT7QiVQAIivpt.jpg:large";
  const [imageSrc, setImageSrc] = useState(defaultImage);

  useEffect(() => {
    const checkImage = new Image();
    checkImage.src = img;

    checkImage.onload = () => {
      setImageSrc(img);
    };

    checkImage.onerror = () => {
      setImageSrc(defaultImage);
    };
  }, [img, defaultImage]);

  const handleBtnLike = async () => {
    setIsLiked(true);
    setLikesCount(likesCount + 1);

    const postData = {
      postId: selectedPost._id,
      likeUpdate: true,
    };

    updatePost(postData);
  };

  const updatePost = async (postData) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postData),
      };

      const response = await fetch(
        `http://localhost:3000/postsUpdate`,
        options
      );
      const jsonData = await response.json();
    } catch (error) {
      alert(error);
    }
  };

  const handleBtnComment = () => {
    const postData = {
      postId: selectedPost._id,
      commentText: inputCommentRef.current.value,
      comment: true,
    };

    const newErrorText = [];

    if (postData.commentText.length < 3) {
      newErrorText.push("Comment is too short.");
      setShowErrorCard(true);
      setErrorText(newErrorText);
    }

    if (postData.commentText.length > 300) {
      newErrorText.push("Comment is too long.");
      setShowErrorCard(true);
      setErrorText(newErrorText);
    }

    if (newErrorText.length === 0) {
      setShowErrorCard(false);
      updatePost(postData);
      inputCommentRef.current.value = "";

      setComments((prevComments) => [
        ...prevComments,
        [postData.commentText, currentUserId],
      ]);
    }
  };

  const handleBtnXClick = () => {
    if (onModalBtnXClick) {
      onModalBtnXClick();
    }
  };

  const onBtnXClickError = () => {
    setShowErrorCard(false);
  };

  return (
    <div
      className={
        singlePostVisibility ? "modal-overlay" : "single-post-modal__overlay"
      }
    >
      <div
        className={
          singlePostVisibility
            ? "single-post-modal"
            : "single-post-modal__invisible"
        }
      >
        <FontAwesomeIcon
          onClick={handleBtnXClick}
          className="single-post-modal__x-close"
          icon={faTimes}
        />

        <h3 className="single-post-modal__post-title">{title}</h3>
        <div className="single-post-modal__line"></div>

        <div
          className={
            singlePostVisibility
              ? "single-post-modal__top-container"
              : "single-post-modal__top-container-invisible"
          }
        >
          <img
            className="single-post-modal__post-img"
            src={imageSrc}
            alt="post image"
          />

          <div className="single-post-modal__right-container">
            <UserCard
              userImg={userPic}
              username={creatorName}
              userId={idUser}
              currentUserId={currentUserId}
            />
            <div className="single-post-modal__likes-container">
              {selectedPostSendersId !== currentUserId &&
              !sendersIdMadeLike.includes(currentUserId) &&
              !isLiked ? (
                <button
                  onClick={handleBtnLike}
                  className="single-post-modal__btn-like"
                >
                  Like
                </button>
              ) : (
                <button className="single-post-modal__btn-like-disable">
                  Like
                </button>
              )}

              <h4 className="single-post-modal__likes">
                Likes{" "}
                <span className="single-post-modal__num-likes">
                  {likesCount}
                </span>{" "}
              </h4>
            </div>
          </div>
        </div>

        <div
          className={
            singlePostVisibility
              ? "single-post-modal__comments-container"
              : "single-post-modal__comments-container-invisible"
          }
        >
          {comments && (
            <div className="single-post-modal__comments-field">
              {allComments}
            </div>
          )}

          {showErrorCard && (
            <ErrorMsgCard
              onBtnXClickError={onBtnXClickError}
              msgText={errorText.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            />
          )}
          <div className="single-post-modal__comments-inputs-container">
            <textarea
              className="single-post-modal__input-comments"
              type="text"
              placeholder="write comment here..."
              ref={inputCommentRef}
              cols="30"
              rows="10"
            ></textarea>

            <button
              onClick={handleBtnComment}
              className="single-post-modal__btn-comment"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostModal;
