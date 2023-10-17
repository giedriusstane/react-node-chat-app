import React, { useEffect, useState } from "react";
import "./PostCard.scss";

const PostCard = ({ img, title, likes, comments, onPostCardClick }) => {
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
      <h3>{title}</h3>
      <h4>Likes: {likes}</h4>
      <p>Comments: {comments}</p>
    </div>
  );
};

export default PostCard;
