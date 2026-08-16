import { AuthLayout } from "@widgets/layouts";
import { ForgotPasswordForm } from "@features/auth/forgot-password/ui/ForgotPasswordForm.jsx";
import { AUTH_SCREENS } from "@shared/constants/auth.constants.js";

export function ForgotPasswordPage({ onNavigate }) {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Забули пароль? Буває. Ми теж не пам'ятаємо все на світі. Давайте просто все виправимо."
    >
      <ForgotPasswordForm
        onSuccess={(email) => onNavigate(AUTH_SCREENS.OTP, { email })}
        onBack={() => onNavigate(AUTH_SCREENS.LOGIN)}
      />
    </AuthLayout>
  );
}