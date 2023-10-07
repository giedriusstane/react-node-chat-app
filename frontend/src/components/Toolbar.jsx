import React from "react";
import "./Toolbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";

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
      <Link to={"/profile"}>Profile</Link>
      <Link to={"/messages"}>Messages</Link>
      <Link to={"/posts"}>Posts</Link>
      <Link to={"/users"}>Users</Link>
      <button onClick={handleBtnLogout} className="toolbar__btn-logout">
        Logout
      </button>
    </div>
  );
};

export default Toolbar;
