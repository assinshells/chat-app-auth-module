import { ChatWindow } from "@features/chat/compose-message/ui/ChatWindow.jsx";
import { useComposeMessage } from "@features/chat/compose-message/model/useComposeMessage.js";

export function ChatWidget({ nickname }) {
  const {
    selectedNickname,
    selectedTimes,
    timeWarning,
    maxTimeTokens,
    selectNickname,
    clearNickname,
    selectTime,
    clearTime,
    clearAllTimes,
  } = useComposeMessage();

  return (
    // ===== БЛОК ВИДЖЕТА ЧАТА (обёртка над окном чата) =====
    <div className="w-100 overflow-hidden position-relative">
      {/* --- Блок окна чата (лента сообщений + инпут) --- */}
      <ChatWindow
        nickname={nickname}
        timeWarning={timeWarning}
        maxTimeTokens={maxTimeTokens}
        selectedNickname={selectedNickname}
        selectedTimes={selectedTimes}
        onSelectNickname={selectNickname}
        onSelectTime={selectTime}
        onClearNickname={clearNickname}
        onClearTime={clearTime}
        onClearAllTimes={clearAllTimes}
      />
    </div>
  );
}
