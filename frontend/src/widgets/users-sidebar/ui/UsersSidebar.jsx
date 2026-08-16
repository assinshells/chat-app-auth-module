import { X } from "lucide-react";
import { UserList } from "@features/chat/view-users/ui/UserList.jsx";
import { useComposeMessage } from "@features/chat/compose-message/model/useComposeMessage.js";
import { useIsDesktop } from "@shared/lib/useIsDesktop.js";
import { useUsersSidebarStore } from "../model/useUsersSidebarStore.js";

/**
 * UsersSidebar — правая выезжающая панель со списком участников комнаты.
 * Закрывается крестиком всегда, а при выборе ника (для @упоминания) —
 * только на мобильном/планшете (< 992px), где панель — оверлей поверх
 * чата. На десктопе панель часть раскладки и сама не закрывается, чтобы
 * можно было выбрать сразу нескольких пользователей подряд.
 */
export function UsersSidebar() {
  const isOpen = useUsersSidebarStore((state) => state.isOpen);
  const close = useUsersSidebarStore((state) => state.close);
  const selectedNickname = useComposeMessage((state) => state.selectedNickname);
  const selectNickname = useComposeMessage((state) => state.selectNickname);
  const isDesktop = useIsDesktop();

  const handleSelectNickname = (nickname) => {
    selectNickname(nickname);
    if (!isDesktop) close();
  };

  return (
    // ===== ДОП. БЛОК: сайдбар пользователей (выезжающая панель) =====
    <div className={`users-sidebar${isOpen ? " d-block" : ""}`}>
      {/* --- Шапка (кнопка закрытия) --- */}
      <div className="px-3 px-lg-4 pt-3 pt-lg-4">
        <div className="user-chat-nav text-end">
          <button type="button" className="btn nav-btn" id="users-sidebar-hide" onClick={close}>
            <X size={20} />
          </button>
        </div>
      </div>

      {/* --- Список пользователей --- */}
      <UserList onSelectNickname={handleSelectNickname} selectedNickname={selectedNickname} />
    </div>
  );
}