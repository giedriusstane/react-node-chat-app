import { useEffect, useState } from "react";
import ChangePicPassModal from "../components/ChangePicPassModal";
import { login } from "../../features/authSlice";
import { useDispatch } from "react-redux";

import "./ProfilePage.scss";

const ProfilePage = () => {
  const [errorText, setErrorText] = useState();
  const [responseData, setResponseData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPasswordOpen, setIsModaPasswordOpen] = useState(false);

  const userProfile = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(`http://localhost:3000/profile`, options);
      const data = await response.json();

      if (response.ok) {
        setResponseData(data);
      } else {
        setErrorText(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  const handleBtnChangePicture = () => {
    setIsModalOpen(true);
  };

  const handleBtnChangePassword = () => {
    setIsModaPasswordOpen(true);
  };

  const handleBtnXClick = () => {
    setIsModalOpen(false);
    setIsModaPasswordOpen(false);
  };

  return (
    <div className="profile-page">
      {errorText ? (
        <div>{errorText}</div>
      ) : (
        <div className="profile-page__container">
          <div className="profile-page__title">{`${responseData.message} ${responseData.userData}`}</div>
          <img
            className="profile-page__user-picture"
            src="https://static.vecteezy.com/system/resources/previews/008/422/689/original/social-media-avatar-profile-icon-isolated-on-square-background-vector.jpg"
            alt="profile picture"
          />
          <button
            onClick={handleBtnChangePicture}
            className="profile-page__btn-change-picture"
          >
            Change Picture
          </button>

          <button
            onClick={handleBtnChangePassword}
            className="profile-page__btn-change-password"
          >
            Change Password
          </button>
          {isModalOpen && (
            <ChangePicPassModal
              onBtnXClick={handleBtnXClick}
              placeholder={"picture url"}
            />
          )}

          {isModalPasswordOpen && (
            <ChangePicPassModal
              onBtnXClick={handleBtnXClick}
              inputType={"password"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
