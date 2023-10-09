import React, { useEffect, useState } from "react";
import "./UsersPage.scss";
import UserCard from "../components/UserCard";

const UsersPage = () => {
  const [responseData, setResponseData] = useState();
  const [currentUserId, setCurrentUserId] = useState();

  const getAllUsers = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(`http://localhost:3000/users`, options);
    const jsonData = await response.json();
    setResponseData(jsonData.usersData);
    setCurrentUserId(jsonData.currentUserId);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    console.log(responseData);
  }, [responseData]);

  return (
    <div className="users-page">
      {responseData &&
        responseData.map((user, index) => (
          <UserCard
            key={index}
            username={user.username}
            userId={user._id}
            currentUserId={currentUserId}
          />
        ))}
    </div>
  );
};

export default UsersPage;
