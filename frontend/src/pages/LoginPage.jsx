import { AuthLayout } from "@widgets/layouts";
import { LoginForm } from "@features/auth/login/ui/LoginForm.jsx";
import { AUTH_SCREENS } from "@shared/constants/auth.constants.js";

export function LoginPage({ onNavigate, onLoginSuccess }) {
  return (
    <AuthLayout
      title="Sign in"
      subtitle="Тут усе пристойно. Майже. Але це чат. А чати — завжди трохи брудні."
    >
      <LoginForm
        onSuccess={(login) => {
          if (onLoginSuccess) {
            onLoginSuccess(login);
          } else {
            onNavigate(AUTH_SCREENS.APP);
          }
        }}
        onRegister={() => onNavigate(AUTH_SCREENS.REGISTER)}
        onForgot={() => onNavigate(AUTH_SCREENS.FORGOT)}
      />
    </AuthLayout>
  );
}