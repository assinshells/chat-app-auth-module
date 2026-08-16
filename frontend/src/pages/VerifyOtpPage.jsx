import { AuthLayout } from "@widgets/layouts";
import { OtpForm } from "@features/auth/verify-otp/ui/OtpForm.jsx";
import { AUTH_SCREENS } from "@shared/constants/auth.constants.js";

export function VerifyOtpPage({ onNavigate, email }) {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Перевіримо, що це справді ви. Введіть код - і придумаємо вам новий пароль. Цього разу постарайтесь його не забути."
    >
      <OtpForm
        email={email}
        onSuccess={(verifiedToken) =>
          onNavigate(AUTH_SCREENS.RESET, { verifiedToken })
        }
        onBack={() => onNavigate(AUTH_SCREENS.FORGOT)}
      />
    </AuthLayout>
  );
}