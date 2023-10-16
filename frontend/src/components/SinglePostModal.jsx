import React from "react";
import "./SinglePostModal.scss";
import UserCard from "../components/UserCard";

const SinglePostModal = () => {
  return (
    <div className="single-post-modal">
      <div className="single-post-modal__top-container">
        <img
          className="single-post-modal__post-img"
          src="https://pbs.twimg.com/media/FLrT7QiVQAIivpt.jpg:large"
          alt=""
        />

        <div className="single-post-modal__right-container">
          <UserCard />
          <h3 className="single-post-modal__post-title">Post title</h3>
          <div className="single-post-modal__likes-container">
            <button className="single-post-modal__btn-like">Like</button>
            <h4>Likes: </h4>
          </div>
        </div>
      </div>

      <div className="single-post-modal__comments-container">
        <div className="single-post-modal__comments-field"></div>
        <div className="single-post-modal__comments-inputs-container">
          <input
            className="single-post-modal__input-comments"
            type="text"
            placeholder="write comment here..."
          />
          <button className="single-post-modal__btn-comment">Comment</button>
        </div>
      </div>
    </div>
  );
};

export default SinglePostModal;
