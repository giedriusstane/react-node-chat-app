import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<RegistrationPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/profile"} element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
