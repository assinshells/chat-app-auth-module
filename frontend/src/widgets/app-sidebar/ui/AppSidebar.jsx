import { SidebarLogo } from "./SidebarLogo.jsx";
import { SidebarNavigation } from "./SidebarNavigation.jsx";

export function AppSidebar({ onLogout }) {
  return (
    // ===== САЙДБАР 1: главная панель навигации (лого + иконки) =====
    <div className="side-menu flex-lg-column me-lg-1 ms-lg-0">
      {/* --- Лого --- */}
      <SidebarLogo />

      {/* --- Навигация сайдбара 1 (пункты меню + кнопка выхода) --- */}
      <div className="flex-lg-column my-auto">
        <SidebarNavigation onLogout={onLogout} />
      </div>
    </div>
  );
}