import { useState } from "react";
import { AUTH_SCREENS } from "@shared/constants/auth.constants.js";
import { Storage } from "@shared/lib/storage.js";
import { TokenStorage } from "@shared/lib/tokenStorage.js";

import { LoginPage } from "@pages/LoginPage.jsx";
import { RegisterPage } from "@pages/RegisterPage.jsx";
import { ForgotPasswordPage } from "@pages/ForgotPasswordPage.jsx";
import { VerifyOtpPage } from "@pages/VerifyOtpPage.jsx";
import { ResetPasswordPage } from "@pages/ResetPasswordPage.jsx";
import { HomePage } from "@pages/HomePage.jsx";

import "@app/styles/index.css";

const USER_KEY = "userLogin";

const getInitialScreen = () =>
  TokenStorage.hasSession() ? AUTH_SCREENS.APP : AUTH_SCREENS.LOGIN;

export default function App() {
  const [screen, setScreen] = useState(getInitialScreen);
  const [screenParams, setScreenParams] = useState({});

  const navigate = (newScreen, params = {}) => {
    setScreen(newScreen);
    setScreenParams(params);
  };

  const handleLoginSuccess = (login) => {
    Storage.set(USER_KEY, login);
    navigate(AUTH_SCREENS.APP);
  };

  const handleLogout = () => {
    Storage.remove(USER_KEY);
    navigate(AUTH_SCREENS.LOGIN);
  };

  const currentLogin = Storage.get(USER_KEY) ?? "anonymous";

  switch (screen) {
    case AUTH_SCREENS.REGISTER:
      return <RegisterPage onNavigate={navigate} />;

    case AUTH_SCREENS.FORGOT:
      return <ForgotPasswordPage onNavigate={navigate} />;

    case AUTH_SCREENS.OTP:
      return (
        <VerifyOtpPage onNavigate={navigate} email={screenParams.email ?? ""} />
      );

    case AUTH_SCREENS.RESET:
      return (
        <ResetPasswordPage
          onNavigate={navigate}
          verifiedToken={screenParams.verifiedToken}
        />
      );

    case AUTH_SCREENS.APP:
      return <HomePage login={currentLogin} onLogout={handleLogout} />;

    default:
      return (
        <LoginPage onNavigate={navigate} onLoginSuccess={handleLoginSuccess} />
      );
  }
}