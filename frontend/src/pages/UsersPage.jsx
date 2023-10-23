import React, { useEffect, useState } from "react";
import "./UsersPage.scss";
import UserCard from "../components/UserCard";
import { useDispatch } from "react-redux";
import { updateCurrentUserId } from "../../features/authSlice";

const UsersPage = () => {
  const [responseData, setResponseData] = useState();
  const [currentUserId, setCurrentUserId] = useState();

  const dispatch = useDispatch();

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
        console.log(jsonData);
        setResponseData(jsonData.usersData);
        setCurrentUserId(jsonData.currentUserId);
        dispatch(updateCurrentUserId(jsonData.currentUserId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="users-page">
      <div className="users-page__container">
        {responseData &&
          responseData.map((user, index) => (
            <UserCard
              key={index}
              username={user.username}
              userImg={user.pictureUrl}
              userId={user._id}
              currentUserId={currentUserId}
            />
          ))}
      </div>
    </div>
  );
};

export default UsersPage;
