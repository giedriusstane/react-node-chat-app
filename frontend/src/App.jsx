import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import Toolbar from "./components/Toolbar";
import { login } from "../features/authSlice";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
      {shouldRenderToolbar && isLoggedIn && <Toolbar />}
      <Routes>
        <Route path={"/"} element={<RegistrationPage />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/profile"} element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;
