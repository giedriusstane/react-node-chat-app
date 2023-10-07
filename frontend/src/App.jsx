import React, { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import Toolbar from "./components/Toolbar";
import { login } from "../features/authSlice";
import MessagesPage from "./pages/MessagesPage";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(login());
    }
  }, [dispatch]);

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
      </Routes>
    </>
  );
};

export default App;
