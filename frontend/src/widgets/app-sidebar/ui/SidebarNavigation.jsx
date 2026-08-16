import { MessageSquareLock, Repeat, Settings, Users, LogOut } from "lucide-react";
import { useRoomsSidebarStore } from "@widgets/rooms-sidebar";
import { useSettingsSidebarStore } from "@widgets/settings-sidebar";
import { useUsersSidebarStore } from "@widgets/users-sidebar";

const navigationItems = [
  { id: "private-chats", title: "Private Chats", icon: MessageSquareLock },
  { id: "rooms", title: "Rooms", icon: Repeat },
  { id: "users", title: "Users", icon: Users },
  { id: "settings", title: "Settings", icon: Settings },
];

export function SidebarNavigation({ onLogout }) {
  const openRoomsSidebar = useRoomsSidebarStore((state) => state.open);
  const openSettingsSidebar = useSettingsSidebarStore((state) => state.open);
  const openUsersSidebar = useUsersSidebarStore((state) => state.open);

  const openHandlers = {
    rooms: openRoomsSidebar,
    users: openUsersSidebar,
    settings: openSettingsSidebar,
  };

  return (
    // ===== НАВИГАЦИЯ САЙДБАРА 1 =====
    <ul className="nav side-menu-nav justify-content-center">
      {/* --- Пункты меню: чаты / комнаты / пользователи / настройки --- */}
      {navigationItems.map(({ id, title, icon: Icon }) => (
        <li className="nav-item" key={id} title={title}>
          <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); openHandlers[id]?.(); }}>
            <Icon size={20} strokeWidth={2} />
          </a>
        </li>
      ))}

      {/* --- Кнопка выхода из аккаунта --- */}
      <li className="nav-item" title="Log out">
        <button type="button" className="nav-link" onClick={onLogout}>
          <LogOut size={20} strokeWidth={2} />
        </button>
      </li>
    </ul>
  );
}