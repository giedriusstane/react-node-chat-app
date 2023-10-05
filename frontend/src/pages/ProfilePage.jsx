import { useEffect, useState } from "react";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [errorText, setErrorText] = useState();
  const [responseData, setResponseData] = useState();

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
        setResponseData(`${data.userData} - ${data.message}`);
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

  return (
    <div>{errorText ? <div>{errorText}</div> : <div>{responseData}</div>}</div>
  );
};

export default ProfilePage;
