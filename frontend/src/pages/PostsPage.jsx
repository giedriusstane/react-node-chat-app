import { useState } from "react";
import "./PostsPage.scss";
import CreatePostModal from "../components/CreatePostModal";

const PostsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseXModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button>Create Post</button>
      {isModalOpen && <CreatePostModal onBtnXClick={handleCloseXModal} />}
    </div>
  );
};

export default PostsPage;
