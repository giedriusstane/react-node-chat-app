import React, { useEffect, useRef, useState } from "react";
import "./SinglePostModal.scss";
import UserCard from "../components/UserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

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

  const singlePostVisibility = useSelector(
    (state) => state.users.singlePostVisibility
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

  const handleBtnLike = () => {
    if (onBtnLikeClick) {
      onBtnLikeClick();
    }
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
      if (response.ok) {
        console.log(jsonData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBtnComment = () => {
    const postData = {
      postId: selectedPost._id,
      commentText: inputCommentRef.current.value,
      comment: true,
    };

    updatePost(postData);
  };

  const handleBtnXClick = () => {
    if (onModalBtnXClick) {
      onModalBtnXClick();
    }
  };

  return (
    <div className={singlePostVisibility ? "modal-overlay" : ""}>
      <div className="single-post-modal">
        <FontAwesomeIcon
          onClick={handleBtnXClick}
          className="single-post-modal__x-close"
          icon={faTimes}
        />
        <div className="single-post-modal__top-container">
          <img
            className="post-card__post-img"
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
            <h3 className="single-post-modal__post-title">{title}</h3>
            <div className="single-post-modal__likes-container">
              <button
                onClick={handleBtnLike}
                className="single-post-modal__btn-like"
              >
                Like
              </button>
              <h4>Likes: {likes}</h4>
            </div>
          </div>
        </div>

        <div className="single-post-modal__comments-container">
          <div className="single-post-modal__comments-field">{allComments}</div>
          <div className="single-post-modal__comments-inputs-container">
            <input
              className="single-post-modal__input-comments"
              type="text"
              placeholder="write comment here..."
              ref={inputCommentRef}
            />
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
