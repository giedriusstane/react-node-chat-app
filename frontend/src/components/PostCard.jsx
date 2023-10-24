import React, { useEffect, useState } from "react";
import "./PostCard.scss";

const PostCard = ({
  img,
  title,
  likes,
  comments,
  onPostCardClick,
  createdAt,
}) => {
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

  const handlePostCardClick = () => {
    if (onPostCardClick) {
      onPostCardClick();
    }
  };

  return (
    <div onClick={handlePostCardClick} className="post-card">
      <img className="post-card__post-img" src={imageSrc} alt="post image" />
      <h3 className="post-card__title">{title}</h3>
      <h4 className="post-card__likes">
        Likes <span className="post-card__like-comments-num">{likes}</span>
      </h4>
      <p className="post-card__comments">
        Comments{" "}
        <span className="post-card__like-comments-num">{comments}</span>
      </p>
      <h5 className="post-card__created-at">
        Created At <span className="post-card__date">{createdAt}</span>
      </h5>
    </div>
  );
};

export default PostCard;
