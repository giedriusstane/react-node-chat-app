import React from "react";
import "./Toolbar.scss";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <div className="toolbar">
      <Link className="toolbar__btn" to={"/profile"}>
        Profile
      </Link>
      <Link className="toolbar__btn" to={"/messages"}>
        Messages
      </Link>
      <Link className="toolbar__btn" to={"/posts"}>
        Posts
      </Link>
      <Link className="toolbar__btn" to={"/users"}>
        Users
      </Link>
      <button className="toolbar__btn-logout" onClick={handleBtnLogout}>
        Logout <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
};

export default Toolbar;
