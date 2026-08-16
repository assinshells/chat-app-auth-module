import { AuthLayout } from "@widgets/layouts";
import { ResetPasswordForm } from "@features/auth/reset-password/ui/ResetPasswordForm.jsx";
import { AUTH_SCREENS } from "@shared/constants/auth.constants.js";

export function ResetPasswordPage({ onNavigate, verifiedToken }) {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Новий пароль, старі пригоди. Задайте новий пароль для входу."
    >
      <ResetPasswordForm
        verifiedToken={verifiedToken}
        onSuccess={() => onNavigate(AUTH_SCREENS.LOGIN)}
        onBack={() => onNavigate(AUTH_SCREENS.LOGIN)}
      />
    </AuthLayout>
  );
}