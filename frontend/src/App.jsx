import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import Toolbar from "./components/Toolbar";
import MessagesPage from "./pages/MessagesPage";
import UsersPage from "./pages/UsersPage";

const App = () => {
  const autologinIs = useSelector((state) => state.auth.isAutologin);
  const location = useLocation();

  useEffect(() => {
    const removeTokenOnUnload = () => {
      if (!autologinIs) {
        localStorage.removeItem("token");
      } else {
        return;
      }
    };
    window.addEventListener("beforeunload", removeTokenOnUnload);

    return () => {
      window.removeEventListener("beforeunload", removeTokenOnUnload);
    };
  }, [autologinIs]);

  const pathsWithoutToolbar = ["/", "/login"];
  const shouldRenderToolbar = !pathsWithoutToolbar.includes(location.pathname);

  return (
    <>
      {shouldRenderToolbar && localStorage.getItem("token") && <Toolbar />}
      <Routes>
        <Route path={"/"} element={<RegistrationPage />} />
        <Route
          path={"/login"}
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/profile" />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path={"/profile"}
          element={
            localStorage.getItem("token") ? (
              <ProfilePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path={"/messages"}
          element={
            localStorage.getItem("token") ? (
              <MessagesPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path={"/users"}
          element={
            localStorage.getItem("token") ? (
              <UsersPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
