import { useEffect, useState } from "react";
import "./PostsPage.scss";
import CreatePostModal from "../components/CreatePostModal";
import PostCard from "../components/PostCard";
import SinglePostModal from "../components/SinglePostModal";

const PostsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPostsData, setAllPostData] = useState();

  const getAllPosts = async (postData) => {
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

  const handleBtnCreatePost = () => {
    setIsModalOpen(true);
  };

  const handleBtnAddPost = () => {
    setIsModalOpen(false);
  };

  const handleCloseXModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="posts-page">
      <button onClick={handleBtnCreatePost}>Create Post</button>
      {isModalOpen && (
        <CreatePostModal
          onBtnXClick={handleCloseXModal}
          onBtnCreatePost={handleBtnAddPost}
        />
      )}

      <SinglePostModal />

      <div className="posts-page__posts-container">
        {allPostsData &&
          allPostsData.map((post, index) => (
            <PostCard
              key={index}
              img={post.image}
              title={post.title}
              likes={post.likes.numberOfLikes}
              comments={post.comments.commentText.length}
            />
          ))}
      </div>
    </div>
  );
};

export default PostsPage;
