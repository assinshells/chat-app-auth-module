import { ChatLayout } from "@widgets/layouts";
import { useChatConnection } from "@entities/chat/model/useChatConnection.js";
import useChatStore from "@entities/chat/model/store.js";
import { ChatWidget } from "@widgets/chat/ui/ChatWidget.jsx";

/**
 * ChatPage — основная страница чата.
 *
 * nickname     — ник текущего пользователя.
 * initialRoom  — id комнаты для автоподключения.
 * onLogout     — коллбэк выхода (переход на экран логина делает вызывающая сторона).
 */
export function ChatPage({ nickname, initialRoom, onLogout }) {
  useChatConnection({ initialRoom, nickname });
  const leaveRoom = useChatStore((s) => s.leaveRoom);
  const reset = useChatStore((s) => s.reset);

  const handleLogout = () => {
    leaveRoom();
    reset();
    onLogout(); 
  };

  return (
    // ===== ГЛАВНЫЙ БЛОК СТРАНИЦЫ ЧАТА (раскладка + виджет чата) =====
    <ChatLayout nickname={nickname} onLogout={handleLogout}>
      {/* --- Блок виджета чата (окно чата) --- */}
      <ChatWidget nickname={nickname} />
    </ChatLayout>
  );
}