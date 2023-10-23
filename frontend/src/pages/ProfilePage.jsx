import { useEffect, useState } from "react";
import ChangePicPassModal from "../components/ChangePicPassModal";
import LoadingElement from "../components/LoadingElement";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [errorText, setErrorText] = useState();
  const [responseData, setResponseData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPasswordOpen, setIsModaPasswordOpen] = useState(false);

  const [pictureUrl, setPictureUrl] = useState(
    "https://static.vecteezy.com/system/resources/previews/008/422/689/original/social-media-avatar-profile-icon-isolated-on-square-background-vector.jpg"
  );

  const userProfile = async () => {
    try {
      const options = {
        method: "GET",
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

  const handleBtnUpdate = () => {
    setIsModaPasswordOpen(false);
    setIsModalOpen(false);
    userProfile();
  };

  useEffect(() => {
    if (responseData.userData && responseData.userData.pictureUrl) {
      setPictureUrl(responseData.userData.pictureUrl);
    }
  }, [responseData]);

  return (
    <div className="profile-page">
      {errorText ? (
        <div>{errorText}</div>
      ) : (
        <div className="profile-page__container">
          {responseData.message && responseData.userData ? (
            <div className="profile-page__title">
              <span className="profile-page__welcome">
                {responseData.message}
              </span>{" "}
              {responseData.userData.username}
            </div>
          ) : (
            <LoadingElement />
          )}

          <img
            className="profile-page__user-picture"
            src={pictureUrl}
            alt="profile picture"
          />

          <button
            onClick={handleBtnChangePicture}
            className="profile-page__btn-change"
          >
            Change Picture
          </button>

          <button
            onClick={handleBtnChangePassword}
            className="profile-page__btn-change"
          >
            Change Password
          </button>
          {isModalOpen && (
            <ChangePicPassModal
              onBtnXClick={handleBtnXClick}
              placeholder={"picture url"}
              onBtnUpdate={handleBtnUpdate}
            />
          )}

          {isModalPasswordOpen && (
            <ChangePicPassModal
              onBtnXClick={handleBtnXClick}
              inputType={"password"}
              placeholder={"password"}
              onBtnUpdate={handleBtnUpdate}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
