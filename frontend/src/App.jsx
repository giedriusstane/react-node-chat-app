import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import Toolbar from "./components/Toolbar";
import { login } from "../features/authSlice";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(login());
    }
  }, [dispatch]);

  return (
    <div>
      {isLoggedIn && <Toolbar />}
      <Routes>
        <Route path={"/"} element={<RegistrationPage />} />
        <Route path={"/profile"} element={<ProfilePage />} />
        <Route
          path={"/login"}
          element={isLoggedIn ? <Navigate to="/profile" /> : <LoginPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
