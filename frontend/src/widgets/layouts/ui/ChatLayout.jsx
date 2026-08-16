import { AppSidebar } from "@widgets/app-sidebar";
import { RoomsSidebar } from "@widgets/rooms-sidebar";
import { SettingsSidebar } from "@widgets/settings-sidebar";
import { UsersSidebar } from "@widgets/users-sidebar";

export function ChatLayout({ nickname, onLogout, children }) {
  return (
    // ===== ГЛАВНЫЙ БЛОК (layout-wrapper): вся раскладка страницы чата =====
    <div className="layout-wrapper d-lg-flex">
      {/* --- Сайдбар 1: основной навигационный сайдбар (иконки: чаты/комнаты/юзеры/настройки/выход) --- */}
      <AppSidebar onLogout={onLogout} />

      {/* --- Левый сайдбар (заглушка, пока не реализован) --- */}
      <div className="chat-leftsidebar me-lg-1 ms-lg-0">leftsidebar</div>

      {/* --- Блок чата: окно чата + выезжающие доп. сайдбары --- */}
      <div className="user-chat w-100 overflow-hidden">
        <div className="d-lg-flex">
          {/* Блок окна чата (ChatWidget -> ChatWindow) приходит сюда через children */}
          {children}

          {/* --- Сайдбар 2: список комнат (выезжающая панель) --- */}
          <RoomsSidebar nickname={nickname} />

          {/* --- Доп. блок: сайдбар настроек --- */}
          <SettingsSidebar />

          {/* --- Доп. блок: сайдбар пользователей --- */}
          <UsersSidebar />
        </div>
      </div>
    </div>
  );
}
