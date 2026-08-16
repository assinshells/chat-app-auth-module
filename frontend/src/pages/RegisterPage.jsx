import { AuthLayout } from "@widgets/layouts";
import { RegisterForm } from "@features/auth/register/ui/RegisterForm.jsx";
import { AUTH_SCREENS } from "@shared/constants/auth.constants.js";

export function RegisterPage({ onNavigate }) {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Ще не зареєстровані? Нічого. У кожного колись був перший раз. Створіть акаунт і приєднуйтесь до розмови."
    >
      <RegisterForm
        onSuccess={() => onNavigate(AUTH_SCREENS.LOGIN)}
        onBack={() => onNavigate(AUTH_SCREENS.LOGIN)}
      />
    </AuthLayout>
  );
}