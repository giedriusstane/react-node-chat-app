import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<RegistrationPage />} />
        <Route path={"/login"} element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
