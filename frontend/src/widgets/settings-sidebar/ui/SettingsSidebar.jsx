import { X } from "lucide-react";
import { ThemeSwitch } from "@features/settings/ui/ThemeSwitch.jsx";
import { useSettingsSidebarStore } from "../model/useSettingsSidebarStore.js";

/**
 * SettingsSidebar — правая выезжающая панель с настройками.
 * Открывается кнопкой "Settings" в SidebarNavigation (см. useSettingsSidebarStore),
 * закрывается крестиком внутри неё самой.
 */
export function SettingsSidebar() {
  const isOpen = useSettingsSidebarStore((state) => state.isOpen);
  const close = useSettingsSidebarStore((state) => state.close);

  return (
    // ===== ДОП. БЛОК: сайдбар настроек (выезжающая панель) =====
    <div className={`settings-sidebar${isOpen ? " d-block" : ""}`}>
      {/* --- Шапка (кнопка закрытия) --- */}
      <div className="px-3 px-lg-4 pt-3 pt-lg-4">
        <div className="user-chat-nav text-end">
          <button
            type="button"
            className="btn nav-btn"
            id="settings-sidebar-hide"
            onClick={close}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* --- Тело настроек --- */}
      <div className="settings-body">
        <div className="settings-row">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}