import { X } from "lucide-react";
import { RoomList } from "@features/chat/join-room/ui/RoomList.jsx";
import { useIsDesktop } from "@shared/lib/useIsDesktop.js";
import { useRoomsSidebarStore } from "../model/useRoomsSidebarStore.js";

/**
 * RoomsSidebar — левая выезжающая панель со списком комнат.
 * Открывается кнопкой "Rooms" в SidebarNavigation (см. useRoomsSidebarStore),
 * закрывается крестиком всегда, а при выборе комнаты (RoomList.onNavigate) —
 * только на мобильном/планшете (< 992px), где панель лежит оверлеем поверх
 * чата. На десктопе панель — часть раскладки, поэтому сама не закрывается.
 *
 * nickname — ник текущего пользователя, нужен RoomList для входа в комнату.
 */
export function RoomsSidebar({ nickname }) {
  const isOpen = useRoomsSidebarStore((state) => state.isOpen);
  const close = useRoomsSidebarStore((state) => state.close);
  const isDesktop = useIsDesktop();

  const handleNavigate = () => {
    if (!isDesktop) close();
  };

  return (
    // ===== САЙДБАР 2: список комнат (выезжающая панель) =====
    <div className={`rooms-sidebar${isOpen ? " d-block" : ""}`}>
      {/* --- Шапка сайдбара 2 (кнопка закрытия) --- */}
      <div className="px-3 px-lg-4 pt-3 pt-lg-4">
        <div className="user-chat-nav text-end">
          <button
            type="button"
            className="btn nav-btn"
            id="rooms-sidebar-hide"
            onClick={close}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* --- Список комнат --- */}
      <RoomList nickname={nickname} onNavigate={handleNavigate} />
    </div>
  );
}