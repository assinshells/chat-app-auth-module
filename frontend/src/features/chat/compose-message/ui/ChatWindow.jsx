import SimpleBar from "simplebar-react";
import { MessageList } from "@features/chat/view-messages/ui/MessageList.jsx";
import { MessageInput } from "@features/chat/compose-message/ui/MessageInput.jsx";

/**
 * ChatWindow — центральная колонка чата: лента сообщений + поле ввода.
 * Объединяет view-messages/MessageList и compose-message/MessageInput
 * под одной рамкой.
 *
 * nickname       — ник текущего пользователя (для отправки сообщений)
 * timeWarning    — показать предупреждение о лимите меток времени
 * maxTimeTokens  — лимит меток (для текста предупреждения)
 * selectedNickname, selectedTimes — текущий выбор для реплая/меток
 * onSelectNickname, onSelectTime  — коллбэки выбора из ленты сообщений
 * onClearNickname, onClearTime, onClearAllTimes — очистка выбора
 */
export function ChatWindow({
  nickname,
  timeWarning,
  maxTimeTokens,
  selectedNickname,
  selectedTimes,
  onSelectNickname,
  onSelectTime,
  onClearNickname,
  onClearTime,
  onClearAllTimes,
}) {
  return (
    // ===== БЛОК ОКНА ЧАТА (лента сообщений + блок инпута) =====
    <>
      {/* --- Лента сообщений (скролл-контейнер) --- */}
      <SimpleBar style={{ height: "100dvh" }} autoHide={false}>
        <div className="chat-conversation p-3 p-lg-4">
          {timeWarning && (
            <div className="alert alert-warning" role="alert">
              Можно выбрать не более {maxTimeTokens} временных меток
            </div>
          )}

          {/* --- Блок сообщений (список сообщений комнаты) --- */}
          <ul className="list-unstyled mb-0">
            <MessageList
              onSelectNickname={onSelectNickname}
              onSelectTime={onSelectTime}
              selectedNickname={selectedNickname}
              selectedTimes={selectedTimes}
            />
          </ul>
        </div>
      </SimpleBar>

      {/* --- Блок инпута (поле ввода + отправка сообщения) --- */}
      <div className="chat-input-section p-3 p-lg-4 border-top mb-0">
        <div className="row g-0">
          <MessageInput
            nickname={nickname}
            selectedNickname={selectedNickname}
            selectedTimes={selectedTimes}
            onClearNickname={onClearNickname}
            onClearTime={onClearTime}
            onClearAllTimes={onClearAllTimes}
          />
        </div>
      </div>
    </>
  );
}
