import { useEffect, useState } from "react";
import "./PostsPage.scss";
import CreatePostModal from "../components/CreatePostModal";
import PostCard from "../components/PostCard";
import SinglePostModal from "../components/SinglePostModal";
import { useDispatch } from "react-redux";
import { updateCurrentUserId } from "../../features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const PostsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPostsData, setAllPostData] = useState();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSinglePostModalOpen, setIsSinglePostModalOpen] = useState(false);
  const [allUsersData, setAllUsersData] = useState();
  const [currentUserId, setCurrentUserId] = useState();

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
        console.log(jsonData.postsData);
        setAllPostData(jsonData.postsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handlePostCardClick = (post) => {
    setIsSinglePostModalOpen(true);
    setSelectedPost(post);
  };

  const handleBtnCreatePost = () => {
    setIsModalOpen(true);
  };

  const handleBtnAddPost = () => {
    setIsModalOpen(false);
  };

  const handleCloseXModal = () => {
    setIsModalOpen(false);
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
        setCurrentUserId(jsonData.currentUserId);
        dispatch(updateCurrentUserId(jsonData.currentUserId));
        setAllUsersData(jsonData.usersData);
        console.log(jsonData.usersData);
      }
    } catch (error) {
      console.error(error);
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

  const handleBtnLike = () => {
    const postData = {
      postId: selectedPost._id,
      likeUpdate: true,
    };

    updatePost(postData);
  };

  const handleSinglePostModalBtnXClick = () => {
    setIsSinglePostModalOpen(false);
  };

  return (
    <div className="posts-page">
      <div className="posts-page__sorting-container">
        <h4>sort by:</h4>
        {/* <FontAwesomeIcon icon={faChevronDown} /> */}
        <button className="posts-page__btn-sorting">
          Comments Amount <FontAwesomeIcon icon={faChevronDown} />
        </button>

        <button className="posts-page__btn-sorting">
          Likes Amount <FontAwesomeIcon icon={faChevronDown} />
        </button>

        <button className="posts-page__btn-sorting">
          Time Created <FontAwesomeIcon icon={faChevronDown} />
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
          allPostsData.map((post, index) => (
            <PostCard
              onPostCardClick={() => handlePostCardClick(post)}
              key={index}
              img={post.image}
              title={post.title}
              likes={post.likes.numberOfLikes}
              comments={post.comments.commentText.length}
            />
          ))}
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
