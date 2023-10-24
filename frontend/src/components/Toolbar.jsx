import React from "react";
import "./Toolbar.scss";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Toolbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBtnLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  const isProfileActive = useMatch("/profile");
  const isMessagesActive = useMatch("/messages");
  const isPostsActive = useMatch("/posts");
  const isUsersActive = useMatch("/users");

  return (
    <div className="toolbar">
      <Link
        className={`toolbar__btn ${
          isProfileActive ? "toolbar__btn-active" : ""
        }`}
        to="/profile"
      >
        Profile
      </Link>
      <Link
        className={`toolbar__btn ${
          isMessagesActive ? "toolbar__btn-active" : ""
        }`}
        to="/messages"
      >
        Messages
      </Link>
      <Link
        className={`toolbar__btn ${isPostsActive ? "toolbar__btn-active" : ""}`}
        to="/posts"
      >
        Posts
      </Link>
      <Link
        className={`toolbar__btn ${isUsersActive ? "toolbar__btn-active" : ""}`}
        to="/users"
      >
        Users
      </Link>
      <button className="toolbar__btn-logout" onClick={handleBtnLogout}>
        Logout <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
};

export default Toolbar;
