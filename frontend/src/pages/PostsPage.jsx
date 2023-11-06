import { useEffect, useState } from "react";
import "./PostsPage.scss";
import CreatePostModal from "../components/CreatePostModal";
import PostCard from "../components/PostCard";
import SinglePostModal from "../components/SinglePostModal";
import { useDispatch } from "react-redux";
import { updateCurrentUserId } from "../../features/authSlice";
import {
  updateSelectedPostSendersId,
  updateSendersIdMadeLike,
} from "../../features/usersSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const PostsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPostsData, setAllPostData] = useState();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSinglePostModalOpen, setIsSinglePostModalOpen] = useState(false);
  const [allUsersData, setAllUsersData] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [commentsAmountSort, setCommentsAmountSort] = useState(false);
  const [likesAmountSort, setLikesAmountSort] = useState(false);

  const [timeCreatedSort, setTimeCreatedSort] = useState(false);
  const [position, setPosition] = useState({ position: "static" });

  const dispatch = useDispatch();

  const getAllPosts = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await fetch(`http://localhost:3000/posts`, options);
      const jsonData = await response.json();
      if (response.ok) {
        setAllPostData(jsonData.postsData);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

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
        setCurrentUserId(jsonData.currentUserId);
        dispatch(updateCurrentUserId(jsonData.currentUserId));
        setAllUsersData(jsonData.usersData);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const findUserInfo = () => {
    if (allUsersData) {
      const user = allUsersData.find(
        (user) => user._id === selectedPost.sendersId
      );

      return user
        ? [user.pictureUrl, user.username, user._id]
        : "https://pbs.twimg.com/media/FLrT7QiVQAIivpt.jpg:large";
    }
  };

  const findCommentatorName = (id) => {
    if (allUsersData) {
      const userName = allUsersData.find((user) => user._id === id);
      return userName.username;
    }
  };

  const handlePostCardClick = (post) => {
    setIsSinglePostModalOpen(true);
    setSelectedPost(post);
    dispatch(updateSelectedPostSendersId(post.sendersId));
    dispatch(updateSendersIdMadeLike(post.likes.sendersId));

    setPosition({ position: "fixed" });
  };

  const handleBtnCreatePost = () => {
    setIsModalOpen(true);

    setPosition({ position: "fixed" });
  };

  const handleBtnAddPost = () => {
    setIsModalOpen(false);
    setPosition({ position: "static" });
  };

  const handleCloseXModal = () => {
    setIsModalOpen(false);

    setPosition({ position: "static" });
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

  const handleBtnLike = () => {
    const postData = {
      postId: selectedPost._id,
      likeUpdate: true,
    };
    updatePost(postData);
  };

  useEffect(() => {
    getAllPosts();
  }, [allPostsData]);

  const handleSinglePostModalBtnXClick = () => {
    setIsSinglePostModalOpen(false);

    setPosition({ position: "static" });
  };

  const handleBtnCommentsAmount = () => {
    setCommentsAmountSort(!commentsAmountSort);

    const sortedArray = [...allPostsData].sort((a, b) => {
      if (commentsAmountSort) {
        return a.comments.commentText.length - b.comments.commentText.length;
      } else {
        return b.comments.commentText.length - a.comments.commentText.length;
      }
    });

    setAllPostData(sortedArray);
  };

  const handleBtnLikesAmount = () => {
    setLikesAmountSort(!likesAmountSort);

    const sortedArray = [...allPostsData].sort((a, b) => {
      if (likesAmountSort) {
        return a.likes.numberOfLikes - b.likes.numberOfLikes;
      } else {
        return b.likes.numberOfLikes - a.likes.numberOfLikes;
      }
    });

    setAllPostData(sortedArray);
  };

  const handleBtnTimeCreated = () => {
    setTimeCreatedSort(!timeCreatedSort);

    const sortedArray = [...allPostsData].sort((a, b) => {
      if (timeCreatedSort) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setAllPostData(sortedArray);
  };

  return (
    <div style={position} className="posts-page">
      <div className="posts-page__sorting-container">
        <button
          onClick={handleBtnCommentsAmount}
          className="posts-page__btn-sorting"
        >
          Comments Amount{" "}
          <FontAwesomeIcon
            icon={commentsAmountSort ? faChevronUp : faChevronDown}
          />
        </button>

        <button
          onClick={handleBtnLikesAmount}
          className="posts-page__btn-sorting"
        >
          Likes Amount{" "}
          <FontAwesomeIcon
            icon={likesAmountSort ? faChevronUp : faChevronDown}
          />
        </button>

        <button
          onClick={handleBtnTimeCreated}
          className="posts-page__btn-sorting"
        >
          Time Created{" "}
          <FontAwesomeIcon
            icon={timeCreatedSort ? faChevronUp : faChevronDown}
          />
        </button>

        <button
          className="posts-page__btn-create-post"
          onClick={handleBtnCreatePost}
        >
          Create Post
        </button>
      </div>
      {isModalOpen && (
        <CreatePostModal
          onBtnXClick={handleCloseXModal}
          onBtnCreatePost={handleBtnAddPost}
        />
      )}

      <div className="posts-page__posts-container">
        {allPostsData &&
          allPostsData.map((post, index) => {
            const createdAtDate = new Date(Date.parse(post.createdAt));

            const formattedDate = `${createdAtDate.getFullYear()} - ${
              createdAtDate.getMonth() + 1
            } - ${createdAtDate.getDate()} ${createdAtDate.getHours()}:${createdAtDate.getMinutes()}:${createdAtDate.getSeconds()}`;

            return (
              <PostCard
                onPostCardClick={() => handlePostCardClick(post)}
                key={index}
                img={post.image}
                title={post.title}
                likes={post.likes.numberOfLikes}
                comments={post.comments.commentText.length}
                createdAt={formattedDate}
              />
            );
          })}
      </div>
      {isSinglePostModalOpen && (
        <SinglePostModal
          img={selectedPost.image}
          title={selectedPost.title}
          likes={selectedPost.likes.numberOfLikes}
          userPic={findUserInfo()[0]}
          creatorName={findUserInfo()[1]}
          idUser={findUserInfo()[2]}
          currentUserId={currentUserId}
          onBtnLikeClick={handleBtnLike}
          onModalBtnXClick={handleSinglePostModalBtnXClick}
          selectedPost={selectedPost}
          allComments={selectedPost.comments.commentText.map(
            (comment, index) => (
              <div key={index} className="posts-page__comment">
                <div className="posts-page__commentator">
                  {findCommentatorName(comment[1])}
                </div>
                {comment[0]}
              </div>
            )
          )}
        />
      )}
    </div>
  );
};

export default PostsPage;
